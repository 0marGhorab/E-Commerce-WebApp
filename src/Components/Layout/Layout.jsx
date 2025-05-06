import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import NavTest from "../NavTest/NavTest";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-25 pb-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
