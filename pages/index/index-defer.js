import {foo} from '../../scripts/sample';
import {onclickDropdown, onblurDropdown} from '../../scripts/dropdown';
import '../../components/random-adder.js';


window.poop = function(stuff) {
    console.log('STUFF', stuff);
}

document.addEventListener("DOMContentLoaded", function(){
    window.handleClick = function(id){
        onclickDropdown(id)
    }
    window.handleBlur = function(){
        onblurDropdown()
    }
});

// thumbnail slider events
const slide_frame = document.getElementById('thumbnail-slider__image__frame');
const add_image_click_event = () =>{
    const slider_images = document.querySelectorAll('.thumbnail-slider__slides__box .image_frame');
    slider_images.forEach(function(slide){
        slide.addEventListener('click', function(){
            slide_frame.firstElementChild.innerHTML = slide.innerHTML;
        })
    });
}

const carousel_buttons = document.querySelectorAll('.carousel-button');
carousel_buttons.forEach(function(button){
    button.addEventListener('click', function(){
        add_image_click_event();
    })
});

add_image_click_event();
