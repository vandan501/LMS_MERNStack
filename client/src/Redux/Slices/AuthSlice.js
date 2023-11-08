import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";


const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};



//function for create a new account
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    let res = axiosInstance.post("/user/login", data);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

//function for logout
export const logout=createAsyncThunk("/auth/logout",async ()=>{
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! for logout...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
    return (await res).data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message);    
  }
})

//update profile function
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
  try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
          loading: "Wait! profile update in progress...",
          success: (data) => {
              return data?.data?.message;
          },
          error: "Failed to update profile"
      });
      return (await res).data;
  } catch(error) {
      toast.error(error?.response?.data?.message);
  }
})


//get USer data after update profile
export const getUserData=createAsyncThunk("/user/details",async ()=>{
  try {
    const res = axiosInstance.get("user/profile");
    return (await res).data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message);    
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
      builder
// for user login
.addCase(login.fulfilled, (state, action) => {
  localStorage.setItem("data", JSON.stringify(action?.payload?.user));
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", action?.payload?.user?.role);
  state.isLoggedIn = true;
  state.data = action?.payload?.user ;
  state.role = action?.payload?.user?.role;

})
// for user logout
.addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
})
// get user details after update
.addCase(getUserData.fulfilled, (state, action) => {
  localStorage.setItem("data", JSON.stringify(action?.payload?.user));
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", action?.payload?.user?.role);
  state.isLoggedIn = true;
  state.data = action?.payload?.user ;
  state.role = action?.payload?.user?.role;

})

}
});




// export const {}=authSlice.actions;
export default authSlice.reducer;
