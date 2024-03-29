import '../../scripts/lib/globalEvents.js';
import  '../../components/Filter/index.js';
import '../../components/DatePicker/index.js';
import { getValue, filterByType, getFilterData} from 'scripts/utils/filter.js';

document.addEventListener('DOMContentLoaded', () => {

    const filter_container = document.querySelector('filter-component');
    const searchParams = new URLSearchParams(window.location.search);
    const filterArray = [];
    const searchFilters = {
        types: searchParams.get('lodging'),
        bedrooms: searchParams.get('bedrooms'),
        sleeps: searchParams.get('sleeps'),
    }
    Object.keys(searchFilters).forEach(key => {
        if(searchFilters[key]) {
            filterArray.push({
                id: `${key}-filter-${searchFilters[key]}`,
                type: key === 'types' ? 'lodging' : key,
                value: searchFilters[key]
            })
        }
    })
    if(filterArray.length) {
        applyFilters(filterArray);
    }

    /**
     * 
     * @param {array} filters 
     */
    function applyFilters(filters){
        const cards = Array.from(document.querySelectorAll('.flex__single-card'));
        const appliedBedrooms = filters.filter(filterByType('bedrooms')).map(getValue).flat();
        const appliedSleeps = filters.filter(filterByType('sleeps')).map(getValue).flat();
        const appliedType = filters.filter(filterByType('lodging')).map(getValue).flat();
        cards.forEach(card => card.classList.remove('hidden'));

        const isFilterAdded = card => {
            const cardObject = card.dataset.card ? JSON.parse(card.dataset.card) : {};
            const { Type: type, Sleeps: sleeps, Bedrooms: bedrooms } = cardObject;
            const isBedroomsFilterAdded = appliedBedrooms.length > 0 && bedrooms && !appliedBedrooms.some(item => bedrooms === item);
            const isSleepsFilterAdded = appliedSleeps.length > 0 && sleeps && !appliedSleeps.some(item => sleeps === item);
            const isTypeFilterAdded = appliedType.length > 0 && type && !appliedType.some(item => type === item);
            return isBedroomsFilterAdded || isSleepsFilterAdded || isTypeFilterAdded; 
        }

        const filteredCards = cards.filter( card => isFilterAdded(card));
        filteredCards.forEach(card => card.classList.add('hidden'));
        const notFilteredCards = cards.filter( card => !isFilterAdded(card));

        const notFilteredCardData = cards.map( card => {
            const cardData = card.dataset.card ? JSON.parse(card.dataset.card) : {};
            cardData.disabled = false;
            if(isFilterAdded(card)){
                cardData.disabled = true;
            }
            card.dataset.card = JSON.stringify(cardData);
            return card;
        });

        const updatedFilterData = notFilteredCardData.map(card => {
            return card.dataset.card ? JSON.parse(card.dataset.card) : {};
        })
        const formattedFilter = getFilterData(updatedFilterData);  
        filter_container.setFilters({
            filters: {
                entries: notFilteredCards.length,
                filters: formattedFilter
            },
            selectedFilters: filters
        });

    }

    filter_container.addEventListener('filter-change', (e) => {
        const { filters } = e.detail;
        applyFilters(filters);
        updateUrl(filters);
    })

    function updateUrl(filters){
        const values = filters.map(filter => {
            return filter.value;
        })
        if(values.length == 0){
            window.history.pushState(null, null, window.location.pathname);
        }else{
            const url = new URL(window.location.href);
            const queryParams = url.searchParams;
            for( key of queryParams.keys()){
               delete queryParams.delete(key);
            } 
            filters.forEach(filter => {
                const { type, value } = filter;
                queryParams.set(type, value);
            })
            window.history.replaceState({}, '', url.href);
        }

    };

})