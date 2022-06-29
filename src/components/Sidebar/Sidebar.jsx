import React from 'react';
import { Link } from 'react-router-dom';
import UserImg from '../../images/profile/avatar.png'
import './sidebar.css'

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <Link to="/profile" className="profile-link">
                <img src={UserImg} alt="" className="user-img" width={40} height={40}/>
                <h1 className="user-name">Mark</h1>
            </Link>
            <nav className="sidebar-nav">
                <ul className="sidebar-nav__list">
                    <li className="sidebar-nav__list-item"> 
                        <Link to="/my-posts" className='sidebar-nav__list-link'>My posts</Link>
                    </li>
                    <li className="sidebar-nav__list-item"> 
                        <Link to="/add-post" className='sidebar-nav__list-link'>Add posts</Link>
                    </li>
                    <li className="sidebar-nav__list-item"> 
                        <Link to="/posts" className='sidebar-nav__list-link'>Posts</Link>
                    </li>
                    <li className="sidebar-nav__list-item"> 
                        <Link to="/liked-posts" className='sidebar-nav__list-link'>Liked posts</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
