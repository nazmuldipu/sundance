// hero-carousel
const hero_image_frames = document.querySelectorAll(".hero-carousel__frame .image_frame");
const hero_carousel__title = document.querySelectorAll(".hero-carousel__title");
const hero_carousel__texts = document.querySelectorAll(".hero-carousel__texts");
console.log(hero_carousel__texts);

const update_active_element = (element) => {
    if(!element.classList.contains("active")){
        const active_elements = element.parentElement.querySelectorAll(".active");
        active_elements.forEach(function (active_element) {
            active_element.classList.remove("active");
            element.classList.add("active");
        });
    }
}

hero_image_frames.forEach(function (slide_frame) {
    slide_frame.addEventListener("click", function (frame) {
        const parent_ele = frame.target.parentElement.parentElement;
        update_active_element(parent_ele);
    });
});

hero_carousel__texts.forEach(function (text) {
    text.addEventListener("click", function (text) {
        const parent_ele = text.target.parentElement;
        update_active_element(parent_ele);
    });
});

hero_carousel__title.forEach(function (title) {
    title.addEventListener("click", function () {
        const parent_ele = title.parentElement.parentElement;
        update_active_element(parent_ele);
    });
});

// thumbnail slider events
const add_image_click_event = () => {
    const slider_images = document.querySelectorAll(
        ".thumbnail-slider__slides__box .image_frame"
    );
    slider_images.forEach(function (slide) {
        slide.addEventListener("click", function () {
            const frame_id = slide.parentElement.dataset.framename;
            const slide_frame = document.getElementById(frame_id);
            slide_frame.firstElementChild.innerHTML = slide.innerHTML;
        });
    });
};

const carousel_buttons = document.querySelectorAll(".carousel-button");
carousel_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        add_image_click_event();
    });
});

add_image_click_event();