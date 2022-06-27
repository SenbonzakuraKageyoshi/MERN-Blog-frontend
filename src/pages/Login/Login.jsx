import React from 'react';
import Form from '../../components/Form/Form';
import { checkAuth } from '../../utils/checkAuth';
import { Navigate } from 'react-router-dom';
import './login.css'

const Login = () => {

    if(checkAuth()){
        return <Navigate to='/' />
    }

    return (
        <section className="login">
            <div className="container">
                <div className="login__content">
                    <h1 className="login-title">Log In</h1>
                    <Form type='login'/>
                </div>
            </div>
        </section>
    );
}

export default Login;
