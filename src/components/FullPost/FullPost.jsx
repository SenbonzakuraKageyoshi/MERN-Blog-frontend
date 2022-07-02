import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './fullPost.css'

const FullPost = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`).then(({data}) => setPost(data))
    }, [])

    if(post){
        return (
            <div className="post">
                {post.imageUrl
                ? 
                <div className="post-img">
                    <img src={`http://localhost:5000${post.imageUrl}`} alt="" className="post-preview" />
                </div>
                :
                null
                }
                <h1 className="posts__list-item-title">{post.title}</h1>
                <p className="posts__list-item-text">{post.text}</p>
                <div className="posts__list-item__info">
                    <div className="posts__list-item-author">{post.author.name}</div>
                    <div className="posts__list-item-date">{post.createdAt}</div>
                </div>
                <div className="post-stats">
                    <div className="views">{post.views}</div>
                </div>
            </div>
        );
    }else{
        <p>loading</p>
    }
}

export default FullPost;
