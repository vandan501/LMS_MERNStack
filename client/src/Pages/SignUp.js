import React from "react";
import  { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher.js";
import HomeLayout from "../Layouts/HomeLayout.js";
import { createAccount } from "../Redux/Slices/AuthSlice.js";

function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupdata] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupdata({
      ...signupData,
      [name]: value,
    });
  }


  function getImage(event) {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupdata({
        ...signupData,
        avatar: uploadedImage,
      });

      
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();

    if (
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please fill all details!");
      return;
    }
    
    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }
    // checking valid email
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }
    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password should be 6 - 16 character long with atleast a number and special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    console.log(response);
    if (response?.payload?.success) navigate("/");

    setSignupdata({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
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
            Registration Page
          </h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg,.png,.jpeg,.svg"
            onChange={getImage}
          />
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="fullName" className="font-semibold">
              FullName
            </label>

            <input
              type="text"
              id="fullName"
              className="bg-transparent px-2 py-1 border border-gray-300 "
              placeholder="Enter your Name"
              required
              name="fullName"
              value={signupData.fullName}
              onChange={handleUserInput}
            />
          </div>

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
              value={signupData.email}
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
              value={signupData.password}
              onChange={handleUserInput}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold p-2 rounded-sm hover:bg-yellow-400 transition-all ease-in-out duration-300 hover:text-black text-xl cursor-pointer py-2 mt-6"
          >
            Create Account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link text-accent-focus cursor-pointer hover:text-red-800 font-bold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default SignUp;
