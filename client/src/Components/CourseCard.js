import React from "react";
import { useNavigate } from "react-router-dom";
function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="text-black w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-100 "
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg transition-transform transform scale-100 group-hover:scale-105 duration-300 ease-in-out"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="p-3 space-y-1 text-black">
          <h2 className="text-xl font-bold text-blue-500 line-clamp-2">
            {data?.title}
          </h2>

          <p className="line-clamp-2 text-black font-semibold">
            <span className="text-black font-medium">Description:</span>{" "}
            {data?.description}
          </p>

          <p className="line-clamp-2 text-black font-semibold">
            <span className="text-gray-500 font-medium">Category:</span>{" "}
            {data?.category}
          </p>

          <p className="line-clamp-2 text-black font-bold">
            <span className="text-gray-500 font-medium">Instructor:</span>{" "}
            {data?.createdBy}
          </p>

          <p className="line-clamp-2 text-black font-bold">
            <span className="text-gray-500 ">Number of Lectures: </span>{" "}
            {data?.numberOfLectures || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
