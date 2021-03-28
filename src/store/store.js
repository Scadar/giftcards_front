import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/auth";

const rootReducer = combineReducers({
    auth: authReducer
})

export default configureStore({
    reducer: rootReducer
})
