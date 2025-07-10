import { put, call, takeEvery, all } from 'redux-saga/effects';
import userApi from './Api';
import userSlice from './Slice';


export default function* userFlow() {
    yield all([
        takeEvery(userSlice.actions.addProduct.type, addProduct),
        takeEvery(userSlice.actions.getAllProducts.type, getAllProducts),
        takeEvery(userSlice.actions.updateProduct.type, updateProduct),
        takeEvery(userSlice.actions.deleteProduct.type, deleteProduct),

        // Orders
        takeEvery(userSlice.actions.createOrder.type, createOrder),
        takeEvery(userSlice.actions.getAllOrders.type, getAllOrders),
        takeEvery(userSlice.actions.getOrderById.type, getOrderById),
        
        // Cart
        takeEvery(userSlice.actions.addToCart.type, addToCart),
        takeEvery(userSlice.actions.getAllCartItems.type, getAllCartItems),
        takeEvery(userSlice.actions.removeItemFromCart.type, removeItemFromCart),
        takeEvery(userSlice.actions.updateItemInCart.type, updateItemInCart),

        // categories
        takeEvery(userSlice.actions.getAllCategories.type, getAllCategories),
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

// order functions
function* createOrder({ payload }) {
    try {
        const response = yield call(userApi.createOrder, payload);
        console.log('response......', response)
        if (response?.status === 201 || response?.id) {
            yield put(userSlice.actions.createOrderSuccess(response));
        }
    } catch (error) {
        yield put(userSlice.actions.createOrderFailure(error.message));
    }
}

function* getAllOrders() {
    try {
        const response = yield call(userApi.getAllOrders);
        yield put(userSlice.actions.getAllOrdersSuccess(response));
    } catch (error) {
        yield put(userSlice.actions.getAllOrdersFailure(error.message));
    }
}

function* getOrderById({ payload }) {
    try {
        const response = yield call(userApi.getOrderById, payload);
        yield put(userSlice.actions.getOrderByIdSuccess(response));
    } catch (error) {
        yield put(userSlice.actions.getOrderByIdFailure(error.message));
    }
}

// cart functions
function* addToCart({ payload }) {
    try {
        const res = yield call(userApi.addToCart, payload);
        yield put(userSlice.actions.addToCartSuccess(res));
    } catch (e) {
        yield put(userSlice.actions.addToCartFailure(e.message));
    }
}

function* getAllCartItems() {
    try {
        const res = yield call(userApi.getAllCartItems);
        yield put(userSlice.actions.getAllCartItemsSuccess(res));
    } catch (e) {
        yield put(userSlice.actions.getAllCartItemsFailure(e.message));
    }
}

function* removeItemFromCart({ payload }) {
    try {
        const res = yield call(userApi.removeItemFromCart, payload);
        yield put(userSlice.actions.removeItemFromCartSuccess(res));
    } catch (e) {
        yield put(userSlice.actions.removeItemFromCartFailure(e.message));
    }
}

function* getAllCategories() {
    try {
        const res = yield call(userApi.getAllCategories);
        yield put(userSlice.actions.getAllCategoriesSuccess(res));
    } catch (e) {
        yield put(userSlice.actions.getAllCategoriesFailure(e.message));
    }
}

function* updateItemInCart({ payload }) {
    try {
        const { itemId, updatedData } = payload;
        const res = yield call(userApi.updateItemInCart, itemId, updatedData);
        yield put(userSlice.actions.updateItemInCartSuccess(res));
    } catch (e) {
        yield put(userSlice.actions.updateItemInCartFailure(e.message));
    }
}
