import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/posts/posts';
import axios from 'axios';
import deleteIcon from '../../images/icons/delete.svg';
import './postsListItem.css';

const PostsListItem = ({id, title, text, createdAt, author, views, isMyPosts, imageUrl}) => {
    
    const dispatch = useDispatch();
    const onDeleteHanlder = () => {
        axios.post('http://localhost:5000/posts/delete', {id}).then(dispatch(deletePost(id)));
        axios.post('http://localhost:5000/upload/delete', {imageUrl});
    };  

    return (
        <li className="posts__list-item">
            <div className="post-img">
            <img src={`http://localhost:5000${imageUrl}`} alt="" className="post-preview" />
            </div>
            <Link to={`/posts/${id}`} className="posts__list-item-title">{title}</Link>
            <p className="posts__list-item-text">{text}</p>
            <div className="posts__list-item__info">
                <div className="posts__list-item-author">Author: {author.name}</div>
                <div className="posts__list-item-date">Date: {createdAt}</div>
            </div>
            <div className="post-stats">
                <div className="views">Views: {views}</div>
            </div>
            {isMyPosts
            ?
            <div className="post-actions">
                <button className="delete-post" onClick={onDeleteHanlder}>
                    <img src={deleteIcon} alt="" className="delete-icon" />
                </button>
            </div>
            :
            null
            }
        </li>
    );
}

export default PostsListItem;
