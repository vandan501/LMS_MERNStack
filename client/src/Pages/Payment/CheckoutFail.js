import React from "react";
import {  RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
function CheckoutFail()
{
return (
    <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center text-black">
    <div className="w-80 h-[20rem] flex items-center justify-center flex-col shadow-[0_0_10px_black] rounded-lg relative">
      <h1 className="bg-red-500 absolute top-0 w-full py-4 text-2xl text-white font-bold text-center">
        Payment Failed
      </h1>

      <div className="px-4 flex flex-col items-center justify-center space-y-2">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold ">
            OOps! Your Payment Failed.{" "}
          </h2>

          <p>Please Try again later</p>
        </div>
        <RxCrossCircled className="text-red-500  text-5xl"></RxCrossCircled>
      </div>
      <Link
        to="/checkout"
        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 py-2 text-xl font-semibold text-center rounded-b-lg text-white w-full"
      >
        <button>Try Again</button>
      </Link>
    </div>
  </div>

    </HomeLayout>
)

}

export default CheckoutFail;