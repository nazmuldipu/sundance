document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-target]');
    const targets = document.querySelectorAll('[data-identifier]');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const identifier = e.target.dataset.target;
            const targetEl = Array.from(targets).find(target => target.dataset.identifier === identifier);
            if(targetEl && typeof targetEl.open == 'function'){
                targetEl.open();
            }
        })
    })
})