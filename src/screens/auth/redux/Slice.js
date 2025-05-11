import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    isLoggedIn: false,
    isAuthenticated: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state) => ({
            ...state,
            isAuthenticated: true,
        }),
        login: (state) => ({
            ...state,
            loading: true,
            isLoggedIn: false,
            error: null
        }),
        loginSuccess: (state, action) => ({
            ...state,
            loading: false,
            isLoggedIn: true,
            user: action.payload
        }),
        loginFailure: (state, action) => ({
            ...state,
            loading: false,
            isLoggedIn: false,
            error: action.payload,
        }),
        logout: (state) => {
            state.isAuthenticated = false;
        },
    }
})

export default authSlice;