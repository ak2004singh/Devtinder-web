import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from './utils/userSlice';
import { removeFeed } from './utils/feedSlice';
import { removeConnection } from './utils/connectionSlice';
import { removeRequest } from './utils/requestSlice';
import toast, { Toaster } from 'react-hot-toast';

const NavBar = () => {
  const user = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnection());
      dispatch(removeRequest());
      toast.success("Logged out successfully!");
      navigate('/login');
    } catch (err) {
      toast.error("Logout failed.");
      console.error(err);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="navbar bg-gray-900/80 text-white backdrop-blur-md border-b border-gray-700 shadow-md px-4 z-30 relative">
        {/* Left - Logo */}
        <div className="flex-1">
          <Link to="/feed" className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
            🚀 CollabOne
          </Link>
        </div>

        {/* Right - Desktop */}
        <div className="hidden md:flex items-center gap-4 z-50 relative">
          <Link to="/profile" className="text-orange-400 font-medium tracking-wide hover:underline hover:text-orange-300 transition">
            {user.firstName} {user.lastName}
          </Link>
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar transition-transform hover:scale-105">
              <div className="w-10 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
                <img alt="avatar" src={user.image} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-800/90 text-white rounded-xl mt-3 w-52 shadow-lg border border-gray-700 backdrop-blur z-[60]">
              <li><Link to="/profile" className="hover:bg-orange-500/20">Profile</Link></li>
              <li><Link to="/connections" className="hover:bg-orange-500/20">Connections</Link></li>
              <li><Link to="/requests" className="hover:bg-orange-500/20">Requests</Link></li>
              <li><button onClick={handleLogout} className="hover:bg-red-500/20 text-red-300">Logout</button></li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost text-orange-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 text-white p-4 border-t border-gray-700 space-y-3 z-40 relative">
          <div className="text-orange-400 font-semibold text-lg">
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              {user.firstName} {user.lastName}
            </Link>
          </div>
          <Link to="/profile" className="block hover:text-orange-300" onClick={() => setMenuOpen(false)}>Profile</Link>
          <Link to="/connections" className="block hover:text-orange-300" onClick={() => setMenuOpen(false)}>Connections</Link>
          <Link to="/requests" className="block hover:text-orange-300" onClick={() => setMenuOpen(false)}>Requests</Link>
          <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="block text-red-300 hover:text-red-500">Logout</button>
        </div>
      )}
    </>
  );
};

export default NavBar;
