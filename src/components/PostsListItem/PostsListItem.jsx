import React from 'react';
import './postsListItem.css';

const PostsListItem = ({title, text, createdAt, author}) => {
    return (
        <li className="posts__list-item">
            <h1 className="posts__list-item-title">{title}</h1>
            <p className="posts__list-item-text">{text}</p>
            <div className="posts__list-item__info">
                <div className="posts__list-item-author">{author.name}</div>
                <div className="posts__list-item-date">{createdAt}</div>
            </div>
        </li>
    );
}

export default PostsListItem;
