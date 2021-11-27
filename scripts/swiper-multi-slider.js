
import {Swiper, defaultConfig} from '../components/lib/swiper';
const condition = document.querySelector(".gallery-thumbs") && defaultConfig;
if (condition) {
    const galleryThumbs = new Swiper(".gallery-thumbs", {
      loop: true,
      spaceBetween: 8,
      slidesPerView: "auto",
      watchSlidesProgress: true,
      id: "swiper-2",
    });
}

export { Swiper, defaultConfig };