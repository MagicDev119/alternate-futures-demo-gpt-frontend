import { configureStore } from '@reduxjs/toolkit'
import visionReducer from './visionSlice';
import authReducer from "./authSlice";

const reducer = {
    vision: visionReducer,
    auth: authReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export { store }