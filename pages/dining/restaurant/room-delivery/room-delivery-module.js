import { lazyLoadVideos } from '../../../../scripts/lazyloading.js';
import '../../../../components/index.js';
import "../../../../components/MediaCarousel/index.js";

document.addEventListener("DOMContentLoaded", lazyLoadVideos('lazy', { 
    rootMargin: '100px' // will start loading video with 100px buffer
 }));
