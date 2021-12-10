const fs = require('fs');
const getAllData = require('../../../scripts/utils/get-page-data.cjs');

module.exports  = (async function(){
    const data = await getAllData('/lodging/accommodation');
    const additionalData = require('./accommodation-data.json');
    if(data){
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