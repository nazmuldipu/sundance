import { lazyLoadVideos } from '../../scripts/lazyloading.js';
import '../../components/index.js';
import {bar} from '../../scripts/sample';

document.addEventListener("DOMContentLoaded", lazyLoadVideos('lazy', { 
    rootMargin: '100px' // will start loading video with 100px buffer
 }));

console.log('BAR BAR GOO', bar)