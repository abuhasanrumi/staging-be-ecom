'use client'

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './app/redux/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});


export default store
