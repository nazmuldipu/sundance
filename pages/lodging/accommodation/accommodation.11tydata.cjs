const fs = require('fs');
const getAllData = require('../../../scripts/utils/get-page-data.cjs');
const saveData = false;
module.exports  = (async function(){
    const data = await getAllData('/lodging/accommodation');
    const additionalData = require('./accommodation-data.json');
    if(data && additionalData && saveData){
        fs.writeFileSync('./pages/lodging/accommodation/accommodation.11tydata.json', JSON.stringify({
            ...data,
            ...additionalData
        },  null, '\t'));
    }
    return {
        ...data,
        ...additionalData
    }
})();