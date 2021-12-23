import ProgressiveElement from "../progressive-element.js";

export default class VideoCam extends ProgressiveElement{
    constructor() {
        super([]);
    }

    connectedCallback(){
        const el = this.querySelector('#feed-container');
/*         window.addEventListener('video-loaded', ()=> {
            el.appendChild(window.video);
        }) */
        setTimeout(() => {
            if(window.video){
                el.appendChild(window.video);
            }
        }, 3000)
    }
  
}

customElements.define("video-cam", VideoCam);