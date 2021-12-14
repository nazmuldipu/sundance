'use strict';
class LodgingForm extends HTMLElement {
    constructor() {
        super();
        console.log('LODGINGFORM CONSTRUCTOR')
    }
    connectedCallback() {
        console.log('LODGINGFORM CONNECTED CALLBACK')
    }

};
export default LodgingForm;