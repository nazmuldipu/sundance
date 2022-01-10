console.log('wedding-rfp-defer.js')

const childElements = document.querySelectorAll('.has-child');

console.log(childElements);
childElements.forEach(function(element) {
    console.log(element.dataset.child);
})