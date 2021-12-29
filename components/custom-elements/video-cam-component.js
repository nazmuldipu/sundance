import ProgressiveElement from "../progressive-element.js";
export default class VideoCam extends ProgressiveElement{
    constructor() {
        super([]);
        this.loading = false;
        this.observer = null;
        let elId = 'ic_action_video_container';
        let width = window.innerWidth;
        if(width > 767 && width < 1366){
            elId = 'ic_action_tab-video_container';
        }
        this.liveContainer = document.getElementById(elId);
        this.isLoaded = false;
    }

    connectedCallback(){
        window.addEventListener('video-loaded', (event)=> {
            if(window.video){
                const video = event.detail;
                let h3Node = document.createElement("h3");
                var textnode = document.createTextNode("Right Now");
                h3Node.appendChild(textnode);
                this.appendChild(h3Node);
                this.appendChild(video);
                this.observeChange();
            }
        })
    }

    toggleLoading(state){
        this.loading = Boolean(state);
        Boolean(state) ? this.liveContainer.classList.add('loading') : this.liveContainer.classList.remove('loading');
    }

    observeChange(){
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationsList, observer) => {
            for(const mutation of mutationsList) {
                if (mutation.type === 'attributes' && window.video) {
                       if(mutation.target.classList.contains('luma-preview') || mutation.target.classList.contains('luma-gallery-grid')){
                              if(mutation.target.offsetHeight > 180){
                                  this.toggleLoading(false);
                                  this.isLoaded = true;
                              }else{
                                  this.toggleLoading(true);
                                  this.isLoaded = false;
                              }
                       }
                }
            }
        };
        this.observer = new MutationObserver(callback);
        this.observer.observe(window.video, config);
    }

    disconnectedCallback(){
        this.observer && this.observer.disconnect();
    }
  
}

customElements.define("video-cam", VideoCam);