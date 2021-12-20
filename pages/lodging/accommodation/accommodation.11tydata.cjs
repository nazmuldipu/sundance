const fs = require('fs');
const getAllData = require('../../../scripts/utils/get-page-data.cjs');
const saveData = true;

module.exports  = (async function(){

    const filterUtil =  await import('../../../scripts/utils/filter.js');
    const { getFilterData } = await filterUtil;
    const data = await getAllData('/lodging/accommodation');
    const additionalData = require('./accommodation-data.json');
    const { lodgingForm } = additionalData;
    const entries = data?.pageCMS["vertical-cards"]?.vertical_card_list?.length
    const filters = getFilterData(data.pageCMS ? data?.pageCMS["vertical-cards"]?.vertical_card_list.map(card => card.vertical_card) : []);
    const filterData = {
        filters,
        entries
    }
    const toDataToReturn = {
        ...data,
        lodgingForm,
        filters: filterData
    };
    if(saveData){
        fs.writeFileSync('./pages/lodging/accommodation/accommodation.11tydata.json', JSON.stringify(toDataToReturn,  null, '\t'));
    }
    return toDataToReturn;
})();