import '../../../scripts/lib/globalEvents.js';
import "components/MediaCarousel/index.js";

const filter_container = document.querySelector('.filter__container');
const cards = document.querySelectorAll('.flex__single-card')
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

/**
 * 
 * @param {array} filters 
 */
function applyFilters(filters){
    console.log(filters);
    const getValue = object => object.value;
    const appliedBedrooms = filters.filter(filter => filter.type === 'bedrooms').map(getValue);
    const appliedSleeps = filters.filter(filter => filter.type === 'sleeps').map(getValue);
    const appliedType = filters.filter(filter => filter.type === 'type').map(getValue); 
    console.log({appliedBedrooms, appliedSleeps, appliedType})
    cards.forEach(card => {
        const cardObject = card.dataset.card ? JSON.parse(card.dataset.card) : {};
        const { Type: type, Sleeps: sleeps, Bedrooms: bedrooms } = cardObject;
        console.log({type, sleeps, bedrooms})
        if(appliedBedrooms.length > 0 && bedrooms && !appliedBedrooms.some(item => bedrooms.includes(item))){
            card.style.display = 'none';
        }else if(appliedSleeps.length > 0 && sleeps && !appliedSleeps.some(item => sleeps.includes(item))){
            card.style.display = 'none';
        }else if(appliedType.length > 0 && type && !appliedType.some(item => type.includes(item))){
            card.style.display = 'none';
        }

    })
}

