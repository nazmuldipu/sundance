'use strict';

import LodgingForm from "./lib/lodging-form.js";

class SynxisLodgingForm extends LodgingForm {
    constructor() {
        super();
    }

    static urlBase = 'https://be.synxis.com';
    static identifierNames = {   
        ...LodgingForm.identifierNames,    
        property: 'hotel',
        brand: 'chain'
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