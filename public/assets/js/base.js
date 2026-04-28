const $ = (selector, ancestor = document) => ancestor.querySelector(selector);
const $$ = (selector, ancestor = document) => ancestor.querySelectorAll(selector);

const escapeHTML = string => {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const copyText = async text => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Error copying to clipboard:', err);
    }
};

// Thanks Gemini
function createElement(selector) {
    // Regex to match the tag, id (#), and classes (.)
    const regex = /([.#])?([^.#\s]+)/g;
    let match;
    let tagName = 'div'; // Default to div if no tag is specified
    let id = '';
    const classes = [];

    // Initial check: if the selector starts with an ID or Class,
    // the first match won't be the tag name.
    const firstMatch = /^[a-zA-Z0-9-]+/.exec(selector);
    if (firstMatch) {
        tagName = firstMatch[0];
    }

    while ((match = regex.exec(selector)) !== null) {
        const [, type, value] = match;

        if (type === '#') {
            id = value;
        } else if (type === '.') {
            classes.push(value);
        }
    }

    const element = document.createElement(tagName);

    if (id) {
        element.id = id;
    }

    if (classes.length > 0) {
        element.classList.add(...classes);
    }

    return element;
}

const activePopoverHiders = [];

const createPopover = (onHide = () => {}) => {
    const el = createElement('div.popover');
    let currentTriggerElement;
    let currentRefocusElement;

    const hide = (remove = true) => {
        // Remove from global array
        const index = activePopoverHiders.indexOf(hide);
        if (index > -1) {
            activePopoverHiders.splice(index, 1);
        }
        // Run provided onHide function
        try {
            onHide();
        } catch (error) {}

        // Refocus and update attributes on triggering elements
        try {
            if (currentRefocusElement) currentRefocusElement.focus();
            if (currentTriggerElement) {
                currentTriggerElement.setAttribute('aria-expanded', 'false');
                currentTriggerElement.setAttribute('aria-haspopup', 'false');
            }
        } catch (error) {}

        // Hide and remove
        el.classList.remove('visible');
        if (remove)
            setTimeout(() => {
                el.remove();
            }, 300);
    };

    const show = (triggerElement, options = {}) => {
        const opts = {
            position: 'bottom',
            centered: false,
            setMinWidth: true,
            padding: 4,
            refocusElement: triggerElement,
            ...options
        };

        currentTriggerElement = triggerElement;
        currentRefocusElement = opts.refocusElement;

        if (triggerElement) {
            triggerElement.setAttribute('aria-expanded', 'true');
            triggerElement.setAttribute('aria-haspopup', 'true');
        }

        // Append popover to document BEFORE doing any positioning
        document.body.appendChild(el);

        // Size and position the menu relative to the triggering element if provided
        // Otherwise, position relative to the mouse cursor using the globally updated coords
        // We do this inside requestAnimationFrame to make sure the popover's layout
        // has been fully calculated so we can get accurate sizing
        requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();

            let trigger = {
                left: mouse.x,
                right: mouse.x,
                bottom: mouse.y,
                top: mouse.y,
                width: 0,
                height: 0
            };

            if (triggerElement) trigger = triggerElement.getBoundingClientRect();

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const spaceBelow = windowHeight - trigger.bottom;
            const spaceAbove = trigger.top;
            const spaceToRight = windowWidth - trigger.right;
            const spaceToLeft = trigger.left;

            const TRIGGER_OFFSET = 4;

            let top = 0;
            let left = 0;

            // Default max bounds to the entire screen minus padding
            let maxHeight = windowHeight - opts.padding * 2;
            let maxWidth = windowWidth - opts.padding * 2;

            // 1. Calculate base positions, handle flipping, and determine available space
            switch (opts.position) {
                case 'top':
                    if (trigger.top - rect.height - TRIGGER_OFFSET < opts.padding && spaceBelow > spaceAbove) {
                        // Flip to bottom
                        top = trigger.bottom + TRIGGER_OFFSET;
                        maxHeight = spaceBelow - TRIGGER_OFFSET - opts.padding;
                    } else {
                        // Stay top
                        top = trigger.top - rect.height - TRIGGER_OFFSET;
                        maxHeight = spaceAbove - TRIGGER_OFFSET - opts.padding;
                    }
                    left = opts.centered ? trigger.left + trigger.width / 2 - rect.width / 2 : trigger.left;
                    break;

                case 'bottom':
                    if (
                        trigger.bottom + TRIGGER_OFFSET + rect.height > windowHeight - opts.padding &&
                        spaceAbove > spaceBelow
                    ) {
                        // Flip to top
                        top = trigger.top - rect.height - TRIGGER_OFFSET;
                        maxHeight = spaceAbove - TRIGGER_OFFSET - opts.padding;
                    } else {
                        // Stay bottom
                        top = trigger.bottom + TRIGGER_OFFSET;
                        maxHeight = spaceBelow - TRIGGER_OFFSET - opts.padding;
                    }
                    left = opts.centered ? trigger.left + trigger.width / 2 - rect.width / 2 : trigger.left;
                    break;

                case 'left':
                    if (trigger.left - rect.width - TRIGGER_OFFSET < opts.padding && spaceToRight > spaceToLeft) {
                        // Flip to right
                        left = trigger.right + TRIGGER_OFFSET;
                        maxWidth = spaceToRight - TRIGGER_OFFSET - opts.padding;
                    } else {
                        // Stay left
                        left = trigger.left - rect.width - TRIGGER_OFFSET;
                        maxWidth = spaceToLeft - TRIGGER_OFFSET - opts.padding;
                    }
                    top = opts.centered ? trigger.top + trigger.height / 2 - rect.height / 2 : trigger.top;
                    break;

                case 'right':
                    if (
                        trigger.right + TRIGGER_OFFSET + rect.width > windowWidth - opts.padding &&
                        spaceToLeft > spaceToRight
                    ) {
                        // Flip to left
                        left = trigger.left - rect.width - TRIGGER_OFFSET;
                        maxWidth = spaceToLeft - TRIGGER_OFFSET - opts.padding;
                    } else {
                        // Stay right
                        left = trigger.right + TRIGGER_OFFSET;
                        maxWidth = spaceToRight - TRIGGER_OFFSET - opts.padding;
                    }
                    top = opts.centered ? trigger.top + trigger.height / 2 - rect.height / 2 : trigger.top;
                    break;
            }

            // 2. Secondary Axis Clamping
            // We use the bounded dimensions so clamping doesn't break if the popover is squished
            const boundedHeight = Math.min(rect.height, maxHeight);
            const boundedWidth = Math.min(rect.width, maxWidth);

            left = Math.max(opts.padding, Math.min(left, windowWidth - boundedWidth - opts.padding));
            top = Math.max(opts.padding, Math.min(top, windowHeight - boundedHeight - opts.padding));

            // Apply styles
            el.style.top = `${top}px`;
            el.style.left = `${left}px`;

            // Apply the max dimensions we calculated
            el.style.maxHeight = `${maxHeight}px`;
            el.style.maxWidth = `${maxWidth}px`;

            if (opts.setMinWidth) el.style.minWidth = `${trigger.width}px`;

            // Add animate and visible classes after another animation frame
            // to ensure the popover has moved to its final location
            requestAnimationFrame(() => {
                el.classList.add('animate');
                el.classList.add('visible');
                activePopoverHiders.push(hide);
            });
        });
    };

    return {
        el,
        hide,
        show
    };
};

