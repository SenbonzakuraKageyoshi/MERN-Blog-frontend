import React, {useEffect} from 'react';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProfileInfo from './pages/ProfileInfo/ProfileInfo';
import AddPost from './components/AddPost/AddPost';
import Sidebar from './components/Sidebar/Sidebar';
import PostsList from './components/PostsList/PostsList';
import FullPost from './components/FullPost/FullPost';
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
      <Route path='/' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Intro /> : 
      <div className="outlet">
        <Sidebar/>
        <div className='content-flex'>
        <ProfileInfo />
        </div>
      </div>
      } />
      <Route path='/login' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Login /> :
      <div className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <ProfileInfo />
      </div>
      </div>
      } />
      <Route path='/signup' element={!auth.data && !token || auth.data && "message" in auth.data ? <Signup /> : 
      <div className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <ProfileInfo />
      </div>
      </div>
      }/>
      <Route path='/profile' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Login /> :
      <div className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <ProfileInfo />
      </div>
      </div>
      } />
      <Route path='/add-post' element={!auth.data && !token || auth.data && "message" in auth.data  ? <Login /> :
      <div className="outlet">
      <Sidebar/>
      <div className='content-flex'>
      <AddPost />
      </div>
      </div>
      } />
      <Route path='/posts' element={!auth.data && !token || auth.data && "message" in auth.data ? <Login /> :
      <div className="outlet">
      <Sidebar/>
      <div className='content'>
      <PostsList isMyPosts={false}/>
      </div>
      </div>
      } />
      <Route path='/posts/:id' element={!auth.data && !token || auth.data && "message" in auth.data ? <Login /> :
      <div className="outlet">
      <Sidebar/>
      <div className='content-center'>
      <FullPost />
      </div>
      </div>
      } />
      <Route path='/my-posts' element={!auth.data && !token || auth.data && "message" in auth.data ? <Login /> :
      <div className="outlet">
      <Sidebar/>
      <div className='content'>
      <PostsList isMyPosts={true} />
      </div>
      </div>
      } />
    </Routes>
  );
}

export default App;
