// Body.jsx
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice';

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData && userData.user) return;
    try {
      const res = await axios.get('http://localhost:3000/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* push content below fixed navbar (4rem = pt-16) */}
      <main className="flex-grow container mx-auto px-4 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
