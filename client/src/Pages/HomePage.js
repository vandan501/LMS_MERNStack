// eslint-disable-next-line
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import React, { useEffect } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa6";
import { FcCollaboration } from "react-icons/fc";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Swiper core and required modules
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import HomePageImage from "../Assets/Images/homepage.png";
import CourseCardForHomePage from "../Components/CourseCardForHomePage";
import HomeLayout from "../Layouts/HomeLayout";
import { getAllCourses } from "../Redux/Slices/CourseSlice";
import img1 from "./images/studentimg1.jpeg";
import img2 from "./images/studentimg2.jpeg";
import img3 from "./images/studentimg3.jpeg";
function HomePage() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }
  const breakpoints = {
    300: {
    slidesPerView: 1,
    spaceBetween: 0,
    },
    480: {
    slidesPerView: 2,
    spaceBetween: 0,
    },
    768: {
    slidesPerView: 3,
    spaceBetween: 0,
    },
    1440: {
    slidesPerView: 4,
    spaceBetween: 0,
    },
    };
  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10">
        {/**Section-1 started */}
        <section className="flex flex-col gap-6">
          <div>
            <div className="pt-10 text-black flex items-center justify-center flex-wrap gap-10 mx-16 h-[min-content] relative">
              <div className="w-[500px] space-y-6">
                <h1 className="text-5xl font-semibold">
                  Find out best{" "}
                  <span className="text-yellow-500 font-bold">
                    Online Courses
                  </span>
                </h1>
                <p className="text-xl text-gray-900">
                  {" "}
                  We have large library of courses thaught by highly skilled and
                  qualified faculties at a very affordable cost.
                </p>
                <div className="space-x-6">
                  <Link to="/courses">
                    <button className="bg-yellow-400 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out text-white">
                      Explore Courses
                    </button>
                  </Link>

                  <Link to="/contact">
                    <button className="border border-yellow-700 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-75 hover:text-white">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>

              <div className="w-[600px] h-[500px] items-center justify-center flex">
                <img alt="HomePage Image" src={HomePageImage} />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-[min-content] gap-10 flex-wrap">
            <div className="w-[300px] h-[70px] border flex justify-center items-center  gap-3 shadow-lg rounded-md">
              <BsGraphUpArrow className="text-[28px]" />
              50%+ Average Salary Hike
            </div>
            <div className="w-[300px] h-[70px] border flex justify-center items-center gap-3 shadow-lg rounded-md">
              <MdOutlineLibraryBooks className="text-[28px]" />
              {courseData.length}+ Courses
            </div>
            <div className="w-[300px] h-[70px] border flex justify-center items-center gap-3 shadow-lg rounded-md">
              <FcCollaboration className="text-[28px]" />
              20+ Hirring Partners
            </div>
          </div>
        </section>
        {/**end of Section-1*/}

        {/**our Top Courses section started*/}
        <section className="w-full h-[min-content] mb-18">
          <h1 className="text-4xl text-center w-[100%]">Our Top Courses</h1>

          <Swiper
            className="shadow-lg "
            style={{ padding: "60px"}}
            modules={[Navigation, Pagination, A11y, Autoplay, Scrollbar]}
             autoplay={{
              delay: 2000,
            }}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // spaceBetween={50}
            // slidesPerView={2}
            breakpoints={breakpoints}
          >
            {!courseData ? (
              <SwiperSlide>
                {" "}
                <h1 className="text-center text-4xl">
                  Loading courses...
                </h1>{" "}
              </SwiperSlide>
            ) : (
              courseData.map((element) => (
                <SwiperSlide key={element._id}>
                  <CourseCardForHomePage data={element} 
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </section>
        {/**our Top Courses */}

        {/**Benifits Section started*/}
        <div className="md:w-full flex flex-col flex-wrap w-full">
          <div className="w-full mb-7 flex justify-center">
            <h1 className="text-4xl text-center w-[40%]">
              AcademixHub is built for you if you relate with these..
            </h1>
          </div>
          <div className="flex  h-[min-content] justify-center mt-20 items-center gap-9 flex-wrap">
            <div className="flex flex-col gap-6">
              <div className="w-[300px] border rounded-2xl p-4 shadow-xl">
                <FaGraduationCap className="text-3xl m-auto w-full" />
                <h2>I fear if my grades would overshadow my talent.</h2>
              </div>
              <img src={img1} className="w-[300px] h-[300px] rounded-lg shadow-xl" />
            </div>
            <div className="flex  flex-col-reverse gap-6 ">
              <div className="w-[300px] border rounded-2xl p-4 shadow-xl">
                <SiBookstack className="text-3xl m-auto w-full" />
                <h2>The Curriculum feels it’s too outdated..</h2>
              </div>
              <img src={img2} className="w-[300px] h-[300px] rounded-lg shadow-xl" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="w-[300px] border rounded-2xl p-4 shadow-xl">
                <CiTimer className="text-3xl m-auto w-full" />
                <h2>Attending lectures are Boring..</h2>
              </div>
              <img src={img3} className="w-[300px] h-[300px] rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
        {/**end of  Benifits Section*/}

        {/**Marketting Section Started*/}
        <div className="w-full h-[min-content]  mb-16  p-5 flex flex-col justify-center items-center">
          <div className="w-[100%] h-full sm:text-center  md:flex md:justify-center md:items-center gap-11 md:flex-wrap sm:flex sm:justify-center sm:items-center sm:m-auto">
            <div className="md:w-[50%]  sm:border md:border-none w-[80%] text-left flex flex-col p-6 gap-1">
              <h3 className="text-yellow-500 font-semibold text-3xl">
                Welcome to AcademixHub
              </h3>
              <h1 className="font-mono text-2xl">
                Your Gateway to Seamless Learning!
              </h1>
              <p className="text-md text-gray-900">
                At AcademixHub, we believe in the transformative power of
                self-development. Our curated courses are designed to assist you
                in making significant changes in your personal understanding,
                reshaping your confidence, and unlocking your true potential for
                a fulfilling career journey.
              </p>
              <Link to="/signup">
                <button className="self-center m-auto bg-yellow-400 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out text-BLACK mt-7 ">
                  Register Now
                </button>
              </Link>
            </div>
            <div className=" md:w-[40%] sm:w-[300px]">
              <img
                src={
                  "https://images.pexels.com/photos/5905717/pexels-photo-5905717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt=""
                className=" rounded-[10%]"
              />
            </div>
          </div>
        </div>
        {/**end of Marketting Section*/}
      </div>
    </HomeLayout>
  );
}
export default HomePage;
