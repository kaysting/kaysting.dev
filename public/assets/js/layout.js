document.addEventListener('DOMContentLoaded', () => {
    const checkScroll = () => {
        if (window.scrollY > 8) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    };
    document.addEventListener('scroll', checkScroll);
    checkScroll();

    const sidebar = document.querySelector('#sidebar');
    document.querySelector('#sidebarToggle').addEventListener('click', () => {
        if (window.innerWidth > 1000) {
            sidebar.classList.toggle('hidden');
        } else {
            sidebar.classList.toggle('open');
        }
    });
});
