'use strict';

import ProgressiveElement from './progressive-element.js';

export default class RandomListAdder extends ProgressiveElement {
    constructor() {
        super(
            [
                {
                    id: '1',
                    behaviorPath: '../scripts/testModule1.js',
                    type: 'IntersectionObserver',
                    observerConfig: {
                        threshold: 0.75
                    }
                },
                {
                    id: '2',
                    behaviorPath: '../scripts/testModule2.js',
                    stylePath: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide-core.min.css',
                    type: 'IntersectionObserver',
                    observerConfig: {
                        threshold: 0.1,
                        rootMargin: '200px'
                    }
                }
            ]
        );

    }

    _onLoad(moduleId, entries, observer) {
        // we only expect a single entry - but iterate anyway
        if(entries.some(entry => entry.isIntersecting)) {
            console.log('isIntersecting')
            super._onLoad(moduleId).then(importee => {
                console.log('resolve onload', performance.now())
                console.log('importee', importee)
                console.log('entries', entries)
                console.log('observer', observer)
            })
        }
    }
}