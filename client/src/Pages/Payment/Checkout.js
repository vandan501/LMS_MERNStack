import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  // const isPaymentVerified = useSelector(
  //   (state) => state?.razorpay?.isPaymentVerified
  // );
  const userData = useSelector((state) => state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();
    console.log(razorpayKey);
    console.log(subscription_id);

    if (!razorpayKey || !subscription_id) {
      toast.error("something went wrong!!");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      theme: {
        color: "#F37254"
      },
      prefill: {
        email: userData.email,
        name: userData.fullName,
      },
      name: "AcademixHub Pvt. Ltd.",
      description: "subscription",
      handler: async function (response) {
        (paymentDetails.razorpay_payment_id = response.razorpay_payment_id),
          (paymentDetails.razorpay_signature = response.razorpay_signature),
          (paymentDetails.razorpay_subscription_id =
            response.razorpay_subscription_id),
          toast.success("payment successfull");

        const res=await dispatch(verifyUserPayment(paymentDetails));
        console.log(res);

        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
    console.log("subscription_id in load:", subscription_id); // Add this line
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center  justify-center text-black relative"
      >
        <div className="w-[350px] h-[26rem] flex  justify-center flex-col shadow-[0_0_10px_black] rounded-lg relative items-center">
          <h1 className="text-2xl absolute top-0 bg-yellow-400 p-4 rounded-tr-lg rounded-tl-lg w-full text-center font-bold  text-black ">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px] text-black">
              This Purchase will allow you to access all available course of our
              platform for{" "}
              <span className="text-red-600 font-semibold ">
                <br />1 Year Duration
              </span>{" "}
              All the exesting and new launched courses will be also available.
            </p>
            <p className="flex items-center justify-center font-bold gap-1 text-2xl">
              <BiRupee />
              <span>499</span> Only.
            </p>
            <div className="text-gray-600">
              <p>100% refund on cancellation</p>
              <p>* Terms and Conditions applied. *</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-500 hover:bg-blue-400 p-2 rounded-bl-md rounded-br-md transition-all ease-in-out duration-300           font-bold absolute bottom-0"
          >
            Buy Now
          </button>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
