import React from 'react';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/auth/auth';
import { useDispatch } from 'react-redux';
import './profile.css';

const ProfileInfo = () => {

    const {data, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogoutHandler = () => {
        dispatch(logout())
    }

    if(loading === 'loaded' && data !== null){
        return (
            <>
            <div className="user-info">
                <img src={`http://localhost:5000${data.imageUrl}`} alt="" className="user-img-big" width={200} height={200}/>
                <h1 className="user-name">{data.name}</h1>
                <h2 className="user-email">{data.email}</h2>
            </div>
            <button className="logout" onClick={onLogoutHandler}>Logout</button>  
            </>
        );
    }else{
        return (
            <div className="user-info">
                <p>loading</p>
            </div>
        );
    }
}

export default ProfileInfo;
