document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-tab');
    const cartHandle = document.querySelector('.cart-handle');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        const isMobile = window.innerWidth <= 768;
        sidebar.classList.toggle('active');
        cartSidebar.classList.remove('active');
        
        if (isMobile) {
            this.style.left = sidebar.classList.contains('active') ? '-40px' : '260px';
            cartHandle.style.right = '0';
        } else {
            this.style.left = sidebar.classList.contains('active') ? '300px' : '0';
        }
    });

    // Toggle cart
    cartHandle.addEventListener('click', function() {
        const isMobile = window.innerWidth <= 768;
        cartSidebar.classList.toggle('active');
        sidebar.classList.remove('active');
        
        if (isMobile) {
            this.style.right = cartSidebar.classList.contains('active') ? '-40px' : '0';
            sidebarToggle.style.left = '260px';
        } else {
            cartSidebar.classList.contains('active') 
                ? (this.style.right = '300px')
                : (this.style.right = '0');
        }
    });
});



