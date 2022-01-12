"use strict";

export default class FilterComponent extends HTMLElement {

    constructor() {
        super();
        this._data = null;
        this._contents = document.createElement('div');
        this._currentChild = null;
        this._filters = null;
        this._selectedFilters = [];
    }

    connectedCallback() {
        if(this.dataset && this.dataset.filter){
            this._data = JSON.parse(this.dataset.filter);
            const template = document.createElement('template');
            template.innerHTML = this.getTemplate(this._data);
            this._currentChild = template.content.cloneNode(true);
            this._contents.appendChild(this._currentChild);
            this.render();
            this.initEvents();
        }
    }

    get data(){
        return this._data;
    }

    async render(){
        this.appendChild(this._contents); 
    }

    initEvents(){
        this.addEventListener('click', (e) => {
            if(e.target.type === 'checkbox' && e.target.name !== 'filter'){
                const value = [e.target.value];
                const type = e.target.name ? e.target.name.split('-') : '';
                const id = e.target.id;
                const checked = e.target.checked;
                const isFilterSelected = this._selectedFilters.find(filter => filter.id === id);
                if(checked && !isFilterSelected){
                    this._selectedFilters.push({
                        id: id,
                        type: type[0],
                        value: value
                    })
                }else{
                    this._selectedFilters.splice(this._selectedFilters.findIndex(filter => filter.id === id), 1);
                }
                this.dispatchEvent(new CustomEvent('filter-change', {
                    detail: {
                        filters: this._selectedFilters
                    }
                }));

            }
        })
    }
    /**
     * 
     * @param {object} data 
     */
    setFilters(data){
        const { filters, selectedFilters } = data;
        if(this._selectedFilters.length === 0){
            this._selectedFilters = selectedFilters;
        }
        this._filters = JSON.parse(JSON.stringify(filters));
        setTimeout(() => {
            const template = document.createElement('template');
            template.innerHTML = this.getTemplate(this._filters, this._selectedFilters);
            const filterContainer = template.content.querySelector('.filter__container');
            const entries = template.content.querySelector('#entries');
            const filterBtn = template.content.querySelector('#filter_btn');
            this.querySelector('.filter__container').replaceWith(filterContainer);
            this.querySelector('#entries').replaceWith(entries);
            this.querySelector('#filter_btn').replaceWith(filterBtn);
        }, 100)

    }

    parseTitle(title){
        if(title === 'types'){
            return 'Lodging Type'
        }
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    isChecked(item){
        if(!item || !this._selectedFilters) return false;
        return this._selectedFilters.find(flt => flt.id == item.id) ? true : false;
    }

    isFilterSelected(selectedFilters){
        return selectedFilters.length > 0 ? 'checked' : '';
    }

    getTemplate(data, selectedFilters=[]){
        return ` <section id="filter" class="filter">
        <input type="checkbox" id="filter_btn" ${this.isFilterSelected(selectedFilters)} class="filter__toggle toggle" name="filter" >
        <header class="filter__header align-items-center">
            <div id="entries" class="sm:order-2">${data.entries} Entries</div>
            <h2 class="heading--2 font-calibre font-medium sm:order-1 sm:pb-4 sm:w-full sm:text-center">Find a  place to stay</h2>
            <div class="sm:order-3" >
                <label for="filter_btn" class="filter__toggle__label font-calibre font-medium">
                    <div class="icon-css icon--filter">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="filter-margin">Filter</div>
                </label>
            </div>
        </header>
        <section class="filter__container-toggle">
            <section class="filter__container">
                ${data.filters.map(flt => (
                `<article>
                    <h3 class="heading--3 font-calibre font-medium pb-2">${this.parseTitle(flt.title)}</h3>
                        ${flt.items.map(item => (
                          `<div class="filter__item ${item.disabled ? 'disabled': ''}">                            
                            <label class="checkboxes-btn font-ivar">
                                <input type="checkbox" ${item.disabled ? 'disabled': ''} class="checkboxes-btn__input" ${this.isChecked(item) ? 'checked': ''} id="${item.id}" name="${item.name}" value="${item.copy}">
                                <span class="checkboxes-btn__control"></span>
                                    <span class="checkboxes-btn__label">
                                        ${item.copy} (${item.quantity})
                                    </span>
                            </label>
                          </div>
                          `  
                        )).join('')}
                    </article>`
                )).join('')}
            </section>
        </section>
    </section>`
    }
}

customElements.define('filter-component', FilterComponent);