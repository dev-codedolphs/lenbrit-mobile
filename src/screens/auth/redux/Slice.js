import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    isLoggedIn: false,
    isAuthenticated: false,
    isVerified: null,
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
            isLoggedIn: true,
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
        verifyEmailPhoneSuccess: (state) => ({
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
        }),
        updateUserInfoSuccess: (state, action) => ({
            ...state,
            loading: false,
            user: { ...state.user, ...action.payload },
        }),
        updateUserInfoFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),
        reset: () => initialState,
    }
})

export default authSlice;