import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
function CheckoutSuccess() {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getUserData());
  }
  )



  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-black">
        <div className="w-80 h-[20rem] flex items-center justify-center flex-col shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-green-500 absolute top-0 w-full py-4 text-2xl text-white font-bold text-center">
            Payment Successfully
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold ">
                Welcome to the pro bundle.{" "}
              </h2>

              <p>Now you can enjoy all the courses.</p>
            </div>
            <AiFillCheckCircle className="text-green-500 text-5xl"></AiFillCheckCircle>
          </div>
          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 py-2 text-xl font-semibold text-center rounded-b-lg text-white w-full"
          >
            <button>Go to Dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
