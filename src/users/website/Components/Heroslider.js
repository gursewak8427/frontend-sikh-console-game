import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sl_1 from "../images/sl_1.jpg";
import Sl_2 from "../images/sl_2.png";
import Sl_3 from "../images/sl_3.png";
import Sl_4 from "../images/sl_4.png";
import Sl_5 from "../images/sl_5.jpg";

export default function Heroslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider className="mt-14" {...settings}>
      <div className="inner-content">
        <img src={Sl_1} />
        <p className="text-center w-full text-2xl">Canada</p>
      </div>

      <div className="inner-content">
        <img src={Sl_2} />
        <p className="text-center w-full text-2xl">Germany</p>
      </div>

      <div className="inner-content">
        <img src={Sl_3} />
        <p className="text-center w-full text-2xl">Dubai</p>
      </div>
      <div className="inner-content">
        <img src={Sl_4} />
        <p className="text-center w-full text-2xl">Spain</p>
      </div>
      <div className="inner-content">
        <img src={Sl_5} />
        <p className="text-center w-full text-2xl">Russia</p>
      </div>

      <div className="inner-content">
        <img src={Sl_1} />
        <p className="text-center w-full text-2xl">Canada</p>
      </div>

      <div className="inner-content">
        <img src={Sl_2} />
        <p className="text-center w-full text-2xl">Germany</p>
      </div>

      <div className="inner-content">
        <img src={Sl_3} />
        <p className="text-center w-full text-2xl">Dubai</p>
      </div>
      <div className="inner-content">
        <img src={Sl_4} />
        <p className="text-center w-full text-2xl">Spain</p>
      </div>
      <div className="inner-content">
        <img src={Sl_5} />
        <p className="text-center w-full text-2xl">Russia</p>
      </div>
    </Slider>
  );
}
