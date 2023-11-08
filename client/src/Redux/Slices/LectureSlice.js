import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures: []
}

export const  getCourseLecutres =createAsyncThunk("/course/lecture/get",async (cid)=>{
    try {
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response,{
            loading:"Fatcching course lectures",
            success:"Lectures fetched successfully",
            error:"Failed to load the lectures"
        });
        return (await response).data;
    } catch (error) {

        toast.error(error?.response?.data?.message);
    }
})


export const  addCourseLecutre =createAsyncThunk("/course/lecture/add",async (data)=>{
    try {
        const formData = new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title",data.title);
        formData.append("description",data.desccription);

        const response = axiosInstance.post(`/courses/${data.id}`,formData);
        toast.promise(response,{
            loading:"Adding course lectures",
            success:"Lectures addeded successfully",
            error:"Failed to add the lectures"
        });
        return (await response).data;
    } catch (error) {

        toast.error(error?.response?.data?.message);
    }
})



export const  deleteCourseLecutre =createAsyncThunk("/course/lecture/add",async (data)=>{
    try {
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"deleting course lectures",
            success:"Lectures deleted successfully",
            error:"Failed to delete the lectures"
        });
        return (await response).data;
    } catch (error) {

        toast.error(error?.response?.data?.message);
    }
})








const lectureSlice = createSlice({
    name:"lecture",
    initialState,   
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLecutres.fulfilled, (state,action)=>{
            state.lectures=action?.payload?.lectures;
        })
        .addCase(addCourseLecutre.fulfilled , (state,action) => {
            state.lectures = action?.payload?.course?.lectures;
        })

    }
})


export default lectureSlice.reducer;