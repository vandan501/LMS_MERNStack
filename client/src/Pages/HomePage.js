import React from "react";
import { Link } from "react-router-dom";

import HomePageImage from '../Assets/Images/homepage.png';
import HomeLayout from "../Layouts/HomeLayout";

function HomePage()
{
return (
    <HomeLayout>
    <div className="pt-10 text-black flex items-center justify-center gap-10 mx-16 h-[90vh]">

    <div className="w-1/2 space-y-6">
        <h1 className="text-5xl font-semibold">
            Find out best 
             <span className="text-yellow-500 font-bold">
                  Online Courses
            </span>
        </h1>
        <p className="text-xl text-gray-400"> We have large library of courses thaught by highly skilled and qualified faculties at a very affordable cost.</p>
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
    
    <div className="w-1/2 items-center justify-center flex">
        <img alt="HomePage Image" src={HomePageImage} />     
    </div>
    </div>

    </HomeLayout>
);
}
export default HomePage;