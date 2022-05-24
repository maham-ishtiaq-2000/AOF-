import React from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';

const LandingScreenforCheck = () => {
    const Login = localStorage.getItem('Login')
    if (Login === "true") {
        return (<React.Fragment>
            <Sidebar />
        </React.Fragment>)
    }
    else {
        return (
            <React.Fragment>
                {localStorage.clear()}
                <Redirect to="/login" />
            </React.Fragment>
            )
    }
}

export default LandingScreenforCheck;