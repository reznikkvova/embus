window.addEventListener('DOMContentLoaded', () => {
    $('.slider-body').slick({
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2500,
    });
    $('.packing-wrapper').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        speed: 800,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        },{
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        }],
        infinite: true,
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


    function calc() {
        let moversCount = 0;
        let lengthKm = 0;
        let usingTime = 0;

        document.querySelectorAll('[data-mover]').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelector('[data-mover].active').classList.remove('active');
                item.classList.add('active');
                moversCount = Number(item.dataset.mover);
                if(usingTime !== 0 && lengthKm !== 0) {
                    getPrice(moversCount, lengthKm, usingTime);
                } else {
                    document.getElementById('result').innerHTML = '';
                }
            });
        })

        document.getElementById('range').addEventListener('input', (e) => {
            const value = e.target.value
            if(e.target.value !== '') {
                lengthKm = Number(value);
            } else {
                lengthKm = 0
            }
            if(usingTime !== 0 && lengthKm !== 0) {
                getPrice(moversCount, lengthKm, usingTime);
            } else {
                document.getElementById('result').innerHTML = '';
            }
        });
        document.getElementById('time').addEventListener('input', (e) => {
            const value = e.target.value
            if(e.target.value !== '') {
                usingTime = Number(value);
            } else {
                usingTime = 0;
            }

            if(usingTime !== 0 && lengthKm !== 0) {
                getPrice(moversCount, lengthKm, usingTime);
            } else {
                document.getElementById('result').innerHTML = '';
            }

        })

        function getPrice(movers, km, time) {
            let result;
            if(km >= 10 && km <= 50) {
                result = ((km * 30) + ((movers*time)*200) + 500);
            } else if(km >= 0 && km <= 5){
                result = 500 + ((movers*time)*200);
            } else if(km > 5 && km < 10){
                result = 650 + ((movers*time)*200);
            } else {
                result = (km * 30);
            }
            document.getElementById('result').innerHTML = result;
        }

    }
    calc();
});