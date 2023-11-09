import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}



// function to create a new course
export const createNewCourse = createAsyncThunk(
    "/get/courses",
    async (data) => {
      try {
        // creating the form data from user data
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
  
        const res = axiosInstance.post("/course", formData);
  
        toast.promise(res, {
          loading: "Creating the course...",
          success: "Course created successfully",
          error: "Failed to create course",
        });
  
        const response = await res;
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
  export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/course/${id}`);
        toast.promise(response, {
            loading: "deleting course .",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data.course;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 
















export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/course");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.course;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                state.courseData = [...action.payload];
                console.log(action.payload);

            }
            else{
                console.log("not found")
            }
        })
    }
});

export default courseSlice.reducer;