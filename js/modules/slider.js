function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field,
}) {
    const nextSlider = document.querySelector(nextArrow);
    const prevSlider = document.querySelector(prevArrow);
    const slides = document.querySelectorAll(slide);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    let width = window.getComputedStyle(slidesWrapper).width;
    const slider = document.querySelector(container);

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
}

export default slider;
