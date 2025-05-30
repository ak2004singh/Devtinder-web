import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from './utils/connectionSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const Connections = () => {
  const dispatch = useDispatch();
  const people = useSelector(store => store.connection) || [];
  const [error, setError] = useState('');

  const connectedPeople = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", { withCredentials: true });
      dispatch(addConnection(res.data.connections));
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => { connectedPeople();
  }, []);
  /// ui of the page 
  {if (error) return <div className="text-red-500 mt-4">Error: {error}</div>;

  return (
  <div className="p-6 min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Modern Heading with Non-Purple Gradient */}
      <motion.h1
        className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#0a1a3a] to-[#ff5733] tracking-tight drop-shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 120 }}
      >
        Your Connections
      </motion.h1>

      <div className="space-y-6 w-full max-w-3xl relative z-10">
        {people.map((person, index) => (
          <motion.div
            key={person._id}
            className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden h-32 transition-all duration-300 border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(255, 87, 51, 0.3)',
              transition: { duration: 0.3 },
            }}
          >
            {/* Avatar */}
            <motion.div
              className="w-24 h-full flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={person.image}
                alt={`${person.firstName} avatar`}
                className="w-full h-full object-cover rounded-l-2xl"
              />
            </motion.div>

            {/* Info */}
            <div className="flex-1 px-5 py-3 flex items-center">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {person.firstName} {person.lastName},{' '}
                      <span className="text-[#ff5733]">{person.age}</span>
                    </h2>
                    <p className="text-sm text-gray-300 mt-1">{person.location}</p>
                    <p className="mt-2 text-gray-200 text-sm line-clamp-1">
                      {person.bio}
                    </p>
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
                  <div className="flex flex-col items-center gap-2 pr-2">
                    {/* Chat Icon with Non-Purple Gradient */}
                    <Link to={`/chat/${person._id}`}><motion.button
                      className="p-3 bg-gradient-to-r from-[#0a1a3a] to-[#ff5733] text-white rounded-full"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9, rotate: -5 }}
                      animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.914L3 20l1.167-4.58A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </motion.button></Link>
                    {/* Disconnect Button (Visible on Hover) */}
                    <motion.button
                      onClick={() => console.log('Disconnect', person._id)}
                      className="p-1 text-red-400 rounded-full opacity-0"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0 }}
                      transition={{ opacity: { duration: 0.2 } }}
                      style={{ opacity: 0 }}
                      onHoverStart={e => e.target.style.opacity = 1}
                      onHoverEnd={e => e.target.style.opacity = 0}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
}
export default Connections;