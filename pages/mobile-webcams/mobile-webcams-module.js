/* ignore */
import '../../scripts/lib/globalEvents.js';

function resizeWindow() {
  var evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);
}

document.addEventListener('DOMContentLoaded', () => {  
  const feedContainer = document.querySelector('#feed-container');
  window.addEventListener('video-loaded', (event)=> {    
    if(window.video && feedContainer){        
      feedContainer.appendChild(event.detail.cloneNode(true));
      resizeWindow();
    }  
  })
});

