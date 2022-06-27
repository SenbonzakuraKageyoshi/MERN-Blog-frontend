import React, {useEffect} from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import './css/style.css';

const App = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
