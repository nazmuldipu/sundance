'use strict';

export default class ProgressiveElement extends HTMLElement {
    static loadCSS(cssPath) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.onload = function() { 
                resolve(link);
                console.log('style has loaded'); 
            };
            link.href = cssPath;
        
            const headTag = document.getElementsByTagName('head')[0];
            headTag.insertAdjacentElement('beforeend', link);
          }); 
    } 

    constructor(modules) {
        console.log('progressive le constructor', performance.now())
        super();
        // load each module.path on module.trigger (some sort of Listener interface)
        this._moduleMap = new Map();
        for (const mod of modules) {
            this._registerModule(mod);
        }
    }

    connectedCallback() {
        for(const mod of this._moduleMap.values()) {
            mod.observer.observe(this);
        }
    }

    _registerModule(mod) {
        mod.observer = new ModuleLoadObserver(mod.type, mod.observerConfig, this._onLoad.bind(this, mod.id));
        this._moduleMap.set(mod.id, mod);
    }

    /**
     * TODO -- with subclasses, will want to extend (super.onLoad -- to get module reference) and override this
     * TODO -- will also want to handle dynamic style loading as well
     * @param {} moduleId 
     */
    async _onLoad(moduleId) {
        const mod = this._moduleMap.get(moduleId)
        if(mod) {
            mod.observer.destroy();
            const results = [];
            if (mod.stylePath) {
                const cssres = await ProgressiveElement.loadCSS(mod.stylePath);
                results.push(cssres);
            }
            if (mod.behaviorPath) {
                const jsRes = await import(mod.behaviorPath)
                results.push(jsRes);
            }
            return results
        }
        return this
    }
}

class ModuleLoadObserver {

    constructor(observerType, observerConfig, callback) {
        this.type = observerType;
        switch(observerType) {
            // TODO -- this is probably best represented as an enumerable type
            case 'IntersectionObserver':
                this._observer = new IntersectionObserver(callback, observerConfig);
                break;
            default:
                break;
        }
    }

    unobserve(elem) {
        switch(this.type) {
            case 'IntersectionObserver':
                this._observer.unobserve(elem);
                break;
            default:
                break;
        }
    }

    observe(elem) {
        switch(this.type) {
            case 'IntersectionObserver':
                this._observer.observe(elem);
                break;
            default:
                break;
        }
    }

    destroy() {
        switch(this.type) {
            case 'IntersectionObserver':
                this._observer.disconnect();
                break;
            default:
                break;
        } 
    }
}