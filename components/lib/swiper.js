"use strict";
import SwiperCore, {Navigation, Lazy} from 'swiper/core';
SwiperCore.use([Navigation, Lazy]);
import Swiper from 'swiper';

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
