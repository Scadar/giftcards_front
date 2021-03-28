import React from 'react';
import './MainContent.scss'
import Register from "../auth/Register";
import {
    Switch,
    Route
} from "react-router-dom";
import Login from "../auth/Login";
import Home from "../home/Home";

const MainContent = () => {
    return (
        <div className='MainContent'>
            <div className="container">
                <Switch>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/home' component={Home}/>
                </Switch>
            </div>
        </div>
    )
}

export default MainContent
