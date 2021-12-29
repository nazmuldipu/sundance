function resizeWindow(){
    var evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt); 
}
window.addEventListener('DOMContentLoaded', (event) => {
    const videoContainer = document.querySelector('.video-block');
    if(videoContainer){
        let elId = 'ic_action_video_container';
        let width = screen.width;
        if(width > 767 && width < 1366){
            elId = 'ic_action_tab-video_container';
        }
        const el = document.getElementById(elId);
        const videoCam = el.querySelector('video-cam');
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                if (mutation.type === 'childList' && !window.video && videoContainer) {
                    const video = videoContainer.querySelector('.video-container');
                    window.video = video;
                    videoContainer.style.display = 'none';
                    /* dispatch a new event on video load */
                    const event = new CustomEvent('video-loaded', { detail: video });
                    window.dispatchEvent(event);    
                }
            }
        };
        const observer = new MutationObserver(callback);
        /* observe for dom changes */
        observer.observe(videoContainer, config);
        let videoElId = 'action_icon-video';
        if(width > 767 && width < 1366){
            videoElId = 'action_icon-tab-video';
        }
        const videoToggle = document.getElementById(videoElId);
        videoToggle && videoToggle.addEventListener('change', (e)=> {
            if(videoCam && videoCam.liveContainer.offsetParent && e.target.checked){
                videoCam.toggleLoading(true);
                if(videoCam.isLoaded){
                    videoCam.toggleLoading(false);
                }
                /* resize event is required to force re-render of video feed */
                setTimeout(() => {
                    resizeWindow();
                }, 1000);
            }
        })
    }
});