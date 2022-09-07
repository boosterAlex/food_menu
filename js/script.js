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
        console.dir(target);
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
    const btnModalClose = document.querySelector('[data-close]');
    const modalWindow = document.querySelector('.modal');

    function showModal() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modatTimerId);
    }

    function closeModal() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'auto';
    }

    btnModalOpen.forEach((btn) => {
        btn.addEventListener('click', showModal);
    });

    btnModalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
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
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 2.5;
            this.changeToBYN();
        }

        changeToBYN() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            element.innerHTML = `<div class="menu__item">
          <img src =${this.src} alt =${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> р/день</div>
          </div>
      </div>`;

            this.parent.append(element);
        }
    }

    new MenuItems(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container'
    ).render();
    new MenuItems(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        30,
        '.menu .container'
    ).render();
    new MenuItems(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        20,
        '.menu .container'
    ).render();
});
