import ProgressiveElement from "../progressive-element.js";
export default class VideoCam extends ProgressiveElement{
    constructor() {
        super([]);
    }

    connectedCallback(){
        const el = this.querySelector('#feed-container');
        window.addEventListener('video-loaded', ()=> {
            if(window.video){
                el.appendChild(window.video);
            }
        })
    }
  
}

customElements.define("video-cam", VideoCam);