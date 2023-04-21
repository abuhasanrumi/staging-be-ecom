'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
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
    const res = await fetch("https://staging-be-ecom.techserve4u.com/api/user/signin", {
        method: "post",
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
        [loginUser.pending]: (state, action) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            const token = action.payload.token
            const tokenWithoutBearer = token.replace("Bearer ", "");
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
                const tokenWithoutBearer = token.replace("Bearer ", "");
                state.token = tokenWithoutBearer;
                localStorage.setItem('token', tokenWithoutBearer)
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