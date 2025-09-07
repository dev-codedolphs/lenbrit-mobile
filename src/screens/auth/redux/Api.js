import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL (replace with actual backend URL)
// const API_BASE_URL = 'https://starfish-app-ajafk.ondigitalocean.app/api/v1'
const API_BASE_URL = 'https://lenbrit-api-vb3nh.ondigitalocean.app/api/v1'
  

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
    static async signup(data) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    }

    // Email or Phone verification (send OTP)
    static verifyEmailPhone(data) {
        return axios.post(`${API_BASE_URL}/auth/verify-email-phone`, data);
    }

    // Resend OTP
    static async resendOTP(data) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, data);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }

    // Forgot Password (send reset email/phone)
    static forgotPassword(data) {
        return axios.post(`${API_BASE_URL}/auth/forgot-password`, data);
    }

    // Reset Password (after OTP verification)
    static async resetPassword(data) {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = axios.post(`${API_BASE_URL}/auth/reset-password?token=${token}`, data);

            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }

    // Get User Info (after login or on-demand)
    static async getUserInfo() {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = axios.get(`${API_BASE_URL}/auth/get-me`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + token,
                },
            });

            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }

    // Update User Info
    static async updateUserInfo(data) {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = axios.patch(`${API_BASE_URL}/auth/update-me`, data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + token,
                },
            });

            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }
}