const showDropdown = (triggerElement, items = [], options = {}) =>
    new Promise(resolve => {
        const opts = {
            searchable: false,
            selectable: false,
            refocusElement: triggerElement,
            ...options
        };

        const onHide = () => {
            try {
                resolve(null);
            } catch (error) {}
        };

        const popover = createPopover(onHide);
        const dropdown = popover.el;
        dropdown.role = 'menu';
        dropdown.tabIndex = -1;
        dropdown.classList.add('dropdown', 'flex', 'col');

        const hasIcons = items.find(i => i.symbol || i.icon);
        for (const item of items) {
            if (item.separator) {
                const el = createElement('div.separator');
                el.role = 'separator';
                dropdown.appendChild(el);
                continue;
            }

            const btn = createElement('button.btn.text.secondary.justify-start');
            btn.role = 'menuitem';

            // Change item color and state
            if (item.selected) {
                if (!item.disabled) btn.classList.remove('text');
                opts.selectable = true;
            }
            if (item.danger) {
                btn.classList.add('danger');
            }
            if (item.success) {
                btn.classList.add('success');
            }
            if (item.disabled) {
                btn.disabled = true;
            }

            // Add symbol/icon
            if (item.symbol) {
                const symbol = createElement('span.symbol.filled');
                if (item.symbolOutlined) symbol.classList.remove('filled');
                symbol.innerText = item.symbol;
                btn.appendChild(symbol);
            } else if (item.icon || hasIcons) {
                const icon = createElement('img.icon');
                if (item.maskIcon) icon.classList.add('img-mask');
                icon.src = item.icon ?? '';
                if (!item.icon) icon.classList.add('invisible');
                btn.appendChild(icon);
            }

            // Add label
            const label = createElement('span.label.flex-grow.text-left');
            label.innerText = item.label;
            btn.appendChild(label);

            // Handle selection
            btn.addEventListener('click', async () => {
                let res = null;
                if (item.onClick) res = await btn.onClick();
                resolve(res ?? item.value ?? item.label);
                popover.hide();
            });

            dropdown.appendChild(btn);
        }

        popover.show(triggerElement, {
            refocusElement: opts.refocusElement
        });
        dropdown.focus();

        if (opts.selectable) {
            const list = dropdown.querySelectorAll('.btn:not(:disabled)');
            let index = 0;

            list.forEach((item, i) => {
                if (!item.classList.contains('text')) index = i;
            });

            const select = idx => {
                const el = list[idx];
                if (!el) return;
                list.forEach(btn => {
                    btn.classList.add('text');
                    btn.setAttribute('aria-selected', 'false');
                });
                el.classList.remove('text');
                el.setAttribute('aria-selected', 'true');
                el.focus();
                index = idx;
            };
            select(index);

            requestAnimationFrame(() => {
                list[index].scrollIntoView({ block: 'center' });
            });

            dropdown.addEventListener('keydown', e => {
                const selected = dropdown.querySelector('.btn:not(.text)');
                const key = [e.shiftKey ? 'Shift' : '', e.key].filter(Boolean).join('-');
                switch (key) {
                    // Previous item
                    case 'ArrowUp':
                    case 'ArrowLeft':
                    case 'Shift-Tab':
                        e.preventDefault();
                        select(index - 1);
                        break;
                    // Next item
                    case 'ArrowDown':
                    case 'ArrowRight':
                    case 'Tab':
                        e.preventDefault();
                        select(index + 1);
                        break;
                    // First item
                    case 'Home':
                        e.preventDefault();
                        select(0);
                        break;
                    // Last item
                    case 'End':
                        e.preventDefault();
                        select(list.length - 1);
                        break;
                    // Confirm selection
                    case ' ':
                    case 'Enter':
                        e.preventDefault();
                        selected.click();
                        break;
                }
            });
        }
    });

