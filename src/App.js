import React, {useEffect} from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import AddPost from './pages/AddPost/AddPost';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchMe } from './redux/auth/auth';
import './css/style.css';

const App = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  const fetchUser = async () => {
    const { data } = await dispatch(fetchMe());
    return data;
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Routes>
      <Route path='/' element={!auth.data && !token ? <Home /> : <Profile />} />
      <Route path='/login' element={!auth.data && !token ? <Login /> : <Profile />} />
      <Route path='/signup' element={!auth.data && !token ? <Signup /> : <Profile />}/>
      <Route path='/profile' element={!auth.data && !token ? <Login /> : <Profile />} />
      <Route path='/add-post' element={!auth.data && !token ? <Login /> : <AddPost />} />
    </Routes>
  );
}

export default App;
