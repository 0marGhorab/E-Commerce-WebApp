import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./Home.module.css";
import Recent from "../Recent/recent";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  return (
    <>
      <div className="py-3">
        <CategorySlider />
      </div>
      <div className="py-3">
        <div className="text-5xl text-center font-bold pt-2">
          <h2>Products</h2>
        </div>
        <Recent />
      </div>
    </>
  );
}
