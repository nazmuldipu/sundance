import '../../../scripts/lib/globalEvents.js';
import "components/MediaCarousel/index.js";

const filter_container = document.querySelector('.filter__container');

console.log(filter_container);

filter_container.addEventListener('click', (e) => {
    console.log(e.target);
})