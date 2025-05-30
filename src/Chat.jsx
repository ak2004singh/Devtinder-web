import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Chat = () => {
  const { targetId } = useParams();
  console.log(targetId);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center relative overflow-hidden bg-gray-100">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* WhatsApp-like Header with Back Button, Avatar, and Name */}
      <motion.div
        className="w-full max-w-3xl bg-[#0a1a3a] text-white flex items-center p-3 shadow-lg relative z-10 rounded-t-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      >
        <Link to="/connections">
          <motion.button
            className="p-2 text-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        </Link>
        <div className="w-10 h-10 rounded-full overflow-hidden ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="ml-3 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0a1a3a] to-[#ff5733]">
          {targetId}
        </h2>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-b-2xl shadow-lg border border-white/20 flex flex-col h-[70vh] relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Received Message */}
          <motion.div
            className="mb-4 flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative bg-[#e6e6fa] p-3 rounded-lg max-w-xs shadow-md">
              <p className="text-sm text-gray-800">Hey, how's it going?</p>
              <span className="text-xs text-gray-500 mt-1 block">12:30 PM</span>
              {/* Tail for received message */}
              <div className="absolute left-0 top-1 -ml-2 w-3 h-3 bg-[#e6e6fa] transform rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
            </div>
          </motion.div>
          {/* Sent Message */}
          <motion.div
            className="mb-4 flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#f97316] text-white p-3 rounded-lg max-w-xs shadow-md">
              <p className="text-sm">Doing great, thanks for asking!</p>
              <span className="text-xs text-white/80 mt-1 block text-right">12:32 PM</span>
              {/* Tail for sent message */}
              <div className="absolute right-0 top-1 -mr-2 w-3 h-3 bg-gradient-to-r from-[#1e3a8a] to-[#f97316] transform rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
            </div>
          </motion.div>
          {/* Add more message bubbles as needed */}
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-t border-white/20">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ff5733] transition-all"
            />
            <motion.button
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;