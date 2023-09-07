import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

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