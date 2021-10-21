const dropdownBox = document.querySelector(".dropdown--box");
const { classList } = document.querySelector(".dropdown--options");
const optionsList = document.querySelectorAll(".dropdown--option");
const selected = document.querySelector(".dropdown__selectable-item");
const dropdownIcon = document.getElementById("dropdown--icon");
const dropdownText = document.getElementById("dropdown--text");
selected.addEventListener("click", () => {
  classList.toggle("active");
  if (!dropdownBox.style.zIndex || dropdownBox.style.zIndex == 0) {
    dropdownBox.style.zIndex = 4;
  } else {
    dropdownBox.style.zIndex = 0;
  }
});
selected.addEventListener("blur", () => {
  classList.remove("active");
  dropdownBox.style.zIndex = 0;
});
optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    dropdownText.innerHTML = o.querySelector("label").innerHTML;
    selected.innerHTML = dropdownText.outerHTML + dropdownIcon.outerHTML;
    classList.remove("active");
  });
});