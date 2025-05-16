import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { useDispatch ,useSelector} from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { addUser } from './utils/userSlice'
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if(userData)
    {
      return ;
    }
    try {
      const res = await axios.get("http://localhost:3000/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    }
    catch(err)
    {
      if(err.status === 401)
      {
        navigate('/login');
      }
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body