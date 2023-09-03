
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Slices/AuthSlice';

const store=configureStore({
    reducer:{
        auth:authSlice
    },
    devTools:true
})

export default store;