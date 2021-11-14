// hero-carousel
const heroCarousel = document.querySelectorAll(".hero-carousel__frame");
heroCarousel.forEach(function (slide_frame) {
    slide_frame.addEventListener("click", function (frame) {
        if (!frame.target.classList.contains("active")) {
            const parent_ele = frame.target.parentElement;
            const active_elements = parent_ele.querySelectorAll(".active");
            active_elements.forEach(function (active_element) {
                active_element.classList.remove("active");
                frame.target.classList.add("active");
            });
        }
    });
});
// thumbnail slider events
const slide_frame = document.getElementById("thumbnail-slider__image__frame");
const add_image_click_event = () => {
    const slider_images = document.querySelectorAll(
        ".thumbnail-slider__slides__box .image_frame"
    );
    slider_images.forEach(function (slide) {
        slide.addEventListener("click", function () {
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
