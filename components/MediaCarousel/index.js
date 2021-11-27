"use strict";
import ProgressiveElement from "../progressive-element.js";


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
      },
    ]);
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
    this.swiperInstance = new mod.Swiper(
      this.getSwiperInstance(),
      mod.defaultConfig
    );
    this.swiperInstance.on("realIndexChange", function (e) {
      this.el.dispatchEvent(
        new CustomEvent("slideChanged", {
          detail: {
            realIndex: e.realIndex,
          },
        })
      );
    });   
  }
}

customElements.define("media-carousel", MediaCarousel);
