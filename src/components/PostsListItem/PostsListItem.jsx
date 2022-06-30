import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './postsListItem.css';

const PostsListItem = ({id, title, text, createdAt, author, views, isMyPosts}) => {
    
    const onDeleteHanlder = () => {
        axios.post('http://localhost:5000/posts/delete', {id});
    }

    return (
        <li className="posts__list-item">
            <Link to={`/posts/${id}`} className="posts__list-item-title">{title}</Link>
            <p className="posts__list-item-text">{text}</p>
            <div className="posts__list-item__info">
                <div className="posts__list-item-author">{author.name}</div>
                <div className="posts__list-item-date">{createdAt}</div>
            </div>
            <div className="post-stats">
                <div className="views">{views}</div>
            </div>
            {isMyPosts
            ?
            <div className="post-actions">
                <button className="delete-post" onClick={onDeleteHanlder}>del</button>
            </div>
            :
            null
            }
        </li>
    );
}

export default PostsListItem;
