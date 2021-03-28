import React from 'react';
import './Login.scss'
import {useHistory, Redirect} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../store/auth/auth";

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.login.user)
    const loading = useSelector(state => state.auth.login.loading)
    const error = useSelector(state => state.auth.login.error)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(fetchLogin(values))
        },
        initialTouched: false
    })

    if(user){
        return (
            <Redirect to='/home'/>
        )
    }

    const {search} = history.location
    let isSuccessRegister = false
    if (search.includes('success')) {
        isSuccessRegister = true
    }

    return (
        <>
            {isSuccessRegister &&
            <div className='Login__success'>Успешная регистрация!</div>
            }
            {error &&
            <div className='Login__error'>Неверный логин или пароль</div>
            }
            <div className='Login'>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Логин</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />

                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <button disabled={loading} type="submit" className='Register__submit'>Войти</button>
                </form>
            </div>
        </>

    )
}

export default Login
