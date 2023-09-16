
import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from "./Slices/CourseSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer
    },
})

export default store;