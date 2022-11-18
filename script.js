window.addEventListener('DOMContentLoaded', () => {
    $('.slider-body').slick({
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2500,
    });
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

                e.preventDefault()

                const blockID = item.getAttribute('href').substr(1)
                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            });
        });
    } else {
        const anchors = document.querySelectorAll('a[href*="#"]')
        for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()

                const blockID = anchor.getAttribute('href').substr(1)

                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    alignToTop: true,
                })
            })
        }
    }

    if(window.innerWidth < 425) {
        let btn = document.querySelector('.show-all');
        btn.addEventListener('click', () => {
           btn.parentNode.querySelector('.text-wrapper').classList.remove('text-wrapper');
            btn.remove();
        });
    }
});