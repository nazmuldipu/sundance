const temp_id = window.location.search.split("=")[1];

const renderPageBreadcrumb = (event) => {
    const breadcrumb = document.querySelector("#breadcum-event");
    breadcrumb.innerHTML = event.title;
    breadcrumb.href = "/events/events-details/?id=" + event._id;
};
const renderPageTitleAndDescription = (event) => {
    const pageTitle = document.querySelector("#event-title");
    pageTitle.innerHTML = event.title;
    const pageDescription = document.querySelector("#event-description");
    pageDescription.innerHTML = event.description;
};
const renderEventImage = (event) => {
    if (event?.image?.global_image?.src.length > 0) {
        const imgContainer = document.querySelector("#event-image-container");
        const imgEl = document.querySelector("#event-image");
        imgEl.src = imgEl.src + event.image.global_image.src;
        imgContainer.classList.remove("hidden");
    }
};
const renderActions = (event) => {
    if(event?.actions?.length > 0){
        const actionContainer = document.querySelector("#event-actions");
        let actionHtml = '';
        event.actions.forEach((el)=>{
            actionHtml += `<a href="${el.action.url}" class="button button--${el.action.type} font-calibre group-venues__links" target="_blank">${el.action.copy}</a>`;
        });
        actionContainer.innerHTML = actionHtml;
    }
};

function initEvents(event) {
    renderPageBreadcrumb(event);
    renderPageTitleAndDescription(event);
    renderEventImage(event);
    renderActions(event);
}

document.addEventListener("DOMContentLoaded", function () {
    const eventsDom = document.querySelector("#events-holder");
    if (eventsDom) {
        const { events } = JSON.parse(eventsDom.dataset.events);
        if (events && events.length > 0) {
            const event = events.find((event) => event._id === temp_id);
            if (event) {
                initEvents(event);
            }
            eventsDom.dataset.events = "";
        }
    }
});
