import React from 'react';
import Form from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import { checkAuth } from '../../utils/checkAuth';
import { Navigate } from 'react-router-dom';
import './signup.css'

const Signup = () => {

    if(checkAuth()){
        return <Navigate to='/profile' />
    }

    return (
        <section className="signup">
            <div className="container">
                <div className="signup__content">
                    <h1 className="signup-title">Sign Up</h1>
                    <Link to="/" className="back-link"></Link>
                    <Form type='signup'/>
                </div>
            </div>
        </section>
    );
}

export default Signup;
