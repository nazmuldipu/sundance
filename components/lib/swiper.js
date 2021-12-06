"use strict";
import SwiperCore, {Navigation, Lazy, Thumbs} from 'swiper/core';
import Swiper from 'swiper';
SwiperCore.use([Navigation, Lazy, Thumbs]);

const defaultConfig = {
  loop: true,
  preloadImages: false,
  slidesPerView: "auto",
  loopedSlides: 5,
  spaceBetween: 8,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 2,
    loadOnTransitionStart: true,
  },
  navigation: {
    nextEl: ".carousel-button-next",
    prevEl: ".carousel-button-prev",
  },
};
export { Swiper, defaultConfig };
