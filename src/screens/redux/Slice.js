import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    success: false,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // add product
        addProduct: (state) => ({ ...state, loading: true, error: null, success: false }),
        addProductSuccess: (state) => ({ ...state, loading: false, success: true }),
        addProductFailure: (state, action) => ({ ...state, loading: false, error: action.payload }),

        // get all products
        getAllProducts: (state) => ({ ...state, loading: true, error: null }),
        getAllProductsSuccess: (state, action) => ({
            ...state,
            loading: false,
            products: action.payload,
        }),
        getAllProductsFailure: (state, action) => ({ ...state, loading: false, error: action.payload }),

        reset: () => initialState,
    }
})

export default userSlice;