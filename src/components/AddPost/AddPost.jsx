import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { fetchAddPost } from '../../redux/posts/posts';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import './addPost.css'

const AddPost = () => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useSelector(state => state.auth);

    let id = null;
    
    if(data){
        id = data._id
    }

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'all' });

    const onSubmit = async () => {
        const data = await dispatch(fetchAddPost({title, text, author: id}));
        if(!data.payload){
            alert('Не удалось войти')
        }else{
            localStorage.setItem('token', data.payload.token)
            navigate('/posts')
        };
        console.log(data)
    }

    return (
        <form className='post-form' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('title', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 4, message: 'Название не может быть более 4х символов'}})} className="form-input" name='title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title}/>
            <div className='error-text'>{errors?.title && <p>{errors.title.message}</p>}</div>
            <textarea type="text" {...register('text', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 4, message: 'Текст не может быть более 4х символов'}, maxLength: {value: 120, message: 'Текст не может быть более 120ти символов'}})} className="form-input text" name='text' placeholder='Text' value={text} onChange={(e) => setText(e.target.value)}/>
            <div className='error-text'>{errors?.text && <p>{errors.text.message}</p>}</div>
            <button className="send-fom-btn">Add post</button>
        </form>
    );
}

export default AddPost;
