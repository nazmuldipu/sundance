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

.mySwiper2 {
    height: 100%;
    width: 100%;
}

.mySwiper {
    height: 220px;
    width: 100%;
    box-sizing: border-box;
}

.mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
    opacity: 1;
}

`