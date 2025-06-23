import { put, call, takeEvery, all } from 'redux-saga/effects';
import authSlice from './Slice';
import authApi from './Api';
import { navigate } from '../../../utils/navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export default function* authFlow() {
    yield all([
        takeEvery(authSlice.actions.login.type, login),
        takeEvery(authSlice.actions.signup.type, signup),
        takeEvery(authSlice.actions.verifyEmailPhone.type, verifyEmailPhone),
        takeEvery(authSlice.actions.resendOTP.type, resendOTP),
        takeEvery(authSlice.actions.forgotPassword.type, forgotPassword),
        takeEvery(authSlice.actions.resetPassword.type, resetPassword),
        takeEvery(authSlice.actions.getUserInfo.type, getUserInfo),
        takeEvery(authSlice.actions.updateUserInfo.type, updateUserInfo),
    ])
}

function* login({ payload }) {
    try {
        const response = yield call(authApi.login, payload);
        if (response?.status === 200) {
            AsyncStorage.setItem('accessToken', response?.data?.token)
            yield put(authSlice.actions.loginSuccess(response?.data?.user));
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                topOffset: 20,
                visibilityTime: 3000,
            });
        } else {
            yield put(authSlice.actions.loginFailure());
        }
    }
    catch (error) {
        yield put(authSlice.actions.loginFailure());
        console.log(error)
    }

}

function* signup({ payload }) {
    try {
        const response = yield call(authApi.signup, payload);
        if (response.data.status === 'success') {
            yield put(authSlice.actions.signupSuccess(response.data));
        } else {
            yield put(authSlice.actions.signupFailure(response.data.error));
        }
    } catch (error) {
        yield put(authSlice.actions.signupFailure(error.response?.data || error.message));
        console.log(error);
    }
}

function* verifyEmailPhone({ payload }) {
    try {
        const response = yield call(authApi.verifyEmailPhone, payload);
        console.log("Verify Email/Phone Response:", response);
        yield put(authSlice.actions.verifyEmailPhoneSuccess(response.data.isVerified));
    } catch (error) {
        yield put(authSlice.actions.verifyEmailPhoneFailure(error.response?.data || error.message));
        console.log(error);
    }
}

function* resendOTP({ payload }) {
    try {
        const response = yield call(authApi.resendOTP, payload);
        console.log("Resend OTP Response:", response);
        yield put(authSlice.actions.resendOTPSuccess(response.data));
    } catch (error) {
        yield put(authSlice.actions.resendOTPFailure(error.response?.data || error.message));
        console.log(error);
    }
}

function* forgotPassword({ payload }) {
    try {
        const response = yield call(authApi.forgotPassword, payload);
        console.log("Forgot Password Response:", response);
        yield put(authSlice.actions.forgotPasswordSuccess(response.data));
    } catch (error) {
        yield put(authSlice.actions.forgotPasswordFailure(error.response?.data || error.message));
        console.log(error);
    }
}

function* resetPassword({ payload }) {
    try {
        const response = yield call(authApi.resetPassword, payload);
        console.log("Reset Password Response:", response);
        yield put(authSlice.actions.resetPasswordSuccess(response.data));
    } catch (error) {
        yield put(authSlice.actions.resetPasswordFailure(error.response?.data || error.message));
        console.log(error);
    }
}

function* getUserInfo() {
    try {
        const response = yield call(authApi.getUserInfo);
        console.log("Get User Info Response:", response);
        if (response?.status === 200){
            yield put(authSlice.actions.getUserInfoSuccess(response.data.user));
        }
    } catch (error) {
        yield put(authSlice.actions.getUserInfoFailure(error.response?.data || error.message));
        console.log(error);
    }
}

function* updateUserInfo({ payload }) {
    try {
        const response = yield call(authApi.updateUserInfo, payload);
        console.log("Update User Info Response:", response);
        yield put(authSlice.actions.updateUserInfoSuccess(response.data));
    } catch (error) {
        yield put(authSlice.actions.updateUserInfoFailure(error.response?.data || error.message));
        console.log(error);
    }
}
