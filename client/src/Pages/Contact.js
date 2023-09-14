import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All Fileds are required!!");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid Email");
      return;
    }
    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the Form",
      });
      const contractResponse = await response;
      console.log(contractResponse);
      if (contractResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      toast.error("Operation Failed...");
    }
  }
  return (
    <HomeLayout className="p-10">
      <div className="flex justify-center items-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center gap-4 p-5 rounded-md  text-black shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold text-black">Contact Us</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              name="name"
              id="name"
              placeholder="Enter Your Name.."
              type="text"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-lg font-semibold ">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              name="email"
              id="email"
              value={userInput.email}
              placeholder="Enter Your Email.."
              type="email"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-lg font-semibold ">
              Message
            </label>
            <textarea
              value={userInput.message}
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter Your Message.."
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
