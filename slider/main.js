window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const slider = document.querySelector('.offer__slider'),
          sliderWrap = slider.querySelector('.offer__slider-wrapper'),
          sliderField = slider.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(sliderWrap).width,
          slide = slider.querySelectorAll('.offer__slide'),
          slideCurrent = slider.querySelector('#current'),
          slideTotal = slider.querySelector('#total'),
          slidePrev = slider.querySelector('.offer__slider-prev'),
          slideNext = slider.querySelector('.offer__slider-next');

    let current = 1,
        offset = 0;

    sliderWrap.style.overflow = 'hidden';
    slide.forEach(item => item.style.width = width);
    sliderField.style.cssText = `
        width: ${100 * slide.length}%;
        display: flex;
        transition: .5s;
    `;
    slider.style.position = 'relative';

    const dotsList = document.createElement('ol'),
            dots = [];
    dotsList.classList.add('dots');
    dotsList.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dotsList);

    for ( let i = 0; i < slide.length; i++ ) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if ( i == 0 ) {
            dot.style.opacity = '1';
        }
        dotsList.append(dot);
        dots.push(dot);
    }
    
    if ( current < 10 ) {
        slideTotal.innerHTML = `0${slide.length}`;
        slideCurrent.innerHTML = `0${current}`;
    } else {
        slide.total.innerHTML = slide.length;
        slideCurrent.innerHTML = current;
    }

    function deleteNotDigints(str) {
        return +str.replace(/\D/g, '');
    }

    slideNext.addEventListener('click', () => {
        if ( offset == deleteNotDigints(width) * (slide.length - 1) ) {
            offset = 0;
        } else {
            offset += deleteNotDigints(width);
        }
        changeOffset(offset);

        if ( current < slide.length ) {
            current++;
        } else {
            current = 1;
        }

        showChangeSlide();
        changeActiveDots();
    });

    slidePrev.addEventListener('click', () => {
        if ( offset == 0 ) {
            offset = deleteNotDigints(width) * (slide.length - 1);
        } else {
            offset -= deleteNotDigints(width);
        }
        changeOffset(offset);

        if ( current == 1 ) {
            current = slide.length;
        } else {
            current--;
        }

        showChangeSlide();
        changeActiveDots();
    });

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            current = slideTo;
            offset = deleteNotDigints(width) * (slideTo - 1);

            changeOffset(offset);
            showChangeSlide();
            changeActiveDots();
        });
    });

    function changeOffset(num) {
        sliderField.style.transform = `translateX(-${num}px)`;
    }

    function showChangeSlide() {
        if ( current < 10 ) {
            slideCurrent.innerHTML = `0${current}`;
        } else {
            slideCurrent.innerHTML = current;
        }
    }

    function changeActiveDots() {
        dots.forEach(item => item.style.opacity = '.5');
        dots[current - 1].style.opacity = '1';
    }
    
});