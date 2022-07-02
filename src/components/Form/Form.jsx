import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux/es/exports';
import { fetchRegister, fetchLogin } from '../../redux/auth/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './form.css'

const Form = ({type}) => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'all' });

    const onRegisterHandler = async () => {
        const data = await dispatch(fetchRegister({name, email, password}));
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

    if(type === 'signup'){
        return (
            <form className='form' onSubmit={handleSubmit(onRegisterHandler)}>
                <input type="text" {...register('Name', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 3, message: 'Имя не может быть менее 3х символов'}, maxLength: {value: 13, message: 'Имя не может быть более 13ти символов'}})} className="form-input" name='Name' placeholder='Nickname' value={name} onChange={(e) => setName(e.target.value)} />
                <div className='error-text'>{errors?.Name && <p>{errors.Name.message}</p>}</div>
                <input type="text" {...register('Email', {required: {value: true, message: 'Поле обязательно к заполнению'}})} className="form-input" name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='error-text'>{errors?.Email && <p>{errors.Email.message}</p>}</div>
                <input type="text" {...register('Password', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 6, message: 'Пароль не может быть менее 6ти символов'}})} className="form-input" name='Password' placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='error-text'>{errors?.Password && <p>{errors.Password.message}</p>}</div>
                <button className="send-form-btn signup" type="submit">Sign Up</button>
                <Link to="/login" className="send-form-btn login" type="submit">Or Log In</Link>
            </form>
        );
    }else{
        return (
            <form className='form' onSubmit={handleSubmit(onLoginHandler)}>
                <input type="text" {...register('Email', {required: {value: true, message: 'Поле обязательно к заполнению'}})} className="form-input" name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='error-text'>{errors?.Email && <p>{errors.Email.message}</p>}</div>
                <input type="text" {...register('Password', {required: {value: true, message: 'Поле обязательно к заполнению'}, minLength: {value: 6, message: 'Пароль не может быть менее 6ти символов'}})} className="form-input" name='Password' placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='error-text'>{errors?.Password && <p>{errors.Password.message}</p>}</div>
                <button className="send-form-btn login" type="submit">Log In</button>
                <Link to="/signup" className="send-form-btn signup" type="submit">Or Sing Up</Link>
            </form>
        );
    }
}

export default Form;
