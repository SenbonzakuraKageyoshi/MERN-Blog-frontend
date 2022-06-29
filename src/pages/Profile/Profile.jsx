import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserImg from '../../images/profile/avatar.png'
import './profile.css';

const Profile = () => {
    return (
        <section className="profile">
            <Sidebar />
            <div className="profile__content">
                <img src={UserImg} alt="" className="user-img-big" width={200} height={200}/>
            </div>
        </section>
    );
}

export default Profile;
