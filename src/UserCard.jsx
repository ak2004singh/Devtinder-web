import React from 'react'; 
import { FaMapMarkerAlt, FaVenusMars, FaHeart, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserCard = ({ user, onLike, onIgnore }) => {
  return (
    <div className="w-[420px] bg-gray-800/80 rounded-2xl shadow-xl overflow-hidden flex flex-col backdrop-blur-lg border border-gray-700/50 transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
      
      {/* User Image */}
      {user.image && user.image.trim() !== '' && (
        <div className="relative">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-64 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <h2 className="absolute bottom-4 left-4 text-3xl font-extrabold text-white">
            {user.firstName}{' '}
            <span className="capitalize">{user.lastName}</span>,{' '}
            <span className="text-orange-500 font-bold">{user.age}</span>
          </h2>
        </div>
      )}

      {/* Content */}
      <div className="px-6 py-4 flex flex-col gap-3">
        {/* Bio */}
        <p className="text-gray-300 text-sm italic">{user.bio}</p>

        {/* Location & Gender */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-orange-500" />
            {user.location}
          </span>
          <span className="flex items-center gap-1 capitalize">
            <FaVenusMars className="text-orange-500" />
            {user.gender}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(user.skills || []).map((skill, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md transform hover:scale-110 transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center px-6 pb-5 gap-4 mt-auto">
        <button
          onClick={onIgnore}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transform hover:scale-110 transition-all duration-200"
        >
          <motion.div whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 300 }}>
            <FaTimes />
          </motion.div>
          Ignore
        </button>
        <button
          onClick={onLike}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transform hover:scale-110 transition-all duration-200"
        >
          <motion.div whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 300 }}>
            <FaHeart />
          </motion.div>
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
