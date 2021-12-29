const getAllData = require("../../scripts/utils/get-page-data.cjs");

const fetch = require("node-fetch");
module.exports = async function () {
    const getSnowReport = await fetch(
        "https://hotel-site-dev.skipperhospitality.com/sundance/snow-report"
    );
    const getLiftReport = await fetch(
        "https://hotel-site-dev.skipperhospitality.com/sundance/lift-report"
    );
    const snowReportJson = await getSnowReport.json();
    const snowReport = snowReportJson[0];
    const getLiftReportJson = await getLiftReport.json();
    const liftReport = getLiftReportJson[0];
    const roadsParking = [
        {
            name: "SR-92",
            status: liftReport.road_92_condition,
        },
        {
            name: "Highway 189",
            status: liftReport.road_189_condition,
        },
        {
            name: "Parking",
            status: liftReport.parking_condition,
        },
    ];
    const forecasts = snowReport.forecast.daily;
    const { pageCMS } = await getAllData("/mountain-report");

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
