import React from 'react';
import './Navbar.scss'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='Navbar'>
            <div className='Navbar__logo'>Gift cards</div>
            <div className='Navbar__links'>
                <NavLink to='/login'>Логин</NavLink>
                <NavLink to='/register'>Регистрация</NavLink>
            </div>
        </div>
    )
}

export default Navbar
