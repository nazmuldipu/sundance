class WeatherComponent extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: "open"})
    }

    connectedCallback(){
        this.render()
    }

    async render(){

        let git = await fetch('https://api.github.com/users/mostafa6765');
        let gitUser = await git.json();

        let git2 = await fetch('https://api.github.com/users/mostafa6765');
        let gitUser2 = await git2.json();
        console.log(gitUser2)

        this.shadow.innerHTML = `
        <link rel="stylesheet" type="text/css" href="index/index-sync.css">
        <h1>${gitUser.login} ${gitUser2.login}</h1>
        <article class="card-widget__weather flex flex-col">
        <div class="card-widget__weather__temp grid grid-cols-2 text-center border-b-1 border--color__sn_ss-3">
            <div>
                <header class="card-widget__weather__title-2 font-calibre font-normal"> Currently </header>
                <div class="card-widget__weather__title-1 font-calibre font-semibold justify-center ">67&#176;</div>
                <img class="card-widget__weather__icon" src="https://opensnow.com/img/weather/day/bkn.png"/>
                <div class="font-calibre card-widget__weather__icon__text">5mph</div>
            </div>
            <div>
                <header class="card-widget__weather__title-2 font-calibre font-normal"> Snow </header>
                <div class="card-widget__weather__title-1 font-calibre font-semibold justify-center ">36”</div>
                <div class="font-calibre card-widget__weather__snow__text grid grid-flow-col gap-x-4 justify-center">
                    <div class="flex flex-col">
                        <strong>12”</strong>
                        <span>24 hr</span></div>
                    <div class="flex flex-col">
                        <strong>24”</strong>
                        <span>48 hr</span></div>
                    <div class="flex flex-col">
                        <strong>128”</strong>
                        <span>YTD</span></div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-5 gap-x-6 py-10 border-b-1 border--color__sn_ss-3">
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre">
                <span class="text-2xl">Mon.</span>
                <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                <span>0”</span>
                <span>H 67°</span>
                <span>L 42°</span>
            </div>
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre">
                <span class="text-2xl">Tue.</span>
                <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                <span>0”</span>
                <span>H 67°</span>
                <span>L 42°</span>
            </div>
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre">
                <span class="text-2xl">Wed.</span>
                <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                <span>0”</span>
                <span>H 67°</span>
                <span>L 42°</span>
            </div>
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre">
                <span class="text-2xl">Thu.</span>
                <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                <span>0”</span>
                <span>H 67°</span>
                <span>L 42°</span>
            </div>
            <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre">
                <span class="text-2xl">Fri.</span>
                <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                <span>0”</span>
                <span>H 67°</span>
                <span>L 42°</span>
            </div>
        </div>
        <div>
            <details class="border-b-1 border--color__sn_ss-3 font-calibre">
                <summary class="card-widget__weather-summary">Roads + Parking</summary>
                <div class="toggle__content font-calibre">
                    <div class="toggle__content__line">
                        <span class="toggle__content__icon bg-sp-1">✓</span> SR-92: <span class="text--color__sp-1"> Open </span>
                    </div>
                    <div class="toggle__content__line">
                        <span class="toggle__content__icon bg-ssm-1">⨯</span> Highway 189: <span class="text--color__ssm-1"> Closed </span>
                    </div>
                    <div class="toggle__content__line">
                        <span class="toggle__content__icon bg-sp-3">!</span> Parking: <span class="text--color__sp-3"> Limited </span></div>
                </div>
            </details>
            <details class="border-b-1 border--color__sn_ss-3">
                <summary class="card-widget__weather-summary font-calibre">Lift Status</summary>
                <div class="toggle__content font-calibre">
                    <div class="toggle__content__line">
                        <span class="toggle__content__icon bg-sp-1">✓</span> Rays: <span class="text--color__sp-1"> Open </span>
                    </div>
                    <div class="toggle__content__line">
                        <span class="toggle__content__icon bg-ssm-1">⨯</span> Stairway: <span class="text--color__ssm-1"> Closed </span>
                    </div>
                    <div class="toggle__content__line">
                        <span class="toggle__content__icon bg-sp-3">!</span> Reds: <span class="text--color__sp-3"> Delayed </span></div>
                </div>
            </details>
            <details>
                <summary class="card-widget__weather-summary font-calibre">Detailed Snow Report</summary>
                <div class="toggle__content grid grid-cols-5 gap-x-4">
                    <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre text-lg">
                        <span class="text-2xl">Mon.</span>
                        <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                        <span>D 0”</span>
                        <span>N 0”</span>
                        <span>W 5mp</span>
                    </div>
                    <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre text-lg">
                        <span class="text-2xl">Tue.</span>
                        <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                        <span>D 0”</span>
                        <span>N 67°</span>
                        <span>W 5mp</span>
                    </div>
                    <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre text-lg">
                        <span class="text-2xl">Wed.</span>
                        <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                        <span>D 0”</span>
                        <span>N 67°</span>
                        <span>W 5mp</span>
                    </div>
                    <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre text-lg">
                        <span class="text-2xl">Thu.</span>
                        <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                        <span>D 0”</span>
                        <span>N 67°</span>
                        <span>W 5mp</span>
                    </div>
                    <div class="card-widget__weather__forcast grid grid-flow-row justify-items-center font-calibre text-lg">
                        <span class="text-2xl">Fri.</span>
                        <img class="card-widget__weather__icon2 pb-1" src="https://opensnow.com/img/weather/day/skc.png"/>
                        <span>0”</span>
                        <span>N 67°</span>
                        <span>W 5mp</span>
                    </div>
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