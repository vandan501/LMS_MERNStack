import React from "react";
import toast from "react-hot-toast";
import {  useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../..//Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
function Profile() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const userData = useSelector((state) => state?.auth?.data);
async function handleCancellation()
{
  toast("initiating cancellation");
  await dispatch(cancelCourseBundle());
  await dispatch(getUserData());
  toast.success("cancellation completed!");
  navigate("/");

}


  return (
    <HomeLayout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-5 rounded-lg p-4 text-black w-[500px] shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-24 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email:</p>
            <p>{userData?.email}</p>
            <p>Role:</p>
            <p>{userData?.role}</p>

            <p>Subscription:</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-green-500 transition-all ease-in-out text-white duration-300 rounded-sm font-semibold p-2 cursor-pointer text-center"
            >
              Change Password
            </Link>
            <Link
              to="/user/editprofile"
              className="w-1/2 hover:bg-orange-500 bg-blue-500 transition-all ease-in-out text-white duration-300 rounded-sm font-semibold p-2 cursor-pointer text-center"
            >
              Edit Profile
            </Link>
          </div>
          {
            userData?.subscription?.status === "active" && (
                <button onClick={handleCancellation} className="w-full bg-red-500 font-medium text-sm p-3 rounded-md  transition-all ease-in-out text-white duration-300 hover:bg-red-400 cursor-pointer text-center">
                Cancel Subscription
                </button>
            )
          }
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
