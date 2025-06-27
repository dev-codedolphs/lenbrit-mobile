import { put, call, takeEvery, all } from 'redux-saga/effects';
import userApi from './Api';
import userSlice from './Slice';


export default function* userFlow() {
    yield all([
        takeEvery(userSlice.actions.addProduct.type, addProduct),
        takeEvery(userSlice.actions.getAllProducts.type, getAllProducts),
        takeEvery(userSlice.actions.updateProduct.type, updateProduct),
        takeEvery(userSlice.actions.deleteProduct.type, deleteProduct),
    ])
}

function* addProduct({ payload }) {
    try {
        const response = yield call(userApi.addProduct, payload);
        if (response?.status === 201) {
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

function* updateProduct({ payload }) {
    try {
        const { productId, updatedData } = payload;
        const response = yield call(userApi.updateProduct, productId, updatedData);

        yield put(userSlice.actions.updateProductSuccess(response));
    } catch (error) {
        yield put(userSlice.actions.updateProductFailure(error.message));
    }
}

function* deleteProduct({ payload }) {
    try {
        const productId = payload;
        const response = yield call(userApi.deleteProduct, productId);
        yield put(userSlice.actions.deleteProductSuccess(response));
    } catch (error) {
        yield put(userSlice.actions.deleteProductFailure(error.message));
    }
}
