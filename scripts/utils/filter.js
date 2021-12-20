const filterMap = {
    'bedrooms': 'bedrooms-filter',
    'sleeps': 'sleeps-filter',
    'types': 'lodging-filter'
};

export const sortingOrder = ['bedrooms', 'sleeps', 'types'];

export const getValue = object => object.value;

export const filterByType = (type) => filter => filter.type === type;

export function generateFilters(cardData){
    const types = duplicates(cardData.map(card => card.Type).flat());
    const bedrooms = duplicates(cardData.map(card => card.Bedrooms).flat());
    const sleeps = duplicates(cardData.map(card => card.Sleeps).flat());
    return {
        types,
        bedrooms,
        sleeps
    }
}

export function duplicates(array){
    return array.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});
}

export function getFormattedFilterData(filtersObject){
    return Object.keys(filtersObject).map(key => {
        const value = filtersObject[key];
        return {
          title: key,
          items: Object.keys(value).map( itemKey => {
                  const parsedItemKey = itemKey.replace(' & ', ' ').replace(/\s/g, '-').toLowerCase();
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