'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    message: "",
    user: "",
    token: "",
    loading: false,
    error: ""
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
            console.log(state.token)
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
        [loginUser.fulfilled]: (state, { payload: { token } }) => {
            state.loading = false;

            state.token = token;

            localStorage.setItem('token', token)
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = true
        },
        [verifyEmail.pending]: (state, action) => {
            state.loading = true
        },
        [verifyEmail.fulfilled]: (state, { payload: { error, message, success, token } }) => {
            state.loading = false;
            if (error && success) {
                state.error = error
            } else {
                state.token = token;

                localStorage.setItem('token', token)
            }
        },
        [verifyEmail.rejected]: (state, action) => {
            state.loading = true
        },
        [signUpUser.pending]: (state, action) => {
            state.loading = true
        },
        [signUpUser.fulfilled]: (state, { payload: { error, message } }) => {
            state.loading = false;
            if (error) {
                state.error = error
            } else {
                state.message = message
            }
        },
        [signUpUser.rejected]: (state, action) => {
            state.loading = true
        }
    }
})

export const { addToken, logout } = authSlice.actions

export default authSlice.reducer