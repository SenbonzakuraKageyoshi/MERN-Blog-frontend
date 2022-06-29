import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserImg from '../../images/profile/avatar.png';
import './profile.css';

const Profile = () => {

    const {data, loading} = useSelector(state => state.auth);

    if(loading === 'loaded' && data !== null){
        return (
            <section className="profile">
                <Sidebar /> 
                <div className="profile__content">
                    <div className="user-info">
                        <img src={UserImg} alt="" className="user-img-big" width={200} height={200}/>
                        <h1 className="user-name">{data.name}</h1>
                        <h2 className="user-email">{data.email}</h2>
                    </div>
                </div>
            </section>
        );
    }else{
        return (
            <section className="profile">
                <Sidebar />
                <div className="profile__content">
                    <p>loading</p>
                </div>
            </section>
        );
    }
}

export default Profile;
