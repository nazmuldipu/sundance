const fs = require('fs');
const getAllData = require('../../scripts/utils/get-page-data.cjs');
const saveData = false;

module.exports  = (async function(){
    try {
        const filterUtil =  await import('../../scripts/utils/filter.js');
        const { getFilterData } = await filterUtil;
        const data = await getAllData('/lodging/accommodation');
        const additionalData = require('./lodging.11tydata.json');
        const { lodgingForm } = additionalData;
        const { pageCMS } = data;
        const cards = pageCMS['vertical-cards'];
        const entries = cards?.vertical_card_list?.length
        const filters = getFilterData(cards ? cards?.vertical_card_list.map(card => card.vertical_card) : []);
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
    } catch (error) {
        console.log(error);
    }
})();
