console.log('wedding-rfp-defer.js')
function toggleDiv(obj, title){
   if(obj && obj.id){
       console.log(title);
       console.log(obj.value, obj)
       console.log(Boolean(obj.value));
   }
}
toggleDiv();
// const childElements = document.querySelectorAll('.has-child');

// console.log(childElements);
// childElements.forEach(function(element) {
//     console.log(element.dataset.child);
// })