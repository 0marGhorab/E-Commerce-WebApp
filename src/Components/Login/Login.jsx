import React, { useContext } from "react";
import { useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../Contexts/UserContext";

export default function Register() {
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let [apiError, setApiError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  async function handleLogin(values) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userToken", res.data.token);
        setUserLogin(res.data.token);
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err.response.data.message);
        console.log(apiError);
        setIsLoading(false);
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase then from 5 to 10 lowercase"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="p-6 max-w-xl mx-auto h-[70vh] flex flex-col gap-10 py-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Login
      </h2>
      {apiError ? (
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div class="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        {formik.errors.email && formik.touched.email ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : null}

        <div class="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <i
            className={showPassword? "fa-solid fa-eye-slash absolute right-2 top-5 text-gray-600" : "fa-solid fa-eye absolute right-2 top-5 text-gray-600"}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          ></i>
        </div>

        {formik.errors.password && formik.touched.password ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : null}
        <div className="flex flex-col gap-2 py-10">
          <button
            type="submit"
            class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? (
              <i className="fas fa-spin fa-spinner me-1"></i>
            ) : (
              "Login"
            )}
          </button>
          <span>
            Don't have an account yet?{" "}
            <Link
              to={"/register"}
              className="font-medium text-blue-800 hover:underline"
            >
              Register Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
