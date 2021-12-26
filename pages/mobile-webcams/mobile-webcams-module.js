/* ignore */
function resizeWindow() {
  var evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);
}
document.addEventListener('DOMContentLoaded', (event) => {
  const feedContainer = document.querySelector('#feed-container');
  window.addEventListener('video-loaded', ()=> {
    if(window.video && feedContainer){
        feedContainer.appendChild(window.video);
        resizeWindow();
    }
  })
});