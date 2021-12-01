import 'components/FormSender/index.js';

// hero-carousel
const hero_image_frames = document.querySelectorAll(".hero-carousel__frame .image_frame");
hero_image_frames.forEach(function (slide_frame) {
    slide_frame.addEventListener("click", function (frame) {
        const parent_ele = frame.target.parentElement.parentElement;
        if(!parent_ele.classList.contains("active")){
            const active_elements = parent_ele.parentElement.querySelectorAll(".active");
            active_elements.forEach(function (active_element) {
                active_element.classList.remove("active");
                parent_ele.classList.add("active");
            });
        }
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