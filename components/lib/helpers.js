'use strict';

import {
    CONTACT_URL
} from './constants.js';

const shouldRecordFormEl = el => {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        if (el.type === 'checkbox' || el.type === 'radio') {
            return el.checked;
        }
        // check for empty text
        return el.value !== "";
    }

    return false;
}

export const isValid = (form) => {
    return Array.from(form.elements).every(el => (el.required && el.value) || !el.required);
}

export const getBodyFromForm = form => {
    const elements = form.elements;
    return Array.from(elements).reduce((body, el) => {
        if (shouldRecordFormEl(el)) {
            if (body[el.name]) {
                //we assume that for multiply encountered names, we want to send all registered values
                if (Array.isArray(body[el.name])) {
                    body[el.name].push(el.value);
                } else {
                    body[el.name] = [body[el.name], el.value];
                }
            } else {
                body[el.name] = el.value;
            }
        }
        return body;
    }, {});
};

export async function sendContact(form, contactType) {
    let requestBody = getBodyFromForm(form);
    var reqHeaders = new Headers();
    reqHeaders.append("Authorization",  `Bearer ${SKIPPER_WEB_API_TOKEN}`);
    
    let body;    
    if (contactType.trim() === 'meetingrfp') {
        body = new FormData();
        body.append('data', JSON.stringify(requestBody));
        if(form.querySelector('input[type="file"]').files.length > 0) {
            body.append('file', form.querySelector('input[type="file"]').files[0]);
        }
    }
    else{
        reqHeaders.append("Content-Type",  "application/json");
        body = JSON.stringify(requestBody);
    }    
    const response = await fetch(`${CONTACT_URL}?request_type=${contactType}`, {
        method: 'POST',
        mode: 'cors',
        headers: reqHeaders,
        body
    });
    return response;
}