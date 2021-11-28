"use strict";
import MediaCarousel from "../MediaCarousel/index.js";

export default class MediaCarouselWithThumbnail extends MediaCarousel {
  
  setupSwiper(mod){ 
    const config = {
        loop: true,
        spaceBetween: 5
    }  
    this.thumbnailInstance = new mod.Swiper(
        this.getElementsByClassName("swiper-thumbnail-container")?.[0],
        Object.assign({}, mod.defaultConfig, {observeParents: true, noSwiping : true, ...config})
    );
    this.swiperInstance = new mod.Swiper(
        this.getElementsByClassName("swiper-container")?.[0],
        Object.assign(mod.defaultConfig, { thumbs: { swiper: this.thumbnailInstance, observeParents: true, ...config} })
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
    setTimeout(() => {
        this.swiperInstance.emit('resize');
        this.thumbnailInstance.emit('resize');
        this.thumbnailInstance.update();
        this.swiperInstance.update();
    }, 100);   
  }

}

customElements.define("media-carousel-thumbnail", MediaCarouselWithThumbnail);