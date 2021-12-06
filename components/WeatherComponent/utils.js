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
     * 
     * @param {string} dateStr - forecast date 
     * @returns {string}
     */
    static getDayName(dateStr)
    {
        let date = new Date(dateStr)
        let day = date.toLocaleString('en-us', {weekday: 'short'})   
        return day     
    }
}
