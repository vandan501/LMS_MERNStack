import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function Editprofile() {

    const userData = useSelector((state) => state?.auth?.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();
const [data, setData] = useState({
  previewImage: userData?.avatar?.secure_url || "", // Set the initial image URL
  fullName: userData?.fullName || "",
  avatar: undefined,
  userId: userData?._id || "", // Assuming _id is the correct user identifier
});

 function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(data);
        if(!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if(data.fullName.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        console.log(formData.entries().next())
        console.log(formData.entries().next())
        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/user/profile");
    }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-4 text-black w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
        <label className="cursor-pointer" htmlFor="image_uploads">
        {data.previewImage ? (
            <img 
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}

            />
        ): (
            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
        )}
    </label>
    <input 
        onChange={handleImageUpload}
        className="hidden"
        type="file"
        id="image_uploads"
        name="image_uploads"
        accept=".jpg, .png, .svg, .jpeg"

    />

        <div className="flex flex-col gap-4">
        <label htmlFor="fullName"
        className="text-lg font-semibold">
        Full Name
        </label>
        <input 
        type="text"
        className="p-2 bg-transparent border border-black"
        name="fullName"
        placeholder="Enter your name"
        id="fullName"
        required
        value={data.fullName}
        onChange={handleInputChange}
        />
        
        </div>
        <button className="w-full bg-orange-500 hover:bg-yellow-400 rounded-lg py-0 cursor-pointer hover:text-black text-lg transition-all ease-in-out duration-300 font-semibold text-white"
        type="submit"
        >
        Update Profile
        </button>

        <Link to="/user/profile">
        <p className="flex text-black link  cursor-pointer items-center justify-center w-full gap-2">
          <AiOutlineArrowLeft />  Go Back To Profile
        </p>
        
        </Link>


        </form>
      </div>
    </HomeLayout>
  );
}

export default Editprofile;
