'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //==================Tabs===================//

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((tab) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach((tab) => {
            tab.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(menu = 0) {
        tabsContent[menu].classList.add('show', 'fade');
        tabsContent[menu].classList.remove('hide');
        tabs[menu].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target === tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //   const menuDiv = document.createElement('div');
    //   menuDiv.classList.add('tabheader__item');
    //   menuDiv.innerText = 'Govno';
    //   tabsParent.append(menuDiv);

    //   tabs.forEach((tab, i) => {
    //     tab.addEventListener('click', () => {
    //       hideTabContent();
    //       showTabContent(i);
    //     });
    //   });

    //========================Timer ===================//

    const deadline = '2022-09-07';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }
    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
            }
        }
    }

    setClock('.timer', deadline);

    // const timerBlock = document.querySelectorAll('.timer__block');

    // timerBlock.forEach((table) => {
    //   if (table.innerHTML < 10) {
    //     table = `0${table}`;
    //   }

    //   console.log(table);
    // });

    // ============================== Modal Window =================//
    const btnModalOpen = document.querySelectorAll('[data-modal]');
    // const btnModalClose = document.querySelector('[data-close]');
    const modalWindow = document.querySelector('.modal');

    function showModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modatTimerId);
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnModalOpen.forEach((btn) => {
        btn.addEventListener('click', showModal);
    });

    // btnModalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (
            e.target === modalWindow ||
            e.target.getAttribute('data-close') === ''
        ) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modatTimerId = setTimeout(showModal, 15000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // =========================== Class fo CardMenu ====================

    class MenuItems {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 2.5;
            this.changeToBYN();
        }

        changeToBYN() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className);
                });
            }

            element.innerHTML = `
          <img src =${this.src} alt =${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> р/день</div>
          </div>`;

            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    // getResource('http://localhost:3000/menu').then((data) => {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuItems(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             '.menu .container'
    //         ).render();
    //     });
    // });

    axios.get('http://localhost:3000/menu').then((data) => {
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuItems(
                img,
                altimg,
                title,
                descr,
                price,
                '.menu .container'
            ).render();
        });
    });

    // getResource('http://localhost:3000/menu').then((data) => {
    //     createCard(data);
    // });

    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src =${img} alt =${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> р/день</div>
    //             </div>`;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // ======================== Forms =======================

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/icons/spinner1.svg',
        succes: 'Thank you, we will contact you soon',
        failure: 'Fail...',
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            // body: formData,
            body: data,
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('spinner');
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(() => {
                    showThanksModal(message.succes);
                    form.reset();
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
                <form action="#">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>`;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 3000);
    }

    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then((res) => console.log(res));

    // ============================= Slider ==========================

    const nextSlider = document.querySelector('.offer__slider-next');
    const prevSlider = document.querySelector('.offer__slider-prev');
    const slides = document.querySelectorAll('.offer__slide');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    let width = window.getComputedStyle(slidesWrapper).width;
    const slider = document.querySelector('.offer__slider');

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    function opacity() {
        dots.forEach((dot) => {
            dot.style.opacity = '0.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    }
    function zeroAdd() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function delUnit(str) {
        return +str.replace(/\D/g, '');
    }

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    nextSlider.addEventListener('click', () => {
        if (offset === delUnit(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += delUnit(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        zeroAdd();
        opacity();
    });

    prevSlider.addEventListener('click', () => {
        if (offset === 0) {
            offset = delUnit(width) * (slides.length - 1);
        } else {
            offset -= delUnit(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        zeroAdd();
        opacity();
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = delUnit(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            zeroAdd();
            opacity();
        });
    });

    // slideShow(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function slideShow(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((slide) => {
    //         slide.classList.add('hide');
    //         slide.classList.add('fade');
    //         slide.classList.remove('show');
    //     });
    //     slides[slideIndex - 1].classList.add('show');

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     slideShow((slideIndex += n));
    // }

    // nextSlider.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // prevSlider.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // =================== Calculator ======================

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, actciveClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            console.log(elem);
            elem.classList.remove(actciveClass);
            if (
                elem.getAttribute('data-ratio') ===
                localStorage.getItem('ratio')
            ) {
                elem.classList.add(actciveClass);
            }
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(actciveClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings(
        '.calculating__choose_big div',
        'calculating__choose-item_active'
    );

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        }
        if (sex === 'male') {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }

    function getStaticInfo(selector, actciveClass) {
        const elements = document.querySelectorAll(`${selector} div`);

        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem(
                        'ratio',
                        +e.target.getAttribute('data-ratio')
                    );
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach((elem) => {
                    elem.classList.remove(actciveClass);
                });

                e.target.classList.add(actciveClass);
                calcTotal();
            });
        });
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo(
        '.calculating__choose_big div',
        'calculating__choose-item_active'
    );

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.boxShadow = '0 4px 15px rgb(250 0 0 / 40%)';
            } else {
                input.style.boxShadow = '0 4px 15px rgb(0 0 0 / 20%)';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
});
