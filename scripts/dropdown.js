let dropdownBox = null;
let dropdownOptions = null;
let optionsList = null;
let selected = null;
let dropdownIcon = null;
let dropdownText = null;
let bool = false;

const onclickDropdown = (id)=> {
    bool = true;
    dropdownBox = document.querySelector(`.dropdown--box__${id}`);
    dropdownBox.classList.toggle("active");
    dropdownOptions = document.querySelector(`.${id}--options`);
    optionsList = document.querySelectorAll(`.dropdown--option__${id}`);
    dropdownOptions.classList.toggle("active");
    dropdownIcon = document.querySelector(`.${id}__icon`);
    dropdownText = document.querySelector(`.${id}__text`);
    selected = document.querySelector(".item__" + id);
    
    if (dropdownBox.classList.contains("active")) {
      dropdownBox.style.zIndex = 4;
    } else {
      dropdownBox.style.zIndex = 0;
    }
}

const onblurDropdown = ()=> {
    if (bool) {
        dropdownOptions.classList.remove("active");
        dropdownBox.style.zIndex = 0;
    }
}

if(bool){
optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    dropdownText.innerHTML = o.querySelector("label").innerHTML;
    selected.innerHTML = dropdownText.outerHTML + dropdownIcon.outerHTML;
    dropdownOptions.classList.remove("active");
  });
});
}
export {onclickDropdown, onblurDropdown}
