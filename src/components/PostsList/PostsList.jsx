import React, {useEffect} from 'react';
import PostsListItem from '../PostsListItem/PostsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/posts/posts';
import './postsList.css';

const PostsList = () => {

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    if(loading === 'loaded' && data !== null){
        return (
            <>
            <h1 className="posts-title">Posts</h1>
            <ul className='posts__list'>
                {data.map((post) => (
                    <PostsListItem key={post._id} title={post.title} text={post.text} createdAt={post.createdAt} author={post.author}/>
                ))}
            </ul>
            </>
        );
    }else{
        return (
            <>
            <h1 className="posts-title">Posts</h1>
            <p>loading</p>
            </>
        );
    }
}

export default PostsList;
