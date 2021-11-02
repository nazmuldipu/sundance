"use strict";
import Swiper from "https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js";

const defaultConfig = {
  loop: true,
  preloadImages: false,
  slidesPerView: "auto",
  loopedSlides: 4,
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
