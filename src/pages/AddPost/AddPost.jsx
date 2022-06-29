import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './addPost.css'

const AddPost = () => {
    return (
        <section className="add-post">
            <Sidebar />
            <div className="add-post__content">
                <form>
                    <input type="text" className="form-input" name='title' placeholder='Title'/>
                    <input type="text" className="form-input" name='text' placeholder='Text'/>
                    <button className="send-fom-btn">Add</button>
                </form>
            </div>
        </section>
    );
}

export default AddPost;
