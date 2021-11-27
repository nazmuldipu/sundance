"use strict";
import MediaCarousel from "../MediaCarousel/index.js";

export default class MediaCarouselWithThumbnail extends MediaCarousel {
  
  setupSwiper(mod){
    console.log(mod);  
    this.thumbnailInstance = new mod.Swiper(
        this.getElementsByClassName("swiper-thumbnail-container")?.[0],
        mod.defaultConfig
    );
    this.swiperInstance = new mod.Swiper(
        this.getElementsByClassName("swiper-container")?.[0],
        Object.assign(mod.defaultConfig, { thumbs: { swiper: this.thumbnailInstance } })
    );
    console.log(this.swiperInstance);
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

customElements.define("media-carousel-thumbnail", MediaCarouselWithThumbnail);