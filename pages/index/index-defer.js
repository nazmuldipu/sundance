// hero-carousel
const items = document.querySelectorAll('.hero-flip__item');
items.forEach(item => {
    item.addEventListener('click', () => {
        console.log(item);
        items.forEach(el => {
            el
                .classList
                .remove('collapse');
        });
        item
            .classList
            .add('collapse');
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