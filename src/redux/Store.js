import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";
import Sagas from "./Sagas";
const { default: createSagaMiddleware } = require('redux-saga');


const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(SagaMiddleware),
})

SagaMiddleware.run(Sagas);
export default store;