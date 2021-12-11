import '../../../scripts/lib/globalEvents.js';
import "components/MediaCarousel/index.js";

const filter_container = document.querySelector('.filter__container');
const cards = Array.from(document.querySelectorAll('.flex__single-card'));
const cardsContainer = document.querySelector('.flex-card-container');

const filters = []

filter_container.addEventListener('click', (e) => {
    if(e.target.type === 'checkbox'){
        const value = e.target.value ? e.target.value.split('-') : '';
        const type = e.target.name ? e.target.name.split('-') : '';
        const id = e.target.id;
        const checked = e.target.checked;
        const isFilterSelected = filters.find(filter => filter.id === id);
        if(checked){
            if(!isFilterSelected){
                filters.push({
                    id: id,
                    type: type[0],
                    value: value
                })
            }
        }else{
            filters.splice(filters.findIndex(filter => filter.id === id), 1);
        }
        applyFilters(filters);
    }
})

const getValue = object => object.value;

/**
 * 
 * @param {array} filters 
 */
function applyFilters(filters){
    const appliedBedrooms = filters.filter(filter => filter.type === 'bedrooms').map(getValue);
    const appliedSleeps = filters.filter(filter => filter.type === 'sleeps').map(getValue);
    const appliedType = filters.filter(filter => filter.type === 'type').map(getValue); 
    cards.forEach(card => card.classList.remove('hidden'));
    const filteredCards = cards.filter( card => {
        const cardObject = card.dataset.card ? JSON.parse(card.dataset.card) : {};
        const { Type: type, Sleeps: sleeps, Bedrooms: bedrooms } = cardObject;
        const isBedroomsFilterAdded = appliedBedrooms.length > 0 && bedrooms && !appliedBedrooms.some(item => bedrooms.includes(item));
        const isSleepsFilterAdded = appliedSleeps.length > 0 && sleeps && !appliedSleeps.some(item => sleeps.includes(item));
        const isTypeFilterAdded = appliedType.length > 0 && type && !appliedType.some(item => type.includes(item));
        return isBedroomsFilterAdded || isSleepsFilterAdded || isTypeFilterAdded;      
    });
    filteredCards.forEach(card => card.classList.add('hidden'));
}