const hijackNativeDropdown = async selectElement => {
    const textbox = selectElement.closest('.textbox');
    const options = selectElement.querySelectorAll('option');
    const items = [];
    options.forEach(opt => {
        items.push({
            label: opt.innerText,
            value: opt.value || opt.innerText,
            selected: opt.selected,
            disabled: opt.disabled
        });
    });
    const selection = await showDropdown(textbox, items, {
        refocusElement: selectElement
    });
    if (selection) {
        selectElement.value = selection;
        selectElement.dispatchEvent(new Event('change'));
    }
};

const hideAllPopovers = () => {
    while (activePopoverHiders.length > 0) {
        activePopoverHiders.shift()();
    }
};

const initSvgIconMasks = () => {
    document.querySelectorAll('img.icon.mask, .img-mask').forEach(img => {
        const src = img.getAttribute('src');
        img.style.webkitMaskImage = `url(${src})`;
        img.style.maskImage = `url(${src})`;
    });
};

const initExpandableTextareas = () => {
    $$('textarea[data-expandable]:not([data-expandable-init])').forEach(el => {
        const resize = () => {
            el.style.height = `auto`;
            requestAnimationFrame(() => {
                el.style.height = `${el.scrollHeight + 1}px`;
            });
        };
        el.addEventListener('input', resize);
        resize();
        el.dataset.expandableInit = true;
    });
};

const initLoadAnimations = () => {
    document.querySelectorAll('[data-load-animate]').forEach(el => {
        const ms = el.dataset.loadAnimate;
        el.style.setProperty('--delay', `${ms}ms`);
        el.classList.remove('invisible');
        el.classList.add('slide-fade-up');
        el.removeAttribute('data-load-animate');
    });
};

const mouse = { x: 0, y: 0 };

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initSvgIconMasks();
    initLoadAnimations();
    initExpandableTextareas();

    // Re-initialize on page update
    document.body.addEventListener('htmx:afterSettle', e => {
        initSvgIconMasks();
        initLoadAnimations();
        initExpandableTextareas();
    });

    // Listen for clicks that bubble down to body
    document.addEventListener('click', e => {
        const textbox = e.target.closest('.textbox');
        const popover = e.target.closest('.popover');
        const clickedInteractive = e.target.closest('button, a');

        // If the click happened inside a textbox but not on a clickable element,
        // focus the adjacent text input
        if (textbox && !clickedInteractive) {
            const input = textbox.querySelector('input, select, textarea');
            if (input && document.activeElement !== input) {
                e.preventDefault();
                const length = input.value.length;
                input.focus();

                if (
                    ['text', 'password', 'number', 'search', 'tel', 'email'].includes(input.type) ||
                    input.tagName.toLowerCase() === 'textarea'
                ) {
                    input.setSelectionRange(length, length);
                } else if (input.tagName.toLowerCase() == 'select') {
                    hijackNativeDropdown(input);
                }
            }
        }

        // If the click was on a select input, hijack it
        if (e.target.tagName.toLowerCase() == 'select') {
            e.preventDefault();
            hijackNativeDropdown(e.target);
        }

        // If clicked outside a popover, hide all popovers
        if (!popover) {
            hideAllPopovers();
        }
    });

    // Update global mouse coordinates on movement
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Do stuff on scroll
    document.addEventListener('scroll', e => {
        hideAllPopovers();
    });

    // Do things on global keypresses
    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'Escape': {
                hideAllPopovers();
                break;
            }
            case ' ':
            case 'Enter': {
                if (e.target.tagName.toLowerCase() == 'select') {
                    e.preventDefault();
                    hijackNativeDropdown(e.target);
                }
                break;
            }
        }
    });

    // Do stuff on window resize
    window.addEventListener('resize', e => {
        hideAllPopovers();
    });
});
