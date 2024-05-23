import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();

  const {courseData} = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
}
    useEffect(() => {
        loadCourses();
    }, []);

return (
    <HomeLayout>
    <div className="min-h-[100vh] pt-12  pl-20 flex flex-col gap-10 text-black">
      <h1 className="text-blue-700 text-4xl font-semibold text-center">
        Explore the courses made by{" "}
        <span className="text-red-500 text-4xl font-bold">
          Industry Experts
        </span>
      </h1>
      <div className="mb-10 flex flex-wrap gap-14">
      {courseData.map((element)=>{
        return <CourseCard key={element._id} data={element} />
      })}
    
      </div>
    </div>
  </HomeLayout>
);
}
export default CourseList;
