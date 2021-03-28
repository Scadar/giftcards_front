import {createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        register: {
            isSuccess: null,
            loading: false,
            error: null
        },
        login: {
            user: null,
            loading: false,
            error: null
        }
    },
    reducers: {
        registerStart(state){
            state.register.loading = true
            state.register.isSuccess = null
        },
        registerSuccess(state){
            state.register.loading = false
            state.register.isSuccess = true
        },
        registerError(state, action){
            state.register.loading = false
            state.register.isSuccess = null
            state.register.error = action.payload
        },
        loginStart(state){
            state.login.loading = true
            state.login.user = null
            state.login.error = null
        },
        loginSuccess(state, action){
            state.login.user = action.payload
            state.login.error = null
            state.login.loading = false
        },
        loginError(state, action){
            state.login.error = action.payload
            state.login.loading = false
            state.login.user = null
        },
    }
})

export const fetchRegister = (user) => {
    return async dispatch => {
        dispatch(registerStart())
        try {
            await axiosInstance.post('auth/register', {
                username: user.username,
                email: user.email,
                password: user.password,
                firstName: 'qwe',
                lastName: 'qwe2'
            })
            dispatch(registerSuccess())
        }catch (e) {
            dispatch(registerError(e))
        }
    }
}

export const fetchLogin = (user) => {
    return async dispatch => {
        dispatch(loginStart())
        try{
            const {data} = await axiosInstance.post('auth/login', {
                username: user.username,
                password: user.password
            })
            localStorage.setItem('token', data.token)
            dispatch(loginSuccess(data))
        }catch (e){
            dispatch(loginError(e))
        }
    }
}

export const {registerError,registerStart,registerSuccess,loginError,loginStart,loginSuccess} = authSlice.actions
export default authSlice.reducer
