import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../..//Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: ""
});

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const {name, value} = e.target;
    setUserInput({
        ...userInput,
        [name]: value
    })
}

async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
      toast.error("All fields are mandatory");
      return;
  }
  
  console.log("Sending data to backend:", userInput);
    const response = await dispatch(createNewCourse(userInput));
    if(response?.payload?.success) {
        setUserInput({
            title: "",
            category: "",
            createdBy: "",
            description: "",
            thumbnail: null,
            previewImage: ""
        });
        navigate("/courses");
    }
}
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh] bg-slate-300">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center items-center gap-0 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative bg-white "
        >
          <Link className="left-2 absolute top-6 text-2xl  link text-accent cursor-pointer" to="/">
            <AiOutlineArrowLeft className="text-black" />
          </Link>
          <h1 className="text-3xl mb-8 font-bold text-black text-center">
            Create New Course
          </h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border border-black"
                      src={userInput.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg text-black p-5">
                        Upload Your Course Thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input 
                className="hidden"
                type="file"
                id="image_uploads"
                accept=".jpg, .jpeg, .png"
                name="image_uploads"
                onChange={handleImageUpload}
                     />         
                          </div>
              <div className="flex flex-col gap-2">
              <label
              htmlFor="title"
              className="text-black text-lg font-semibold">
              Course title
              </label>
              <input 
              type="text"
              name="title"
              placeholder="enter course title.."
              id="title"
              className="bg-transparent px-2 py-1 border text-black"
              value={userInput.title}
              onChange={handleUserInput}
              />
              
              </div>
            </div>
            <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2">
                    <label
                    htmlFor="createdBy"
                    className="text-black text-lg font-semibold">
                    Course Instructor
                    </label>
                    <input 
                    type="text"
                    name="createdBy"
                    placeholder="enter course Instructor"
                    id="createdBy"
                    className="bg-transparent px-2 py-1 border text-black"
                    value={userInput.createdBy}
                    onChange={handleUserInput}
                    />
                    
                    </div>
          
                    <div className="flex flex-col gap-2">
                    <label
                    htmlFor="category"
                    className="text-black text-lg font-semibold">
                    Course Category
                    </label>
                    <input 
                    type="text"
                    name="category"
                    placeholder="enter course category"
                    id="category"
                    className="bg-transparent px-2 py-1 border text-black"
                    value={userInput.category}
                    onChange={handleUserInput}
                    />
                    
                    </div>
          
                    <div className="flex flex-col gap-2">
                    <label
                    htmlFor="description"
                    className="text-black text-lg font-semibold">
                    Course Description
                    </label>
                    <textArea 
                    type="text"
                    name="description"
                    placeholder="enter course description"
                    id="description"
                    className="bg-transparent px-2 h-24 overflow-y-scroll resize-none py-1 border text-black"
                    value={userInput.description}
                    onChange={handleUserInput}
                    />
                    
                    </div>
          

            </div>
          </main>
          <button type="submit" className="w-full hover:text-black m-8 bg-green-500 p-3 rounded-md hover:bg-yellow-500 font-bold text-white transition-all ease-in-out duration-300 text-lg">
          Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
