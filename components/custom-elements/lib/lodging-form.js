'use strict';
// this.constructor[staticField] to get access to subclass static props
class LodgingForm extends HTMLElement {
    constructor() {
        super();
        // setup base booking engine url with input property and brand identifiers
        this.url = new URL(this.constructor.urlBase);
        if(this.dataset[this.constructor.identifierNames.property]) {
            this.url.searchParams.append(
                this.constructor.identifierNames.property,
                this.dataset[this.constructor.identifierNames.property]
            );
        }
        if(this.dataset[this.constructor.identifierNames.brand]) {
            this.url.searchParams.append(
                this.constructor.identifierNames.brand,
                this.dataset[this.constructor.identifierNames.brand]
            );
        }

        // set up CTA href
        this.ctaElem = this.getElementsByClassName(this.constructor.ctaName)?.[0];
        if(this.ctaElem) {
            this.ctaElem.href = this.url.href;
        }
        
        // attach input listeners for each inputField
        for(const prop in this.constructor.inputFields) {
            const fieldObject = this.constructor.inputFields[prop];
            const inputEl = this.getElementsByClassName(fieldObject.classIdentifier)?.[0];
            if(inputEl) {
                inputEl.addEventListener('change', (e) => {
                    if(e.target.value) {
                        this.url.searchParams.set(fieldObject.queryParam, e.target.value);
                    } else {
                        this.url.searchParams.delete(fieldObject.queryParam);
                    }
                    // reset CTA href
                    this.ctaElem.href = this.url.href;
                });
            }
        }
    }

    static urlBase = '';
    static identifierNames = {       
        property: 'property',
        brand: 'brand'
    };
    static ctaName = 'lodging-form__cta';
    static inputFields = {
        rooms: {
            queryParam: 'rooms',
            classIdentifier: 'lodging-form__input--rooms'
        },
        promoCode: {
            queryParam: 'promo',
            classIdentifier: 'lodging-form__input--promo'
        },
        checkIn: {
            queryParam: 'checkin',
            classIdentifier: 'lodging-form__input--checkin'
        },
        checkOut: {
            queryParam: 'checkout',
            classIdentifier: 'lodging-form__input--checkout'
        }
    };
};
export default LodgingForm;