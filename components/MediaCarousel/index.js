"use strict";

import ProgressiveElement from "../progressive-element.js";

export default class MediaCarousel extends ProgressiveElement {
  constructor() {
    super([
      {
        id: "swiper",
        behaviorPath: "../lib/swiper.js",
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
          this.swiperInstance = new mod.Swiper(
            this.getElementsByClassName("swiper-container")?.[0],
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
      });
    }
  }
}

customElements.define("media-carousel", MediaCarousel);