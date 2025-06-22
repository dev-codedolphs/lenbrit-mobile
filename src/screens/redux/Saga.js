import { put, call, takeEvery, all } from 'redux-saga/effects';
import authSlice from './Slice';
import userApi from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from './Slice';


export default function* userFlow() {
    yield all([
        takeEvery(userSlice.actions.addProduct.type, addProduct),
        takeEvery(userSlice.actions.getAllProducts.type, getAllProducts),
    ])
}

function* addProduct({ payload }) {
    try {
        const response = yield call(userApi.addProduct, payload);
        if (response?.status === 200) {
            yield put(userSlice.actions.addProductSuccess());
        }
    } catch (error) {
        yield put(userSlice.actions.addProductFailure(error.message));
    }
}

function* getAllProducts() {
    try {
      const response = yield call(userApi.getAllProducts);
      yield put(userSlice.actions.getAllProductsSuccess(response));
    } catch (error) {
      yield put(userSlice.actions.getAllProductsFailure(error.message));
    }
  }
