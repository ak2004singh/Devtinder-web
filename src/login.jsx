import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
const imageList = [
'/assets/1.png',
'/assets/2.png',
'/assets/3.png',
'/assets/4.png',
'/assets/5.png',
'/assets/6.png',
'/assets/7.png',
'/assets/8.png',
'/assets/9.png',
'/assets/10.png',
];

export default function Login() {
  const [mode, setMode] = useState('login');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async()=>{
    try{
      const res = await axios.post('http://localhost:3000/signin',{
        email: email,
        password: password
    },{
      withCredentials: true,
    });
    
    dispatch(addUser(res.data));
      return navigate('/feed');
    }catch(err){
      setError(err?.response?.data||'Something went wrong!');
    }
  }
  const goNext = () => setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  const goPrev = () => setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);

  const sharedInputClasses =
    'mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-blue-400 focus:ring-blue-400';

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium" >Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="email" required className={sharedInputClasses}  />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required className={sharedInputClasses} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-500 border-gray-600 rounded" />
                <span className="ml-2">Remember me</span>
              </label>
              <button type="button" onClick={() => setMode('recover')} className="hover:underline">
                Forgot password?
              </button>
            </div>
            <p className=''>{error}</p>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-semibold"
              onClick={handleLogin}
            >
              Login Karle Bhai 
            </button>
            <p className="text-center text-sm">
              Don’t have an account?{' '}
              <button type="button" onClick={() => setMode('signup')} className="text-blue-400 hover:underline">
                Create one
              </button>
            </p>
          </form>
        );

      case 'recover':
        return (
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="bg-green-500 text-white p-2 rounded">Recovery email sent successfully</div>
            <div>
              <label htmlFor="recovery-email" className="block text-sm font-medium">Email</label>
              <input id="recovery-email" type="email" required className={sharedInputClasses} />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-semibold"
            >
              Recover
            </button>
            <p className="text-center text-sm">
              <button type="button" onClick={() => setMode('login')} className="text-blue-400 hover:underline">
                Back to Login
              </button>
            </p>
          </form>
        );

      case 'signup':
        return (
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input id="name" type="text" required className={sharedInputClasses} />
            </div>
            <div>
              <label htmlFor="email-signup" className="block text-sm font-medium">Email</label>
              <input id="email-signup" type="email" required className={sharedInputClasses} />
            </div>
            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium">Password</label>
              <input id="password-signup" type="password" required className={sharedInputClasses} />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-semibold"
            >
              Sign Up
            </button>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')} className="text-blue-400 hover:underline">
                Login
              </button>
            </p>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left image panel with slideshow */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageList[currentImageIndex]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 opacity-60" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
          <button onClick={goPrev} className="p-2 bg-gray-800 bg-opacity-70 rounded-full">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
          <button onClick={goNext} className="p-2 bg-gray-800 bg-opacity-70 rounded-full">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {imageList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
            />
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gray-800">
        <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold capitalize">
              {mode === 'login'
                ? 'Login to your account'
                : mode === 'recover'
                ? 'Password recovery'
                : 'Signup new account'}
            </h2>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
