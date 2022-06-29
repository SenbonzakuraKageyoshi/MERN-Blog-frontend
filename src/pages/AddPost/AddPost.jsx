import React from 'react';
import './addPost.css'

const AddPost = () => {
    return (
        <form className='post-form'>
            <input type="text" className="form-input" name='title' placeholder='Title'/>
            <input type="text" className="form-input" name='text' placeholder='Text'/>
            <button className="send-fom-btn">Add</button>
        </form>
    );
}

export default AddPost;
