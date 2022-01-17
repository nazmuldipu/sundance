"use strict";
import ProgressiveElement from "../progressive-element.js";
import  "../lib/simple-lightbox.js";

/* 
@todo
Future improvement:
- load simple lightbox only when needed
*/
export default class MediaCarousel extends ProgressiveElement {
  constructor() {
    super([
      {
        id: "swiper",
        behaviorPath: "/../lib/swiper.js", // have to use relative path
        stylePath: "https://unpkg.com/swiper/swiper-bundle.min.css",
        type: "IntersectionObserver",
        observerConfig: {
          rootMargin: "400px",
        },
      }
    ]);

    this.galleryInstance = null;
    this.swiperInstance = null;
    this.showLightbox = Boolean(this.dataset.lightbox);
    this.type = this.dataset.type ?? 'defaultConfig';

    SimpleLightbox.prototype.open = function(elem) {
      elem = elem || this.elements[0];
      if(typeof jQuery !== "undefined" && elem instanceof jQuery) {
          elem = elem.get(0);
      }
      this.initialImageIndex = this.elements.findIndex(el => {
        return el.getAttribute("href") === elem.getAttribute("href");
      })
      if(this.initialImageIndex > -1) {
          this.openImage(elem);
      }
    }
  }

  // assuming use of IntersectionObserver
  _onLoad(moduleId, entries, observer) {
    if (entries.some((entry) => entry.isIntersecting)) {
      super._onLoad(moduleId).then(( res ) => {
        const mod = res[1];
        if (mod.Swiper) {
          this.setupSwiper(mod);
        }
      });
    }
  }
  getSwiperInstance(){
    return this.getElementsByClassName("swiper-container")?.[0];
  }
  setupSwiper(mod){
    var _this = this;
    this.swiperInstance = new mod.Swiper(
      this.getSwiperInstance(),
      Object.assign({}, mod[this.type]),
    );
    if(this.showLightbox) {
      setTimeout(() => {
        _this.galleryInstance = new SimpleLightbox('.swiper-slide div', {
          captions: false,
          history: false,
          uniqueImages: false,
          showCounter: false,
        });
      }, 1000);
    }   
    this.swiperInstance.on("realIndexChange", function(e){
      _this.galleryInstance && _this.galleryInstance.refresh();
      this.el.dispatchEvent(
        new CustomEvent("slideChanged", {
          detail: {
            realIndex: e.realIndex,
          },
        })
      );
    });

    this.swiperInstance.on("click", (swiper, event)=>{
      const { clickedIndex, slides } = swiper;
      if(clickedIndex){
        const slideToShow = slides[clickedIndex];
        _this.galleryInstance && _this.galleryInstance.open(slideToShow.querySelector("div"));
      }

    })
    setTimeout(() => {
      this.swiperInstance.emit('resize');
    }, 10);   
  }
}

customElements.define("media-carousel", MediaCarousel);
