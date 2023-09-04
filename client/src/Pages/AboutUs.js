import React from "react";

import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout.js";
function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-black">
        <div className="flex items-center gap-5 mx-10 ">
          <section className="w-1/2 space-y-10">
            <h1 className="text-4xl text-red-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className=" text-xl text-blue-800 ">
              Our goal is to provide the affordable and quality edication to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/2">
            <img
              id="test1"
              alt="image "
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0));" }}
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>

        
          <div className="carousel w-1/2 m-auto my-16">
            {celebrities &&
              celebrities.map((celebrity) => (
                <CarouselSlide
                  {...celebrity}
                  key={celebrity.slideNumber}
                  totalSlides={celebrities.length}
                />
              ))}
          </div>
        </div>
       </HomeLayout>
  );
}

export default AboutUs;
