// have this one import node_modules
import 'https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js';

console.log('splide', Splide)

const splideInstance = new Splide('#test-slider', {
    type: 'loop',
    lazyLoad: 'nearby',
    cover: true,
    heightRatio: 0.5
}).mount();

export default {
    splide: splideInstance,
    butt: 'stuff'
}
