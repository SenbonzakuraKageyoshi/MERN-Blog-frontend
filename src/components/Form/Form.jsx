import React, {useState} from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { fetchRegister, fetchLogin } from '../../redux/auth/auth';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './form.css'

const Form = ({type}) => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onRegisterHandler = async (e) => {
        e.preventDefault();

        const data = await dispatch(fetchRegister({name, email, password}));
        if(!data.payload){
            alert('Не удалось зарегистрироваться')
        }else{
            localStorage.setItem('token', data.payload.token)
            navigate('/')
        };
        console.log(data)
    }

    const onLoginHandler = async (e) => {
        e.preventDefault();

        const data = await dispatch(fetchLogin({email, password}));
        if(!data.payload){
            alert('Не удалось войти')
        }else{
            localStorage.setItem('token', data.payload.token)
            navigate('/')
        };
        console.log(data)
    }

    if(type === 'signup'){
        return (
            <form className='form' onSubmit={(e) => onRegisterHandler(e)}>
                <input type="text" className="form-input" name='Name' placeholder='Nickname' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="form-input" name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" className="form-input" name='Password' placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="send-form-btn signup" type="submit">Sign Up</button>
            </form>
        );
    }else{
        return (
            <form className='form' onSubmit={(e) => onLoginHandler(e)}>
                <input type="text" className="form-input" name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" className="form-input" name='Password' placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="send-form-btn login" type="submit">Log In</button>
            </form>
        );
    }
}

export default Form;
