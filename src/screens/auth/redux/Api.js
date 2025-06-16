import axios from 'axios';

// Base URL (replace with actual backend URL)
const API_BASE_URL = 'https://starfish-app-ajafk.ondigitalocean.app/api/v1'
const token = '2343424'
  

export default class Api {
    // User Login
    static async login(data) {
        try {
            const response = await axios.post (`${API_BASE_URL}/auth/login`, data, { timeout: 5000 });
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }

    // User Signup
    static signup(data) {
        return axios.post(`${API_BASE_URL}/auth/register`, data);
    }

    // Email or Phone verification (send OTP)
    static verifyEmailPhone(data) {
        return axios.post(`${API_BASE_URL}/auth/verify-email-phone`, data);
    }

    // Resend OTP
    static resendOTP(data) {
        return axios.post(`${API_BASE_URL}/auth/resend-otp`, data);
    }

    // Forgot Password (send reset email/phone)
    static forgotPassword(data) {
        return axios.post(`${API_BASE_URL}/auth/forgot-password`, data);
    }

    // Reset Password (after OTP verification)
    static resetPassword(data) {
        return axios.post(`${API_BASE_URL}/auth/reset-password?${token}`, data);
    }

    // Get User Info (after login or on-demand)
    static getUserInfo() {
        return axios.get(`${API_BASE_URL}/auth/get-me`);
    }

    // Update User Info
    static updateUserInfo(data) {
        return axios.put(`${API_BASE_URL}/auth/update-me`, data);
    }
}
