import {foo} from '../../scripts/sample';
import {onclickDropdown, onblurDropdown} from '../../scripts/dropdown';
import '../../components/random-adder.js';


window.poop = function(stuff) {
    console.log('STUFF', stuff);
}

console.log('FOO bar ba taddas', foo);
document.addEventListener("DOMContentLoaded", function(){
    window.handleClick = function(id){
        onclickDropdown(id)
    }
    window.handleBlur = function(){
        onblurDropdown()
    }
});