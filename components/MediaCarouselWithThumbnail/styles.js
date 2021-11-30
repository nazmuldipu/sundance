export default `
.swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide {
    background-size: cover;
    background-position: center;
}

.swiper-slide img, .swiper-slide picture {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-container {
    height: 100%;
    width: 100%;
}

.thumbnail-swiper-container {
    height: 220px;
    width: 100%;
    box-sizing: border-box;
}

.thumbnail-swiper-container .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.thumbnail-swiper-container .swiper-slide-thumb-active {
    opacity: 1;
}

`