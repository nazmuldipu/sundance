export default class Utils{
    /**
     * Get all css - (shadow dom purpose).
     * 
     * @returns {string}
     */
    static getAllCss(){
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
     * Hotel site api's base uri.
     * 
     * @returns {string}
     */
    static getBaseUri(){
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
     * Date to day convert.
     * @see {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#DENVER}
     * @see {@link https://www.travelmath.com/time-change/from/Utah/to/Denver,+CO}
     * @param {string} dateStr - forecast date 
     * @returns {string}
     */
    static getDayName(dateStr)
    {
        let date = new Date(dateStr)
        date.setDate(date.getDate() + 1)
        let day = date.toLocaleString('en-us', {weekday: 'short',timeZone: 'America/Denver'})   
        return day
    }
}
