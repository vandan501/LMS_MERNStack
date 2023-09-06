import React from "react";
import  { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout.js";
import { login } from "../Redux/Slices/AuthSlice.js";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }


      

  async function createNewAccount(event) {
    event.preventDefault();

    if (
      !loginData.email ||
      !loginData.password 
    ) {
      toast.error("Please fill all details!");
      return;
    }
    // dispatch create account action
    const response = await dispatch(login(loginData));
    console.log(response);
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center overflow-x-auto h-[100vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-blue-600 text-4xl font-bold">
            Login Page
          </h1>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>

            <input
              type="email"
              id="email"
              className="bg-transparent px-2 py-1 border border-gray-300 "
              placeholder="Enter your email.."
              required
              name="email"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>

            <input
              type="password"
              id="password"
              className="bg-transparent px-2 py-1 border border-gray-300 "
              placeholder="Enter your password.."
              required
              name="password"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold p-2 rounded-sm hover:bg-yellow-400 transition-all ease-in-out duration-300 hover:text-black text-xl cursor-pointer py-2 mt-6"
          >
            Login
          </button>
          <p className="text-center">
            Do not have an Account?{" "}
            <Link
              to="/signup"
              className="link text-accent-focus cursor-pointer hover:text-red-800 font-bold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;
