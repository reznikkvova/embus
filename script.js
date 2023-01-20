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
        let type = '';

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
        document.getElementById('type').addEventListener('input', (e) => {
            type = e.target.value;
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
            if(km >= 10 && km <= 60) {
                result = ((km * 30) + ((movers*time)*200) + 500);
            } else if(km >= 0 && km <= 5){
                result = 500 + ((movers*time)*200) + ((time > 1 ? time - 1 : 0) * 400);
            } else if(km > 5 && km < 10){
                result = 650 + ((movers*time)*200) + ((time > 1 ? time - 1 : 0) * 400);
            } else {
                result = (km * 30);
            }
            document.getElementById('result').innerHTML = result;
        }

        function order() {
            const button = document.querySelector('.calc-title.button');
            const modal = document.querySelector('.modal'), modalSuccess = document.querySelector('.modal-success');
            button.addEventListener('click', () => {
                modal.classList.add('active');
            });

            document.addEventListener('click', event => {
                const isClickInside = document.querySelector('.modal-content').contains(event.target);
                const isClickInsideBtn = button.contains(event.target);
                if (!isClickInside && !isClickInsideBtn) {
                    modal.classList.remove('active');
                }
            });

            let tg = {
                token: "5873256517:AAH6AcGmqNC76DvT6J1CaRysrk5ghQMgnR8", // Your bot's token that got from @BotFather
                chat_id: "304095374" // The user's(that you want to send a message) telegram chat id
            }

            /**
             * By calling this function you can send message to a specific user()
             * @param {String} the text to send
             *
             */
            function sendMessage(text)
            {

                const url = `https://api.telegram.org/bot${tg.token}/sendMessage` // The url to request

                const obj = {
                    chat_id: tg.chat_id, // Telegram chat id
                    text: text // The text to send
                };

                const xht = new XMLHttpRequest();
                xht.open("POST", url, true);
                xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                xht.send(JSON.stringify(obj));
            }

            document.querySelector('.modal-send').addEventListener('click', () => {
                const name = document.getElementById('user-name');
                const phone = document.getElementById('user-number');

                sendMessage(`** Онлайн запис **\n\nІм'я: ${name.value}\nТелефон:${phone.value}\nТип вантажу: ${type}\nКількість вантажників: ${moversCount.toString()}\nДальність перевезення:${lengthKm.toString()}\nКількість витраченого часу:${usingTime.toString()}`);

                modal.classList.remove('active');
                name.setAttribute('value', '');
                phone.setAttribute('value', '');

                modalSuccess.classList.add('active');
            });

            document.querySelector('.modal-close').addEventListener('click', () => {
                document.querySelector('.modal-success').classList.remove('active');
            });
        }
        order();

    }
    calc();

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





});