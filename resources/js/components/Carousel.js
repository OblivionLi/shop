import React from "react";
import Slider from "react-slick";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="carousel">
            <Slider {...settings}>
                <div>
                    <img className="carousel__img" src={`https://via.placeholder.com/900x300`}/>
                </div>
                <div>
                    <img className="carousel__img" src={`https://via.placeholder.com/900x300`} />
                </div>
                <div>
                    <img className="carousel__img" src={`https://via.placeholder.com/900x300`} />
                </div>
                <div>
                    <img className="carousel__img" src={`https://via.placeholder.com/900x300`} />
                </div>
                <div>
                    <img className="carousel__img" src={`https://via.placeholder.com/900x300`} />
                </div>
                <div>
                    <img className="carousel__img" src={`https://via.placeholder.com/900x300`} />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
