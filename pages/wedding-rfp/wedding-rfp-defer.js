
const getObjId = (obj) => {
    if (obj && obj.id) {
        return obj.id + 'Number';
    }
    return null;
}
function toggleDiv(obj, title) {
    if (obj && obj.id) {
        const comId = getObjId(obj);
        if (obj.value.trim() === 'true') { //create input element
            const baseElement = obj.parentElement.parentElement.parentElement;
            const newElement = document.createElement('div');
            newElement.className = 'pr-4';
            newElement.innerHTML =
                `<div class="grid col-span-1">
                <h2 class="pt-4 pb-2 uppercase text-lg font-ivar">${title}*</h2>
                <div class="pr-4">
                    <input type="number" class="w-full wedding-rfp__input" name="${comId}" id="${comId}">
                </div>
           </div>`;
            baseElement.appendChild(newElement);
        } else { //delete input element
            let el = document.getElementById(comId);
            if (el) {
                const parentEl = el.parentElement.parentElement.parentElement;
                parentEl.remove();
            }
        }
    }
}
toggleDiv();