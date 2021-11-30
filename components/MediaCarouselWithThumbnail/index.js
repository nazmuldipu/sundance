"use strict";
import MediaCarousel from "../MediaCarousel/index.js";
export default class MediaCarouselWithThumbnail extends MediaCarousel {
  
  setupSwiper(mod){
    this.loadStyles();  
    const config = {
        loop: true,
        loopedSlides: 7
    } 
    this.thumbnailInstance = new mod.Swiper(
        this.getElementsByClassName("mySwiper")?.[0],
        {loop: true, slidesPerView: 4,freeMode: true, watchSlidesProgress: true }
        //Object.assign({}, mod.defaultConfig, {observeParents: true, ...config})
    );
    this.swiperInstance = new mod.Swiper(
        this.getElementsByClassName("mySwiper2")?.[0],
        //Object.assign(mod.defaultConfig, { thumbs: { swiper: this.thumbnailInstance, observeParents: true, noSwiping : true, ...config} })
        {loop: true, navigation: {nextEl: ".carousel-button-next-container",  prevEl: ".carousel-button-prev-container"}, thumbs: { swiper: this.thumbnailInstance }}
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
  loadStyles(){
    import('./styles.js').then( module => {
        const style = document.createElement('style');
        style.innerHTML = module.default;
        this.prepend(style);
    })
  }

}

customElements.define("media-carousel-thumbnail", MediaCarouselWithThumbnail);