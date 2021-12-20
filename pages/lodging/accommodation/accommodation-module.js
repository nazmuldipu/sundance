import '../../../scripts/lib/globalEvents.js';
import "components/MediaCarousel/index.js";
import "components/Filter/index.js";
import {sortingOrder, getValue, filterByType, generateFilters, getFormattedFilterData} from 'scripts/utils/filter.js';

document.addEventListener('DOMContentLoaded', () => {
    const filter_container = document.querySelector('filter-component');
    const cards = Array.from(document.querySelectorAll('.flex__single-card'));
    /**
     * 
     * @param {array} filters 
     */
    function applyFilters(filters){
        const appliedBedrooms = filters.filter(filterByType('bedrooms')).map(getValue).flat();
        const appliedSleeps = filters.filter(filterByType('sleeps')).map(getValue).flat();
        const appliedType = filters.filter(filterByType('lodging')).map(getValue).flat();
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
            filters: {
                entries: filteredCards.length,
                filters: formattedFilter
            }
        });

    }

    filter_container.addEventListener('filter-change', (e) => {
        const { filters } = e.detail;
        applyFilters(filters);
    })

})

