import React from 'react';
import { Link } from 'react-router-dom';
import UserImg from '../../images/profile/avatar.png';
import { useSelector } from 'react-redux';
import './sidebar.css'

const Sidebar = () => {

    const {data, loading} = useSelector(state => state.auth);

    if(loading === 'loaded' && data !== null){
        return (
            <aside className="sidebar">
                <Link to="/profile" className="profile-link">
                    <img src={`http://localhost:5000${data.imageUrl}`} alt="" className="user-img" width={40} height={40}/>
                    <h1 className="user-name">{data.name}</h1>
                </Link>
                <nav className="sidebar-nav">
                    <ul className="sidebar-nav__list">
                        <li className="sidebar-nav__list-item"> 
                            <Link to="/posts" className='sidebar-nav__list-link'>Posts</Link>
                        </li>
                        <li className="sidebar-nav__list-item"> 
                            <Link to="/my-posts" className='sidebar-nav__list-link'>My posts</Link>
                        </li>
                        <li className="sidebar-nav__list-item"> 
                            <Link to="/add-post" className='sidebar-nav__list-link'>Add posts</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        );
    }else{
        return (
            <aside className="sidebar">
                <p>loading</p>
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
}

export default Sidebar;
