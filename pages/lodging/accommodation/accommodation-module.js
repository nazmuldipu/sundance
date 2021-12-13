import '../../../scripts/lib/globalEvents.js';
import "components/MediaCarousel/index.js";

const filter_container = document.querySelector('.filter__container');
const cards = Array.from(document.querySelectorAll('.flex__single-card'));
const filters = []

const getValue = object => object.value;
const cardData = cards.map(card => {
    const cardObject = card.dataset.card ? JSON.parse(card.dataset.card) : {};
    return cardObject;
});
const filtersObject = generateFilters(cardData);
const filterMap = {
    'bedrooms': 'bedrooms-filter',
    'sleeps': 'sleeps-filter',
    'types': 'lodging-filter'
}
const formattedFilter = Object.keys(filtersObject).map(key => {
    const value = filtersObject[key];
    return {
      title: key,
      items: Object.keys(value).map( itemKey => {
              return {
                  "copy": key,
                  "id": `bedrooms-filter-${itemKey}`,
                  "name": filterMap[key],
                  "quantity": value[itemKey],
              }
          })
    }
  });
filter_container.addEventListener('click', (e) => {
    if(e.target.type === 'checkbox'){
        const value = [e.target.value];
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
    const appliedBedrooms = filters.filter(filter => filter.type === 'bedrooms').map(getValue).flat();
    const appliedSleeps = filters.filter(filter => filter.type === 'sleeps').map(getValue).flat();
    const appliedType = filters.filter(filter => filter.type === 'lodging').map(getValue).flat();
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

function generateFilters(cardData){
    const types = duplicates(cardData.map(card => card.Type).flat());
    const bedrooms = duplicates(cardData.map(card => card.Bedrooms).flat());
    const sleeps = duplicates(cardData.map(card => card.Sleeps).flat());
    return {
        types,
        bedrooms,
        sleeps
    }
}

function duplicates(array){
    return array.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});
}

function updateFilters(){

}