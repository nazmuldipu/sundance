console.log('atoms-defer.js')
import {onclickDropdown, onblurDropdown} from '../../scripts/dropdown';

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