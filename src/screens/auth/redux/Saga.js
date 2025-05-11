import { put, call, takeEvery, all } from 'redux-saga/effects';
import authSlice from './Slice';
import authApi from './Api';
import { navigate } from '../../../utils/navigate';


export default function* authFlow() {
    yield all([
        takeEvery(authSlice.actions.login.type, login),
    ])
}

function* login({ payload }) {
    try {
        const response = yield call(authApi.login, payload);
        console.log("response here", response)
        if (response.data.isAuthenticated) {
            yield navigate('Home', {
                userData: response.data.truvyData,
            });
            yield put(authSlice.actions.loginSuccess(response.data));
        } else {
            yield put(authSlice.actions.loginFailure());
        }

    }
    catch (error) {
        yield put(authSlice.actions.loginFailure());
        console.log(error)
    }

}
