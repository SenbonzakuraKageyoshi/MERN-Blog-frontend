import React from 'react';
import LinkBtn from '../../components/LinkBtn/LinkBtn';
import Users from '../../../src/images/icons/users.svg';    
import Blog from '../../../src/images/icons/blog.svg';
import './intro.css'

const Intro = () => {
    return (
        <section className='homepage'>
            <div className="container">
                <div className="homepage__content">
                    <div className="homepage__intro-title">
                        <img src={Users} alt="" className="users-icon" width={95} height={95}/>
                        <h1 className="homepage-title">Welcome to MERN-Blog</h1>
                        <img src={Blog} alt="" className="blog-icon" width={95} height={95}/>
                    </div>
                    <p className="homepage-text">To start reading interesting blogs, you should choose one of the actions:</p>
                    <div className="actions">
                        <LinkBtn to='/login' name="Log In" type='login'></LinkBtn>
                        <LinkBtn to='/signup' name="Sing Up" type='signup'></LinkBtn>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Intro;
