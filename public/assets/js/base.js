const initSvgIconMasks = () => {
    document.querySelectorAll('img.icon.mask').forEach(img => {
        const src = img.getAttribute('src');
        img.style.webkitMaskImage = `url(${src})`;
        img.style.maskImage = `url(${src})`;
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initSvgIconMasks();
    initLoadAnimations();

    // Re-initialize on page update
    document.body.addEventListener('htmx:afterSettle', e => {
        initSvgIconMasks();
        initLoadAnimations();
    });
});
