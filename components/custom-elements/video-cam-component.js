import ProgressiveElement from "../progressive-element.js";
export default class VideoCam extends ProgressiveElement{
    constructor() {
        super([]);
        this.loading = false;
        this.observer = null;
        this.liveContainer = document.getElementById('ic_action_video_container');
        this.isLoaded = false;
    }

    connectedCallback(){
        const el = this.querySelector('#feed-container');
        window.addEventListener('video-loaded', ()=> {
            if(window.video){
                el.appendChild(window.video);
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
                       if(mutation.target.classList.contains('luma-preview')){
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