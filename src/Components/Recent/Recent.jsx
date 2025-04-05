import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./Recent.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Recent() {
  const [recentProducts, setRecentProducts] = useState([]);
  function getRecentProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setRecentProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <>
      <div className="row">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="w-full md:w-1/2 lg:w-1/4 p-4 relative"
          >
            <Link to={`/productdetails/${product.id}`}>
              <div className="product py-4 px-6 shadow-2xl rounded-2xl">
                <div className="image w-full h-1/2 hover:scale-[1.01] duration-200">
                  <img
                    className="w-full"
                    src={product.imageCover}
                    alt={product.title}
                  />
                </div>
                <div className="pb-6 relative">
                  <h5 className="mt-2 text-gray-600">
                    {product.category.name}
                  </h5>
                  <h3 className="truncate w-[180px] text-lg font-medium">
                    {product.title}
                  </h3>
                  <div className="w-full flex justify-center overflow-hidden">
                    <button className="btn opacity-100 duration-400 absolute cursor-pointer right-1 top-4">
                      <i class="fa-solid fa-cart-plus text-2xl"></i>
                    </button>
                  </div>
                </div>
                <hr className="h-px bg-gray-300 border-0" />
                <div className="flex justify-between items-between w-full pt-1">
                  <span>
                    {product.price}{" "}
                    <span className="font-medium text-gray-700">EGP</span>
                  </span>
                  <span>
                    {product.ratingsAverage}{" "}
                    {product.ratingsAverage >= 2.5 ? (
                      <i className="fa-solid fa-star text-yellow-500"></i>
                    ) : (
                      <i class="fa-solid fa-star-half-stroke text-yellow-500"></i>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
