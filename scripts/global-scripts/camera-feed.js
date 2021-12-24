function resizeWindow(){
    var evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt); 
}
window.addEventListener('DOMContentLoaded', (event) => {
    const videoContainer = document.querySelector('.video-block');

    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList' && !window.video) {
                const video = videoContainer.querySelector('.video-container');
                window.video = video;
                videoContainer.style.display = 'none';
                const event = new CustomEvent('video-loaded', { detail: video });
                window.dispatchEvent(event);    
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(videoContainer, config);
    const videoToggle = document.querySelector('#action_icon-video');
    const liveContainer = document.getElementById('ic_action_video_container');
    videoToggle && videoToggle.addEventListener('change', (e)=> {
        if(liveContainer.offsetParent && e.target.checked){
            setTimeout(() => {
                liveContainer.classList.add('loading');
                resizeWindow();
                setTimeout(() => {
                    liveContainer.classList.remove('loading');
                }, 300)
            }, 1000);
        }
    })
});