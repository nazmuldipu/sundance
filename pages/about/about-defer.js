const accolades__tabs = document.querySelectorAll('.accolades__tab');
const accolades__containers = document.querySelectorAll('.accolades__container');

const remove_classname_arr = (className, arr)=>{
    arr.forEach(item =>{
        item.className = item.className.replace(" active", "");
    });
}
accolades__tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        remove_classname_arr('active', accolades__tabs);
        tab.className += " active";
        console.log(tab.id);
        remove_classname_arr('active', accolades__containers);
        const container = document.getElementById(tab.id + '-container');
        container.className += " active";
    });
});