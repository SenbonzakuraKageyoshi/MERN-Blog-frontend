import React, {useEffect} from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchMe } from './redux/auth/auth';
import './css/style.css';

const App = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const fetchUser = async () => {
    const { data } = await dispatch(fetchMe());
    return data;
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Routes>
      <Route path='/' element={!auth.data ? <Home /> : <Profile />} />
      <Route path='/login' element={!auth.data ? <Login /> : <Profile />} />
      <Route path='/signup' element={!auth.data ? <Signup /> : <Profile />}/>
      <Route path='/profile' element={!auth.data ? <Login /> : <Profile />} />
    </Routes>
  );
}

export default App;
