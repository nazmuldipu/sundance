import '../../scripts/lib/globalEvents.js';
import  '../../components/Filter/index.js'
import { getValue, filterByType, getFilterData} from 'scripts/utils/filter.js';

document.addEventListener('DOMContentLoaded', () => {
    const filter_container = document.querySelector('filter-component');
    /**
     * 
     * @param {array} filters 
     */
    function applyFilters(filters){
        console.log(filters);
        const cards = Array.from(document.querySelectorAll('.flex__single-card'));
        console.log(cards.length);
        const appliedBedrooms = filters.filter(filterByType('bedrooms')).map(getValue).flat();
        const appliedSleeps = filters.filter(filterByType('sleeps')).map(getValue).flat();
        const appliedType = filters.filter(filterByType('lodging')).map(getValue).flat();
        cards.forEach(card => card.classList.remove('hidden'));

        const isFilterAdded = card => {
            console.log(card);
            console.log(card.firstElementChild.dataset);
            const cardObject = card.firstElementChild.dataset.card ? JSON.parse(card.firstElementChild.dataset.card) : {};
            const { Type: type, Sleeps: sleeps, Bedrooms: bedrooms } = cardObject;
            const isBedroomsFilterAdded = appliedBedrooms.length > 0 && bedrooms && !appliedBedrooms.some(item => bedrooms === item);
            const isSleepsFilterAdded = appliedSleeps.length > 0 && sleeps && !appliedSleeps.some(item => sleeps === item);
            const isTypeFilterAdded = appliedType.length > 0 && type && !appliedType.some(item => type === item);
            return isBedroomsFilterAdded || isSleepsFilterAdded || isTypeFilterAdded; 
        }

        const filteredCards = cards.filter( card => isFilterAdded(card));
        console.log(filteredCards);
        filteredCards.forEach(card => card.classList.add('hidden'));
        const notFilteredCards = cards.filter( card => !isFilterAdded(card));

        const updatedFilterData = notFilteredCards.map(card => {
            return card.dataset.card ? JSON.parse(card.dataset.card) : {};
        })
        const formattedFilter = getFilterData(updatedFilterData);
        
        filter_container.setFilters({
            filters: {
                entries: notFilteredCards.length,
                filters: formattedFilter
            }
        });

    }

    filter_container.addEventListener('filter-change', (e) => {
        const { filters } = e.detail;
        applyFilters(filters);
    })

})