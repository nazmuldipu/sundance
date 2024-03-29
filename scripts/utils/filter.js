const filterMap = {
    'bedrooms': 'bedrooms-filter',
    'sleeps': 'sleeps-filter',
    'types': 'lodging-filter'
};

export const sortingOrder = ['bedrooms', 'sleeps', 'types'];

export const getValue = object => object.value;

export const filterByType = (type) => filter => filter.type === type;

export function generateFilters(cardData){
    const types = duplicates(cardData.map(card => ({value: card.Type, disabled: card.disabled})).flat());
    const bedrooms = duplicates(cardData.map(card => ({value: card.Bedrooms, disabled: card.disabled})).flat());
    const sleeps = duplicates(cardData.map(card => ({value: card.Sleeps, disabled: card.disabled})).flat());
    return {
        types,
        bedrooms,
        sleeps
    }
}

export function duplicates(array){
    return array.reduce(function(prev, cur) {
        prev[cur.value] = {
            value: (prev[cur.value]?.value || 0) + 1,
            disabled: cur.disabled
        }
        return prev;
      }, {});
}

export function getFormattedFilterData(filtersObject){
    return Object.keys(filtersObject).map(key => {
        const value = filtersObject[key];
        return {
          title: key,
          items: Object.keys(value).map( itemKey => {
                  //const parsedItemKey = itemKey.replace(' & ', ' ').replace(/\s/g, '-').toLowerCase();
                  return {
                      "copy": itemKey,
                      "id": `${key}-filter-${itemKey}`,
                      "name": filterMap[key],
                      "quantity": value[itemKey]?.value || 0,
                      "disabled": value[itemKey]?.disabled || false
                  }
              })
        }
    });
}

export const getFilterData = (cardData) => {
    const filterData = generateFilters(cardData);
    return getFormattedFilterData(filterData).sort((a, b) => sortingOrder.indexOf(a.title) - sortingOrder.indexOf(b.title));
}

if(typeof module !== 'undefined'){
    module.exports = {
        sortingOrder,
        getValue,
        filterByType,
        generateFilters,
        getFormattedFilterData,
        getFilterData
    }
}