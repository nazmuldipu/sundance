'use strict';

import LodgingForm from "./lib/lodging-form.js";

class SynxisLodgingForm extends LodgingForm {
    constructor() {
        super();
        console.log('SYNXIS LODGING FORM CONSTRUCTOR')
    }

    static urlBase = 'https://be.synxis.com';
    static queryParamNames = {
        rooms: 'Rooms',
        promoCode: 'Promo',
        checkIn: 'Arrive',
        checkOut: 'Depart',
        property: 'Hotel',
        brand: 'Chain'
    }
    static identifierNames = {   
        ...LodgingForm.identifierNames,    
        property: 'Hotel',
        brand: 'Chain'
    };
    static inputFields = {
        rooms: {
            ...LodgingForm.inputFields.rooms,
            queryParam: 'Rooms'
        },
        promoCode: {
            ...LodgingForm.inputFields.promoCode,
            queryParam: 'Promo'
        },
        checkIn: {
            ...LodgingForm.inputFields.checkIn,
            queryParam: 'Arrive'
        },
        checkOut: {
            ...LodgingForm.inputFields.checkOut,
            queryParam: 'Depart'
        }
    };
}

export default SynxisLodgingForm;