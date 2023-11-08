import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
function CourseDescription() {
  const { state } = useLocation();
  // console.log(state)
  const navigate=useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="min-h-[99vh] pt-12 px-20 flex items-center justify-center flex-col text-black bg-slate-200">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              className="w-full h-64 border border-black"
              alt="Thumbnail"
              src={state?.thumbnail?.secure_url}
            />

            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="text-red-800 font-semibold">
                    Total Lectures :
                  </span>
                  {state?.numberOfLectures || 0}
                </p>

                <p className="font-semibold">
                  <span className="text-red-800 font-semibold">
                    Instructor :
                  </span>
                  {state?.createdBy}
                </p>
              </div>
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button onClick={() => navigate("/course/displaylectures", { state: { ...state } })} className="bg-yellow-600 rounded-md px-5 py-3 w-full transition-all ease-in-out duration-300 text-xl hover-bg-yellow-500 font-semibold">
  Watch lectures
</button>  ) : (
                <button onClick={()=>navigate("/checkout")} className="bg-yellow-600 rounded-md px-5 py-3 w-full transition-all ease-in-out duration-300 text-xl hover:bg-yellow-500 font-semibold">
                  Subscribe Now
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-red-500 mb-5 text-center">
              {state?.title}
            </h1>
            <p className="text-2xl text-red-800 font-medium">
              Course Description :
            </p>
            <p className="text-xl text-black">{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
