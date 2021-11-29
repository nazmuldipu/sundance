/* ignore */
import { Swiper, defaultConfig } from 'components/lib/swiper.js';
import ProgressiveElement from 'components/progressive-element.js';
document.addEventListener('DOMContentLoaded', () => {
    ProgressiveElement.loadCSS('https://unpkg.com/swiper/swiper-bundle.min.css').then(() => {
        var swiper = new Swiper(".mySwiper", {    loop: true,    spaceBetween: 10,    slidesPerView: 4,    freeMode: true,    watchSlidesProgress: true  });
        var swiper2 = new Swiper(".mySwiper2", {    loop: true,    spaceBetween: 10,    navigation: {      nextEl: ".swiper-button-next",      prevEl: ".swiper-button-prev"    },    thumbs: {      swiper: swiper    }});
    })
});