
import {Swiper, defaultConfig} from '../components/lib/swiper';
if (document.querySelector(".gallery-thumbs") && defaultConfig) {
    let galleryThumbs = new Swiper(".gallery-thumbs", {
    loop: true,
    spaceBetween: 8,
    slidesPerView: "auto",
    watchSlidesProgress: true,
  });
  defaultConfig.thumbs = {
    swiper: galleryThumbs
  }
}
console.log(defaultConfig)
export { Swiper, defaultConfig };