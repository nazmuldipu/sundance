import '../../../scripts/lib/globalEvents.js';
//import  "../../../components/lib/simple-lightbox.js";

setTimeout(() => {
    let changeSlider= document.querySelector('media-carousel')
    //console.log(changeSlider["swiperInstance"])
    changeSlider["swiperInstance"].on('slideChange',function (e) {
        console.log(e);
        if (e.realIndex === 3) {
            let gallery = new SimpleLightbox('.gallery div');
        }
        
    })   
}, 1000);

  