import React, {useState, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { fetchAddPost } from '../../redux/posts/posts';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addPost.css'

const AddPost = () => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const inputFileRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useSelector(state => state.auth);

    let id = null;
    
    if(data){
        id = data._id
    }

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'all' });

    const onSubmit = async () => {
        const data = await dispatch(fetchAddPost({title, text, author: id, imageUrl}));
        if(!data.payload){
            alert('Не удалось войти')
        }else{
            navigate('/posts')
        };
        console.log(data)
    }

    const handleChangeFile = async (event) => {
        try{
          const formData = new FormData();
          const file = event.target.files[0];
          formData.append('image', file); 
          const { data } = await axios.post('http://localhost:5000/upload', formData);
          console.log(data.url);
          setImageUrl(data.url);
        }catch(err){
          console.log(err)
          alert('Ошибка при получении файла')
        }
      };

    const onClickRemoveImage =  () => {
        try {
            axios.post('http://localhost:5000/upload/delete', {imageUrl})
            setImageUrl(null);
        } catch (error) {
            alert('Ошибка при удалении файла')
        }
    };

    return (
        <form className='post-form' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('title', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 4, message: 'Название не может быть более 4х символов'}})} className="form-input" name='title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title}/>
            <div className='error-text'>{errors?.title && <p>{errors.title.message}</p>}</div>
            <textarea type="text" {...register('text', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 4, message: 'Текст не может быть более 4х символов'}, maxLength: {value: 120, message: 'Текст не может быть более 120ти символов'}})} className="form-input text" name='text' placeholder='Text' value={text} onChange={(e) => setText(e.target.value)}/>
            <div className='error-text'>{errors?.text && <p>{errors.text.message}</p>}</div>
            {imageUrl ? null : <button onClick={() => inputFileRef.current.click()} type="button">Загрузить изображение</button>}
            <input type="file" onChange={handleChangeFile} hidden ref={inputFileRef}/>
            {imageUrl && (
                <>
                <button onClick={onClickRemoveImage}>Удалить</button>
                <img className='uploaded-img' src={`http://localhost:5000${imageUrl}`} alt="Uploaded" width={200} height={200}/>
                </>
            )}
            <button className="send-fom-btn" type="submit">Add post</button>
        </form>
    );
}

export default AddPost;
