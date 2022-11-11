window.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header-burger');
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        document.querySelector('.header-nav').classList.toggle('active');
    });
    if(window.innerWidth < 992) {
        document.querySelectorAll('.header-item').forEach(item => {
            item.addEventListener('click', () => {
                burger.classList.toggle('active');
                document.querySelector('.header-nav').classList.toggle('active');
            });
        });
    }
});