import '../../scripts/lib/globalEvents.js';
document.addEventListener('DOMContentLoaded', () => {
    if(window.location.href !== window.location.origin + '/error/'){
        window.location.href = window.location.origin + '/error/'
    }
})