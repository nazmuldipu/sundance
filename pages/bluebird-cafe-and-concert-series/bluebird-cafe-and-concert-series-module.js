import '../../../scripts/lib/globalEvents.js';
import "components/MediaCarousel/index.js";
import "components/Filter/index.js";

const sortingOrder = ['bedrooms', 'sleeps', 'types'];

document.addEventListener('DOMContentLoaded', () => {
    const filter_container = document.querySelector('filter-component');
    const cards = Array.from(document.querySelectorAll('.flex__single-card'));
    const filters = [];

    const filterMap = {
        'bedrooms': 'bedrooms-filter',
        'sleeps': 'sleeps-filter',
        'types': 'lodging-filter'
    }

    const getValue = object => object.value;

    function getFormattedFilterData(filtersObject){
        return Object.keys(filtersObject).map(key => {
            const value = filtersObject[key];
            return {
              title: key,
              items: Object.keys(value).map( itemKey => {
                      const parsedItemKey = itemKey.replace(/\s/g, '-').toLowerCase().replace('&', '');
                      return {
                          "copy": itemKey,
                          "id": `${key}-filter-${parsedItemKey}`,
                          "name": filterMap[key],
                          "quantity": value[itemKey],
                      }
                  })
            }
        });
    }
    
    /**
     * 
     * @param {array} filters 
     */
    function applyFilters(filters){
        const appliedBedrooms = filters.filter(filter => filter.type === 'bedrooms').map(getValue).flat();
        const appliedSleeps = filters.filter(filter => filter.type === 'sleeps').map(getValue).flat();
        const appliedType = filters.filter(filter => filter.type === 'lodging').map(getValue).flat();
        cards.forEach(card => card.classList.remove('hidden'));
        const isFilterAdded = card => {
            const cardObject = card.dataset.card ? JSON.parse(card.dataset.card) : {};
            const { Type: type, Sleeps: sleeps, Bedrooms: bedrooms } = cardObject;
            const isBedroomsFilterAdded = appliedBedrooms.length > 0 && bedrooms && !appliedBedrooms.some(item => bedrooms.includes(item));
            const isSleepsFilterAdded = appliedSleeps.length > 0 && sleeps && !appliedSleeps.some(item => sleeps.includes(item));
            const isTypeFilterAdded = appliedType.length > 0 && type && !appliedType.some(item => type.includes(item));
            return isBedroomsFilterAdded || isSleepsFilterAdded || isTypeFilterAdded; 
        }
        const filteredCards = cards.filter( card => isFilterAdded(card));
        filteredCards.forEach(card => card.classList.add('hidden'));
        const notFilteredCards = cards.filter( card => !isFilterAdded(card));

        const updatedFilterData = notFilteredCards.map(card => {
            return card.dataset.card ? JSON.parse(card.dataset.card) : {};
        })
        const filtersObject = generateFilters(updatedFilterData);
        const formattedFilter = getFormattedFilterData(filtersObject).sort((a, b) => sortingOrder.indexOf(a.title) - sortingOrder.indexOf(b.title));
        filter_container.setFilters({
            entries: filteredCards.length,
            filters: formattedFilter
        });
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

    filter_container.addEventListener('click', (e) => {
        if(e.target.type === 'checkbox' && e.target.name !== 'filter'){
            const value = [e.target.value];
            const type = e.target.name ? e.target.name.split('-') : '';
            const id = e.target.id;
            const checked = e.target.checked;
            const isFilterSelected = filters.find(filter => filter.id === id);
            if(checked && !isFilterSelected){
                filters.push({
                    id: id,
                    type: type[0],
                    value: value
                })
            }else{
                filters.splice(filters.findIndex(filter => filter.id === id), 1);
            }
            applyFilters(filters);
        }
    })

})

