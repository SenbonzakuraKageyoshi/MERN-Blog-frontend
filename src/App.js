import React, {useEffect} from 'react';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProfileInfo from './pages/ProfileInfo/ProfileInfo';
import AddPost from './components/AddPost/AddPost';
import Sidebar from './components/Sidebar/Sidebar';
import PostsList from './components/PostsList/PostsList';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchMe } from './redux/auth/auth';
import './css/style.css';

const App = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  console.log(auth)

  const fetchUser = async () => {
    const { data } = await dispatch(fetchMe());
    return data;
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Routes>
      <Route path='/' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Intro /> : 
      <outlet className="outlet">
        <Sidebar/>
        <div className='content-flex'>
        <ProfileInfo />
        </div>
      </outlet>
      } />
      <Route path='/login' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Login /> :
      <outlet className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <ProfileInfo />
      </div>
      </outlet>
      } />
      <Route path='/signup' element={!auth.data && !token || auth.data && "message" in auth.data ? <Signup /> : 
      <outlet className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <ProfileInfo />
      </div>
      </outlet>
      }/>
      <Route path='/profile' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Login /> :
      <outlet className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <ProfileInfo />
      </div>
      </outlet>
      } />
      <Route path='/add-post' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Login /> :
      <outlet className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <AddPost />
      </div>
      </outlet>
      } />
      <Route path='/posts' element={!auth.data && !token || auth.data && "message" in auth.data ? <Login /> :
      <outlet className="outlet">
      <Sidebar/>
      <div className='content'>
      <PostsList />
      </div>
      </outlet>
      } />
    </Routes>
  );
}

export default App;
