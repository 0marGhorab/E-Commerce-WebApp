import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export default function NavTest() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let logOut = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  };
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex fixed top-0 left-0 right-0 z-50 justify-between items-center text-white py-6 px-8 md:px-32 bg-blue-400 drop-shadow-md">
        <Link
          to={"/"}
          className="logo text-xl font-bold cursor-pointer hover:scale-105 transition-all"
        >
          LOGO
        </Link>
        <ul className="hidden xl:flex items-center gap-8 font-semibold text-base">
          {userLogin !== null ? (
            <>
              <li className="text-lg p-3 text-slate-900 font-medium">
                <NavLink to={""}>Home</NavLink>
              </li>
              <li className="text-lg p-3 text-slate-900 font-medium">
                <NavLink to={"about"}>About</NavLink>
              </li>
              <li className="text-lg p-3 text-slate-900 font-medium">
                <NavLink to={"cart"}>Cart</NavLink>
              </li>
              <li className="text-lg p-3 text-slate-900 font-medium">
                <NavLink to={"categories"}>Categories</NavLink>
              </li>
              <li className="text-lg p-3 text-slate-900 font-medium">
                <NavLink to={"brands"}>Brands</NavLink>
              </li>
              <li className="text-lg p-3 text-slate-900 font-medium">
                <NavLink to={"products"}>Products</NavLink>
              </li>
            </>
          ) : null}
        </ul>
        {userLogin !== null ? (
          <i
            class="bx bx-menu bars text-3xl cursor-pointer text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>
        ) : null}

        <div
          className={`absolute xl:hidden top-18 left-0 w-full bg-blue-300 flex flex-col items-left gap-6 font-semibold text-lg transform transition-transform ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <ul
            className={`xl:flex items-center gap-8 font-semibold text-base ${
              !isMenuOpen ? "hidden" : null
            }`}
          >
            {userLogin !== null ? (
              <>
                <li className="text-lg ps-8 hover:bg-blue-400 duration-500 h-14 flex items-center text-slate-900 font-medium">
                  <NavLink to={""} className={`block w-full h-full pt-3`}>
                    Home
                  </NavLink>
                </li>
                <li className="text-lg ps-8 hover:bg-blue-400 duration-500 h-14 flex items-center text-slate-900 font-medium">
                  <NavLink to={"about"} className={`block w-full h-full pt-3`}>
                    About
                  </NavLink>
                </li>
                <li className="text-lg ps-8 hover:bg-blue-400 duration-500 h-14 flex items-center text-slate-900 font-medium">
                  <NavLink to={"cart"} className={`block w-full h-full pt-3`}>
                    Cart
                  </NavLink>
                </li>
                <li className="text-lg ps-8 hover:bg-blue-400 duration-500 h-14 flex items-center text-slate-900 font-medium">
                  <NavLink
                    to={"categories"}
                    className={`block w-full h-full pt-3`}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="text-lg ps-8 hover:bg-blue-400 duration-500 h-14 flex items-center text-slate-900 font-medium">
                  <NavLink to={"brands"} className={`block w-full h-full pt-3`}>
                    Brands
                  </NavLink>
                </li>
                <li className="text-lg ps-8 hover:bg-blue-400 duration-500 h-14 flex items-center text-slate-900 font-medium">
                  <NavLink
                    to={"products"}
                    className={`block w-full h-full pt-3`}
                  >
                    Products
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <div className="md:flex items-center justify-center gap-3">
          <ul className="flex justify-around">
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
              <li className="text-lg text-slate-900 font-medium">
                <span className="cursor-pointer" onClick={logOut}>
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
