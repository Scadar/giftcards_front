import React, {useEffect} from 'react';
import {useFormik} from "formik";
import './Register.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister} from "../../store/auth/auth";
import {useHistory} from "react-router-dom";

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Это поле обязательно'
    } else if (values.username.length < 4) {
        errors.username = 'Логин должен быть больше 4 символов'
    }

    if (!values.email) {
        errors.email = 'Это поле обязательно'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неверный email адрес'
    }

    if (!values.password) {
        errors.password = 'Это поле обязательно'
    } else if (values.password.length < 5) {
        errors.password = 'Пароль должен быть больше 5 символов'
    }

    if (values.password2 !== values.password) {
        errors.password2 = 'Пароли не совпадают'
    }

    return errors
};

const Register = () => {
    const dispatch = useDispatch()
    const isSuccess = useSelector(state => state.auth.register.isSuccess)
    const loading = useSelector(state => state.auth.register.loading)
    const history = useHistory()
    // const error = useSelector(state => state.auth.error)

    useEffect(() => {
        if(isSuccess){
            history.push('/login?success')
        }
    }, [isSuccess, history])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            password2: '',
            email: '',
        },
        validate,
        onSubmit: values => {
            dispatch(fetchRegister(values))
        },
        initialTouched: false
    })
    return (
        <div className='Register'>
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
                {formik.touched.username && formik.errors.username
                    ?
                    <div className='Register__error'>{formik.errors.username}</div>
                    : null}
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ?
                    <div className='Register__error'>{formik.errors.email}</div> : null}
                <label htmlFor="password">Пароль:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ?
                    <div className='Register__error'>{formik.errors.password}</div> : null}
                <label htmlFor="password">Повторите пароль:</label>
                <input
                    id="password2"
                    name="password2"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password2}
                />
                {formik.touched.password2 && formik.errors.password2 ?
                    <div className='Register__error'>{formik.errors.password2}</div> : null}

                <button disabled={loading} type="submit" className='Register__submit'>Зарегестрироваться</button>
            </form>
        </div>
    )
}

export default Register
