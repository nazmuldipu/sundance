import '../../../scripts/lib/globalEvents.js';




window.addEventListener('DOMContentLoaded', (event) => {
    let test= document.querySelector('media-carousel');
    test.addEventListener('slideChanged',function (e) {
        console.log(e);
    })
});

// Array.from(test).forEach(function(element) {
//     console.log(element[0])
// });
// const mySwiper = new Swiper('.swiper-container', {
//     on : {
//         slideChange: function (e) {
//             console.log(e);
//          }
//         }
//   });
  