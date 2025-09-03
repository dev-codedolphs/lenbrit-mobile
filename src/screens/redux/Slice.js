import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    orders: [],
    selectedOrder: null,
    cart: [],
    categories: null,
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

        // update product
        updateProduct: (state) => ({ ...state, loading: true, error: null }),
        updateProductSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
            products: state.products?.map((item) =>
                item.id === action.payload.id ? action.payload : item
            ),
        }),
        updateProductFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // delete product
        deleteProduct: (state) => ({...state, loading: true, success: false, error: null}),
        deleteProductSuccess: (state, action) => {
            const deletedId = action.payload;
            return {
                ...state,
                success: true,
                products: state.products.filter(product => product.id !== deletedId),
            };
        },
        deleteProductFailure: (state, action) => ({
            error:  action.payload,
            loading: false,
            success: false
        }),

        // Create Order
        createOrder: (state) => ({ ...state, loading: true, error: null }),
        createOrderSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
            orders: [...state.orders, action.payload],
        }),
        createOrderFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Cancel order
        cancelOrder: (state) => ({ ...state, loading: true, error: null }),
        cancelOrderSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
        }),
        cancelOrderFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Get All Orders
        getAllOrders: (state) => ({ ...state, loading: true, error: null }),
        getAllOrdersSuccess: (state, action) => ({
            ...state,
            loading: false,
            orders: action.payload,
        }),
        getAllOrdersFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Get Order By ID
        getOrderById: (state) => ({ ...state, loading: true, error: null }),
        getOrderByIdSuccess: (state, action) => ({
            ...state,
            loading: false,
            selectedOrder: action.payload,
        }),
        getOrderByIdFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // accept offer
        acceptOffer: (state) => ({ ...state, loading: true }),
        acceptOfferSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
        }),
        acceptOfferFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // reject offer
        rejectOffer: (state) => ({ ...state, loading: true }),
        rejectOfferSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
        }),
        rejectOfferFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),

        // Add to Cart
        addToCart: (state) => ({ ...state, loading: true, success: false }),
        addToCartSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
        }),
        addToCartFailure: (state, action) => ({ ...state, loading: false, error: action.payload, success: false }),

        // Get All Cart Items
        getAllCartItems: (state) => ({ ...state, loading: true }),
        getAllCartItemsSuccess: (state, action) => ({
            ...state,
            loading: false,
            cart: action.payload,
        }),
        getAllCartItemsFailure: (state, action) => ({ ...state, loading: false, error: action.payload }),

        // Remove Item
        removeItemFromCart: (state) => ({ ...state, loading: true }),
        removeItemFromCartSuccess: (state, action) => ({
            ...state,
            loading: false,
            success: true,
            cart: state.cart.filter((item) => item.listingId !== action.payload),
        }),
        removeItemFromCartFailure: (state, action) => ({ ...state, loading: false, error: action.payload }),

        // Update Item
        updateItemInCart: (state) => ({ ...state, loading: true }),
        updateItemInCartSuccess: (state, action) => ({
            ...state,
            loading: false,
            cart: state.cart.map((item) =>
                item.id === action.payload.id ? action.payload : item
            ),
        }),
        updateItemInCartFailure: (state, action) => ({ ...state, loading: false, error: action.payload }),

        // get categories
        getAllCategories: (state) => ({ ...state, loading: true }),
        getAllCategoriesSuccess: (state, action) => ({
            ...state,
            loading: false,
            categories: action.payload,
        }),
        getAllCategoriesFailure: (state, action) => ({ ...state, loading: false, error: action.payload }),

        clearSuccess: (state) => ({ ...state, success: false }),
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        reset: () => initialState,
    }
})

export default userSlice;