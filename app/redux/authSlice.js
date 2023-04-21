'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const initialState = {
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || "",
    loading: false,
    error: false
}

export const signUpUser = createAsyncThunk('sign-up', async (body) => {
    const res = await fetch("https://staging-be-ecom.techserve4u.com/api/user/signup", {
        method: "post",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})

export const verifyEmail = createAsyncThunk('verify', async (body) => {
    const res = await fetch("https://staging-be-ecom.techserve4u.com/api/user/verifyotp", {
        method: "post",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})

export const loginUser = createAsyncThunk('login', async (body) => {
    // const dispatch = useDispatch()
    const res = await fetch("https://staging-be-ecom.techserve4u.com/api/user/signin", {
        method: "post",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})

export const changePass = createAsyncThunk('changePass', async (body) => {
    const res = await fetch("https://staging-be-ecom.techserve4u.com/api/user/changePassword", {
        method: "put",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})



export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token")
        },
        logout: (state, action) => {
            state.token = null
            localStorage.clear()
        }
    },
    extraReducers: {
        [changePass.pending]: (state, action) => {
            state.loading = true
        },
        [changePass.fulfilled]: (state, action) => {
            console.log(success)
            // const token = action.payload.token
            // const tokenWithoutBearer = token.replace("Bearer ", "");
            // state.loading = false;
            // state.token = tokenWithoutBearer;
            // res.cookie('token', tokenWithoutBearer, { httpOnly: true });

            // localStorage.setItem('token', tokenWithoutBearer)
        },
        [changePass.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        },
        [loginUser.pending]: (state, action) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            const token = action.payload.token
            const tokenWithoutBearer = token?.replace("Bearer ", "");
            state.loading = false;
            state.token = tokenWithoutBearer;

            localStorage.setItem('token', tokenWithoutBearer)
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        },
        [verifyEmail.pending]: (state, action) => {
            state.loading = true
        },
        [verifyEmail.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.success) {
                const token = action.payload.token
                const tokenWithoutBearer = token?.replace("Bearer ", "");
                state.token = tokenWithoutBearer;
                localStorage.setItem('token', tokenWithoutBearer)
                // res.cookie('token', tokenWithoutBearer, { httpOnly: true });
            } else {
                state.error = true
            }
        },
        [verifyEmail.rejected]: (state, action) => {
            state.loading = false
        },
        [signUpUser.pending]: (state, action) => {
            state.loading = true;

        },
        [signUpUser.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.isOtpSend === true) {
                state.email = action.payload.email
                localStorage.setItem('email', action.payload.email)
            } else {
                state.error = true
            }

        },
        [signUpUser.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        }
    }
})

export const { addToken, logout } = authSlice.actions

export default authSlice.reducer