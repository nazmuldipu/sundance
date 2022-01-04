const fs = require("fs");
const getAllData = require("../../scripts/utils/get-page-data.cjs");
const fetch = require("node-fetch");

const getReportData = async () => {
    let getSnowReport, getLiftReport, snowReportJson, liftReportJson;
    try{
        getSnowReport = await fetch(
            `${process.env.HOTEL_SITE_API_URL}/snow-report`
        );
        getLiftReport = await fetch(
            `${process.env.HOTEL_SITE_API_URL}/lift-report`
        );
        snowReportJson = await getSnowReport.json();
        liftReportJson = await getLiftReport.json();
        if(getSnowReport.status === 200 && getLiftReport.status === 200){
            fs.writeFileSync('./pages/mountain-report/snow-report.json', JSON.stringify(snowReportJson,  null, '\t'));
            fs.writeFileSync('./pages/mountain-report/lift-report.json', JSON.stringify(liftReportJson,  null, '\t'));
        }else{
            throw new Error("Failed to fetch data from API");
        }
    }catch(error){
        // error handling
        // load from json
        snowReportJson = require('./snow-report.json');
        liftReportJson = require('./lift-report.json');
    }

    const snowReport = snowReportJson[0];
    const liftReport = liftReportJson[0];
    return {
        liftReport,
        snowReport,
    }
}

module.exports = async function () {
    const { liftReport, snowReport } = await getReportData();
    const { pageCMS } = await getAllData("/mountain-report");
    const roadsParking = [
        {
            name: "SR-92",
            status: liftReport?.road_92_condition,
        },
        {
            name: "Highway 189",
            status: liftReport?.road_189_condition,
        },
        {
            name: "Parking",
            status: liftReport?.parking_condition,
        },
    ];
    const forecasts = snowReport?.forecast?.daily;

    return {
        pageCMS: {
            pageData: pageCMS,
            forecasts,
            liftReport,
            roadsParking,
            snowReport: {
                temp: snowReport?.current?.temp?.slice(0, -1) ?? "",
                speed: snowReport?.current?.wind?.speed ?? "",
            },
        },
    };
};
