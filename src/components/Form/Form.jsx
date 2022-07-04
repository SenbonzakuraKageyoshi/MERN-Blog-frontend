import React, {useState, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux/es/exports';
import { fetchRegister, fetchLogin } from '../../redux/auth/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.css'

const Form = ({type}) => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const inputFileRef = useRef(null);

    const dispatch = useDispatch();

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'all' });

    const onRegisterHandler = async () => {
        const data = await dispatch(fetchRegister({name, email, password, imageUrl}));
        if(!data.payload){
            alert('Не удалось зарегистрироваться')
        }else{
            localStorage.setItem('token', data.payload.token)
            navigate('/')
        };
    }

    const onLoginHandler = async () => {
        const data = await dispatch(fetchLogin({email, password}));
        if(!data.payload || data.payload.message === 'Пользователь не найден'){
            alert('Не удалось войти');
            return;
        }else{
            localStorage.setItem('token', data.payload.token)
            navigate('/')
        };
    }

    const handleChangeFile = async (event) => {
        try{
          const formData = new FormData();
          const file = event.target.files[0];
          formData.append('image', file); 
          const { data } = await axios.post('http://localhost:5000/upload', formData);
          setImageUrl(data.url);
        }catch(err){
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

    if(type === 'signup'){
        return (
            <>
            <form className='form' onSubmit={handleSubmit(onRegisterHandler)}>
                <input type="text" {...register('Name', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 3, message: 'Имя не может быть менее 3х символов'}, maxLength: {value: 13, message: 'Имя не может быть более 13ти символов'}})} className="form-input" name='Name' placeholder='Nickname' value={name} onChange={(e) => setName(e.target.value)} />
                <div className='error-text'>{errors?.Name && <p>{errors.Name.message}</p>}</div>
                <input type="text" {...register('Email', {required: {value: true, message: 'Поле обязательно к заполнению'}})} className="form-input" name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='error-text'>{errors?.Email && <p>{errors.Email.message}</p>}</div>
                <input type="password" {...register('Password', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 6, message: 'Пароль не может быть менее 6ти символов'}})} className="form-input" name='Password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='error-text'>{errors?.Password && <p>{errors.Password.message}</p>}</div>
                {imageUrl ? null : <button onClick={() => inputFileRef.current.click()} type="button" className='form-add-img'>Загрузить изображение</button>}
                <input type="file" onChange={handleChangeFile} hidden ref={inputFileRef}/>
                {imageUrl && (
                    <>
                    <button onClick={onClickRemoveImage} className="form-remove-img">Удалить</button>
                    <img className='uploaded-img' src={`http://localhost:5000${imageUrl}`} alt="Uploaded" width={200} height={200}/>
                    </>
                )}
                <button className="send-form-btn signup" type="submit">Sign Up</button>
                <Link to="/login" className="send-form-btn login" type="submit">Or Log In</Link>
            </form>
            </>
        );
    }else{
        return (
            <form className='form' onSubmit={handleSubmit(onLoginHandler)}>
                <input type="text" {...register('Email', {required: {value: true, message: 'Поле обязательно к заполнению'}})} className="form-input" name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='error-text'>{errors?.Email && <p>{errors.Email.message}</p>}</div>
                <input type="password" {...register('Password', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 6, message: 'Пароль не может быть менее 6ти символов'}})} className="form-input" name='Password' placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='error-text'>{errors?.Password && <p>{errors.Password.message}</p>}</div>
                <button className="send-form-btn login" type="submit">Log In</button>
                <Link to="/signup" className="send-form-btn signup" type="submit">Or Sing Up</Link>
            </form>
        );
    }
}

export default Form;
