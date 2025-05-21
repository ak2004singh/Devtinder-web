import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from './utils/requestSlice';
import { motion } from 'framer-motion';

const Requests = () => {
  const dispatch = useDispatch();
  const peopleInStore = useSelector(store => store.request) ;
  const [localPeople, setLocalPeople] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.requests));
      setLocalPeople(res.data.requests);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect( () => {
    if (!peopleInStore) {
      fetchRequests();      
    } else {
      setLocalPeople(peopleInStore);
    }
  }, []);
  useEffect(()=>{
          setLocalPeople(peopleInStore);
  },[peopleInStore]);
  const handleReview = async (id, status) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      const ak = prev => prev.filter(person => person._id !== id);
      dispatch(removeRequest());
      dispatch(addRequest(ak));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
    }
  };
   if(!localPeople)
    return null;
  return (
    <div className="p-6 min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Heading */}
      <motion.h1
        className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#0a1a3a] to-[#ff5733] tracking-tight drop-shadow-md relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 120 }}
      >
        Incoming Requests
      </motion.h1>

      {/* Success or Error Message */}
      {message && <div className="text-green-400 mb-4 z-10">{message}</div>}
      {error && <div className="text-red-400 mb-4 z-10">{error}</div>}

      <div className="space-y-6 w-full max-w-3xl relative z-10">
        {Array.isArray(localPeople) && localPeople.length === 0 ? (
          <motion.p className="text-white text-center text-lg mt-10 opacity-70">
            🎉 No pending connection requests!
          </motion.p>
        ) : (
          localPeople.map((person, index) => (
            <motion.div
              key={person._id}
              className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden h-32 transition-all duration-300 border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 30px rgba(255, 87, 51, 0.3)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="w-24 h-full flex-shrink-0">
                <img
                  src={person.image}
                  alt={`${person.firstName} avatar`}
                  className="w-full h-full object-cover rounded-l-2xl"
                />
              </div>

              <div className="flex-1 px-5 py-3 flex items-center">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {person.firstName} {person.lastName},{' '}
                        <span className="text-[#ff5733]">{person.age}</span>
                      </h2>
                      <p className="text-sm text-gray-300 mt-1">{person.location}</p>
                      <p className="mt-2 text-gray-200 text-sm line-clamp-1">{person.bio}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {person.skills.map(skill => (
                          <motion.span
                            key={skill}
                            className="text-xs font-medium bg-[#ff5733]/20 text-[#ff5733] px-2 py-0.5 rounded-full"
                            whileHover={{ scale: 1.1, backgroundColor: '#ff5733', color: '#fff' }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <motion.button
                        onClick={() => handleReview(person._id, 'accepted')}
                        className="px-4 py-1 rounded-lg bg-green-500 text-white font-medium text-sm hover:bg-green-600 hover:scale-105 transform transition"
                        whileTap={{ scale: 0.9 }}
                      >
                        Accept
                      </motion.button>
                      <motion.button
                        onClick={() => handleReview(person._id, 'rejected')}
                        className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium text-sm hover:bg-red-600 hover:scale-105 transform transition"
                        whileTap={{ scale: 0.9 }}
                      >
                        Reject
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
