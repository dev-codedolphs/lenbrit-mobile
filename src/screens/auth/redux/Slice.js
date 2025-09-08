import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    isLoggedIn: false,
    isAuthenticated: false,
    isVerified: null,
    success: false,
    error: false,
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
            error: false
        }),
        loginSuccess: (state, action) => ({
            ...state,
            loading: false,
            isLoggedIn: true,
            user: action.payload || null,
        }),
        loginFailure: (state, action) => ({
            ...state,
            loading: false,
            isLoggedIn: false,
            error: true,
        }),
        logout: (state) => {
            state.isAuthenticated = false;
        },

        // Signup actions
        signup: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        signupSuccess: (state, action) => ({
            ...state,
            loading: false,
            user: action.payload,
        }),
        signupFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Verify email/phone actions
        verifyEmailPhone: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        verifyEmailPhoneSuccess: (state, action) => ({
            ...state,
            loading: false,
            isVerified: action.payload,
        }),
        verifyEmailPhoneFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Resend OTP actions
        resendOTP: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        resendOTPSuccess: (state) => ({
            ...state,
            loading: false,
        }),
        resendOTPFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Forgot password actions
        forgotPassword: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        forgotPasswordSuccess: (state) => ({
            ...state,
            loading: false,
        }),
        forgotPasswordFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Reset password actions
        resetPassword: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        resetPasswordSuccess: (state) => ({
            ...state,
            loading: false,
        }),
        resetPasswordFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Get user info actions
        getUserInfo: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        getUserInfoSuccess: (state, action) => ({
            ...state,
            loading: false,
            user: action.payload,
        }),
        getUserInfoFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Update user info actions
        updateUserInfo: (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false,
        }),
        updateUserInfoSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
            user: state.user ? { ...state.user, ...action.payload } : action.payload,
        }),
        updateUserInfoFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
            success: false,
        }),
        reset: () => initialState,
    }
})

export default authSlice;