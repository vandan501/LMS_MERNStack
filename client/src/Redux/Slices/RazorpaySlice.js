import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
const initialSate = {
    key:"",
    subscription_id: false,
    allPayments:{},
    finalMonths:{},
    monthlySalesrecord:[]
}

export const getRazorPayId=createAsyncThunk("/razorpay/getId",async ()=>{
    try {
        const response=await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to load data...")
    }
})

export const purchaseCoursebundle=createAsyncThunk("/purchaseCourse",async ()=>{
    try {
        const response=await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.responese?.data?.message)
    }
})

export const varifyUserPayment=createAsyncThunk("/paymments/verify",async (data)=>{
    try {
        const response=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id :data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response.data;
        
    } catch (error) {
        toast.error(error?.responese?.data?.message)
    }
})

export const getPaymentrecord=createAsyncThunk("/paymments/record",async ()=>{
    try {
        const response=axiosInstance.get("/payments?count=100");
        toast.promise(response,{
            loading:"getting the payments records",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to get payment records" 
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation failed")
    }
})


export const cancelCourseBundle=createAsyncThunk("/paymments/cancel",async ()=>{
    try {
        const response=axiosInstance.post("/payments/unsubscribe");
        toast.promise(response,{
            loading:"unsubscribing the bundle",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to unsubscribe" 
        })
        return (await response).data;
    } catch (error) {

        toast.error(error?.responese?.data?.message)

    }
})

const razorpaySlice=createSlice({
    name:"razorpay",
    initialSate,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;
        })
        .addCase(purchaseCoursebundle.fulfilled,(state,action)=>{
             state.subscription_id=action?.payload?.subscription_id;   
        })
        .addCase(varifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(getPaymentrecord.fulfilled,(state,action)=>{
                state.allPayments=action?.payload?.allPayments;
                state.finalMonths=action?.payload?.finalMonths;
                state.monthlySalesrecord=action?.payload?.monthlySalesrecord;
        })

    }
})

export default razorpaySlice.reducer;