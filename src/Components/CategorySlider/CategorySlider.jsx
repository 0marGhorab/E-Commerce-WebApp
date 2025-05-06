import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  let [categories, setCategories] = useState([]);

  let getCategories = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        console.log(data.data);

        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="text-gray-700 text-xl font-bold p-2">
        Popular Categories
      </h2>
      <div className="lg:w-6/12 mx-auto w-11/12">
        <Slider {...settings}>
          {categories.map((category) => (
            <>
              <div className="p-2">
                <img
                  className="w-full h-48 rounded-lg"
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="font-normal text-lg text-gray-700">
                  {category.name}
                </h3>
              </div>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
}
