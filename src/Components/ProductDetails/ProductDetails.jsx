import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id } = useParams();
  let [productDetails, setProductDetails] = useState(null);
  let [relativeDetails, setRelativeDetails] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let getProductDetails = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let getRelative = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let all = data.data;

        let filtered = all.filter(
          (product) =>
            productDetails &&
            product.category.name === productDetails.category.name
        );

        setRelativeDetails(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      getRelative();
    }
  }, [productDetails]);

  return (
    <>
      <div className="row justify-around">
        <div className="left w-10/12 md:w-1/4 mb-10">
          <Slider {...settings}>
            {productDetails?.images.map((image, index) => (
              <div key={index} className="shadow-xl">
                <img
                  className="w-full"
                  src={image}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="right w-full lg:w-2/4 relative">
          <h4 className="text-gray-600 text-xl font-[600] mb-3">
            {productDetails?.category?.name}
          </h4>
          <h2 className="text-5xl font-bold mb-5">{productDetails?.title}</h2>
          <p className="text-gray-600 text-lg mb-10">
            {productDetails?.description}
          </p>
          <div className="flex flex-col justify-between items-between w-1/2 pb-2 text-xl">
            <span className="flex justify-baseline items-baseline">
              <h5 className="text-2xl font-[600] text-black me-5">Price :</h5>
              {productDetails?.price}
              <span className="font-medium text-gray-700 ms-1">EGP</span>
            </span>
            <span className="flex justify-baseline items-baseline">
              <h5 className="text-2xl font-[600] text-black me-5">Rating :</h5>
              {productDetails?.ratingsAverage}{" "}
              {productDetails?.ratingsAverage >= 2.5 ? (
                <i className="fa-solid fa-star text-yellow-500 ms-1"></i>
              ) : (
                <i className="fa-solid fa-star-half-stroke text-yellow-500 ms-1"></i>
              )}
            </span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 w-full text-white px-1 py-3 rounded-2xl">
            <i className="fa-solid fa-cart-plus text-lg me-1"></i> Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        <h2 className="text-5xl font-bold text-blue-900 mb-5">Related Items</h2>
        <div className="flex flex-wrap justify-center">
          {relativeDetails.length > 0 ? (
            relativeDetails.map((detail) => (
              <div key={detail.id} className="w-1/2 md:w-1/3 lg:w-1/5 p-2">
                <Link to={`/productDetails/${detail.id}`}>
                  <img
                    className="w-full shadow-xl"
                    src={detail.imageCover}
                    alt={detail.title}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
