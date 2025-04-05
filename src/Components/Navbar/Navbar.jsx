import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let logOut = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-10 left-0 right-0 z-50">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center bg-blue-200 rounded-xl">
          <div className="left flex">
            <Link
              to={"/"}
              className="logo text-xl font-bold cursor-pointer"
            >
              LOGO
            </Link>
            <ul className="flex flex-col justify-around ps-10 lg:flex-row">
              {userLogin !== null ? (
                <>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={""}>Home</NavLink>
                  </li>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"about"}>About</NavLink>
                  </li>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"cart"}>Cart</NavLink>
                  </li>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"categories"}>Categories</NavLink>
                  </li>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"brands"}>Brands</NavLink>
                  </li>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"products"}>Products</NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div className="right">
            <ul className="flex flex-col justify-around ps-10 lg:flex-row">
              {userLogin === null ? (
                <>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"login"}>Login</NavLink>
                  </li>
                  <li className="text-lg mx-4 text-slate-900 font-medium">
                    <NavLink to={"register"}>Register</NavLink>
                  </li>
                </>
              ) : (
                <li className="text-lg mx-4 text-slate-900 font-medium">
                  <span className="cursor-pointer" onClick={logOut}>
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
