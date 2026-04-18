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

    document.querySelector('#sidebarToggle').addEventListener('click', () => {
        if (window.innerWidth > 1000) {
            const isCurrentlyHidden = document.body.classList.contains('sidebarHidden');
            const newState = !isCurrentlyHidden;
            window.localStorage.setItem('isSidebarHidden', newState.toString());
            if (newState) document.body.classList.add('sidebarHidden');
            else document.body.classList.remove('sidebarHidden');
        } else {
            document.body.classList.toggle('sidebarOpen');
        }
    });

    document.querySelector('#sidebarDimming').addEventListener('click', () => {
        document.body.classList.remove('sidebarOpen');
    });

    const sidebar = document.querySelector('#sidebar');
    const sidebarButtons = sidebar.querySelectorAll('.btn');
    for (const btn of sidebarButtons) {
        btn.addEventListener('click', () => {
            document.body.classList.remove('sidebarOpen');
        });
    }
});
