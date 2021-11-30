import { fetchApi } from '../../scripts/utils/http-client'

class WeatherComponent extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: "open"})
    }

    /**
     * Connect web component.
     */
    connectedCallback(){
        this.render()
    }

    /**
     * Date to day convert.
     * 
     * @param {string} dateStr - forecast date 
     * @returns {string}
     */
    getDayName(dateStr)
    {
        let date = new Date(dateStr)
        let day = date.toLocaleString('en-us', {weekday: 'short'})   
        return day     
    }

    /**
     * Hotel site api's base uri.
     * 
     * @returns {string}
     */
    getBaseUri(){
        let apiType = document.querySelector('meta[name="api_type"]').content
        if (apiType === 'PROD') {
            return 'https://hotel-site.skipperhospitality.com'
        } else if (apiType === 'STAGE'){
            return 'https://hotel-site-dev.skipperhospitality.com'
        } else {
            return 'https://hotel-site-dev.skipperhospitality.com'
        }
    }

    /**
     * Get all css - (shadow dom purpose).
     * 
     * @returns {string}
     */
    getAllCss(){
        const allCSS = [...document.styleSheets]
        .map(styleSheet => {
            try {
            return [...styleSheet.cssRules]
                .map(rule => rule.cssText)
                .join('');
            } catch (e) {
            console.log('Access to stylesheet %s is denied. Ignoring...', styleSheet.href);
            }
        })
        .filter(Boolean)
        .join('\n');
        return allCSS
    }

    /**
     * Render DOM
     * 
     * @returns {void}
     */
    async render(){
        let getSnowReport = await fetchApi(this.getBaseUri()+'/sundance/snow-report');
        let snowReportJson = await getSnowReport.json();
        let snowReport = snowReportJson[0]

        document.getElementById('navbar_icon_temp').innerHTML = snowReport?.current?.temp?.slice(0,-1) ?? '0'
        document.getElementById('navbar_icon_temp-tab').innerHTML = snowReport?.current?.temp?.slice(0,-1) ?? '0'
    
        let forecasts = snowReport.forecast.daily
        let weather = ``
        let detailSnowReport = ``
        forecasts.forEach(forecast => {
            forecast.dayname = this.getDayName(forecast.date)
            weather += `
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre">
                <span class="text-2xl">${forecast?.dayname}</span>
                <img class="card-widget__weather__icon2 pb-1" src="${forecast?.day?.icon ?? forecast?.night?.icon}"/>
                <span>${forecast?.day?.snow ?? '0"'}</span>
                <span>H ${forecast?.day?.temp?.slice(0,-1) ?? ""}</span>
                <span>L ${forecast?.night?.temp?.slice(0,-1) ?? ""}</span>
            </div>
            `

            detailSnowReport += `
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre text-lg">
                <span class="text-2xl">${forecast?.dayname}</span>
                <img class="card-widget__weather__icon2 pb-1" src="${forecast?.day?.icon}"/>
                <span>D ${forecast?.day?.snow}</span>
                <span>N ${forecast?.night?.snow}</span>
                <span>W ${forecast?.day?.wind?.speed}</span>
            </div>
            `
        });

        let getLiftReport = await fetchApi(this.getBaseUri()+'/sundance/lift-report');
        let getLiftReportJson = await getLiftReport.json();
        let liftReport = getLiftReportJson[0]
        let roadsParking = [
            {name: 'SR-92', status: liftReport.road_92_condition},
            {name: 'Highway 189', status: liftReport.road_189_condition},
            {name: 'Parking', status: liftReport.parking_condition}
        ]
        let roadsParkingReport = ``
        roadsParking.forEach(rp => {
            if (rp.status === 'open') {
                roadsParkingReport += `
                <div class="toggle__content__line">
                    <span class="toggle__content__icon bg-sp-1">✓</span> ${rp.name}: <span class="text--color__sp-1"> ${rp.status} </span>
                </div>
                `
            } else if (rp.status === 'closed') {
                roadsParkingReport += `
                <div class="toggle__content__line">
                    <span class="toggle__content__icon bg-ssm-1">⨯</span> ${rp.name}: <span class="text--color__ssm-1"> ${rp.status} </span>
                </div>
                `
            } else {
                roadsParkingReport += `
                <div class="toggle__content__line">
                    <span class="toggle__content__icon bg-sp-3">!</span> ${rp.name}: <span class="text--color__sp-3"> ${rp.status} </span></div>
                </div>
                `
            }
        });


        let theLiftStatus = [
            {name: 'Rays', status: liftReport.lift_ray_condition},
            {name: 'Stairway', status: liftReport.lift_stairway_condition},
            {name: 'Reds', status: liftReport.lift_red_condition}
        ]

        let theLiftStatusReport = ``
        theLiftStatus.forEach(rp => {
            if (rp.status === 'open') {
                theLiftStatusReport += `
                <div class="toggle__content__line">
                    <span class="toggle__content__icon bg-sp-1">✓</span> ${rp.name}: <span class="text--color__sp-1"> ${rp.status} </span>
                </div>
                `
            } else if (rp.status === 'closed') {
                theLiftStatusReport += `
                <div class="toggle__content__line">
                    <span class="toggle__content__icon bg-ssm-1">⨯</span> ${rp.name}: <span class="text--color__ssm-1"> ${rp.status} </span>
                </div>
                `
            } else {
                theLiftStatusReport += `
                <div class="toggle__content__line">
                    <span class="toggle__content__icon bg-sp-3">!</span> ${rp.name}: <span class="text--color__sp-3"> ${rp.status} </span></div>
                </div>
                `
            }
        });

        // set html inside shadow dom
        this.shadow.innerHTML = `
        <style>${this.getAllCss()}</style>
        <article class="card-widget__weather flex flex-col">
        <div class="card-widget__weather__temp grid grid-cols-2 text-center border-b-1 border--color__sn_ss-3">
            <div>
                <header class="card-widget__weather__title-2 font-calibre font-normal"> Currently </header>
                <div class="card-widget__weather__title-1 font-calibre font-semibold justify-center ">${snowReport?.current?.temp?.slice(0,-1) ?? ''}</div>
                <img class="card-widget__weather__icon" src="https://opensnow.com/img/weather/day/bkn.png"/>
                <div class="font-calibre card-widget__weather__icon__text">${snowReport?.current?.wind?.speed ?? ''}</div>
            </div>
            <div>
                <header class="card-widget__weather__title-2 font-calibre font-normal"> Snow </header>
                <div class="card-widget__weather__title-1 font-calibre font-semibold justify-center ">${liftReport["base"]}”</div>
                <div class="font-calibre card-widget__weather__snow__text grid grid-flow-col gap-x-4 justify-center">
                    <div class="flex flex-col">
                        <strong>${liftReport["24_hour"]}”</strong>
                        <span>24 hr</span></div>
                    <div class="flex flex-col">
                        <strong>${liftReport["48_hour"]}”</strong>
                        <span>48 hr</span></div>
                    <div class="flex flex-col">
                        <strong>${liftReport["ytd"]}”</strong>
                        <span>YTD</span></div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-5 gap-x-6 py-10 border-b-1 border--color__sn_ss-3">
            ${weather}
        </div>
        <div>
            <details class="border-b-1 border--color__sn_ss-3 font-calibre">
                <summary class="card-widget__weather-summary">Roads + Parking</summary>
                <div class="toggle__content font-calibre">
                    ${roadsParkingReport}
                </div>
            </details>
            <details class="border-b-1 border--color__sn_ss-3">
                <summary class="card-widget__weather-summary font-calibre">Lift Status</summary>
                <div class="toggle__content font-calibre">
                    ${theLiftStatusReport}
                </div>
            </details>
            <details>
                <summary class="card-widget__weather-summary font-calibre">Detailed Snow Report</summary>
                <div class="toggle__content grid grid-cols-5 gap-x-4">
                    ${detailSnowReport}
                </div>
                <div class="font-calibre text-lg text--color__sp-1 grid grid-flow-col">
                    <span>D = Day</span>
                    <span>N = Night</span> 
                    <span>W = Wind Speed</span> 
                </div>
            </details>
        </div>
        <div class="text-lg font-calibre text--color__ss-3 pt-12">
        Powered by: &nbsp; <a href="https://opensnow.com" target="_blank"><img src="/images/OpenSnowLogo.png" width="122" height="19"/></a>
        </div>
    </article>
        `
    }
}

customElements.define('weather-component', WeatherComponent)