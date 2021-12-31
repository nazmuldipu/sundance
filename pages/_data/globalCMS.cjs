const fetchPageData = require('../../scripts/utils/fetch-page-data.cjs')

/**
 * fetch data of dine page
 * 
 * @returns {object} pageDatas
 */
async function getAllData() {
    let rawData = []
    let manipulateData = {}
    
    let argument = {
        brand: process.env.BRAND_SLUG,
        page: '/global-cms'
    }

    try {
        await fetchPageData(argument.brand,argument.page).then((response)=>{
            rawData = response.data.contentBySlug   
        }).catch((errors)=>{
            throw new Error(errors);
        })
    } catch (error) {
        throw new Error(error);
    }

    if (rawData?.length){
        rawData.forEach((data)=>{
            manipulateData[data.name] = data.values
            if(manipulateData?.events){
                manipulateData.events.events.forEach((event)=>{
                    event.jsDate = new Date(event.date)
                })
            }
            manipulateData.events.events.sort((a,b)=>{ return new Date(a.date).getTime() - new Date(b.date).getTime() });
        })
    }else{
        manipulateData = {}
    }

    return  manipulateData

}
module.exports  = getAllData
