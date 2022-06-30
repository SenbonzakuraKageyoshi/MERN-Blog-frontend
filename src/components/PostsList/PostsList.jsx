import React, {useEffect} from 'react';
import PostsListItem from '../PostsListItem/PostsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchMyPosts } from '../../redux/posts/posts';
import { useNavigate } from 'react-router-dom';
import './postsList.css';

const PostsList = ({isMyPosts}) => {
    const path = window.location.href;

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.posts);
    const userData = useSelector(state => state.auth.data);
    console.log(data)

    useEffect(() => {
        if(isMyPosts && userData){
            dispatch(fetchMyPosts({id: userData._id}))
        }else if(!isMyPosts){
            dispatch(fetchPosts())
        }else{
            return
        }
    }, [userData, path])

    if(loading === 'loaded' && data !== null && data.length > 0){
        return (
            <>
            <h1 className="posts-title">Posts</h1>
            <ul className='posts__list'>
                {data.map((post) => (
                    <PostsListItem isMyPosts={isMyPosts} key={post._id} id={post._id} title={post.title} views={post.views} text={post.text} createdAt={post.createdAt} author={post.author}/>
                ))}
            </ul>
            </>
        );
    }else if(loading === 'loaded' && data !== null && data.length == 0){
        return (
            <>
            <h1 className="posts-title">Posts</h1>
            <div>Посты не найдены</div>
            </>
        );
    }else if(loading === 'loading'){
        return (
            <>
            <h1 className="posts-title">Posts</h1>
            <p>loading</p>
            </>
        );
    }
}

export default PostsList;
