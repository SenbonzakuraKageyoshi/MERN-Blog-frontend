import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { checkAuth } from '../../utils/checkAuth';
import { Navigate } from 'react-router-dom';
import Back from '../../images/icons/back.svg'
import './login.css'

const Login = () => {

    if(checkAuth()){
        return <Navigate to='/profile' />
    }

    return (
        <section className="login">
            <div className="container">
                <div className="login__content">
                    <h1 className="login-title">Log In</h1>
                    <Link to="/" className="back-link"></Link>
                    <Form type='login'/>
                </div>
            </div>
        </section>
    );
}

export default Login;
