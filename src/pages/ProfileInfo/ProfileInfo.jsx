import React from 'react';
import { useSelector } from 'react-redux';
import UserImg from '../../images/profile/avatar.png';
import './profile.css';

const ProfileInfo = () => {

    const {data, loading} = useSelector(state => state.auth);

    if(loading === 'loaded' && data !== null){
        return (
            <div className="user-info">
                <img src={UserImg} alt="" className="user-img-big" width={200} height={200}/>
                <h1 className="user-name">{data.name}</h1>
                <h2 className="user-email">{data.email}</h2>
            </div>
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
