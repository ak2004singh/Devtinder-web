import React from 'react';
import { FaMapMarkerAlt, FaVenusMars, FaHeart, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserCard = ({ user, onLike, onIgnore }) => {
  return (
    <div className="w-[420px] bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
      
      {/* User Image */}
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-full h-72 object-cover rounded-t-3xl"
      />

      {/* Content */}
      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Name & Age */}
        <h2 className="text-3xl font-extrabold text-gray-900">
          {user.firstName} <span className="capitalize">{user.lastName}</span>, 
          <span className="text-blue-600 font-bold"> {user.age}</span>
        </h2>

        {/* Bio */}
        <p className="text-gray-600 italic">{user.bio}</p>

        {/* Location & Gender */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-pink-500" />
            {user.location}
          </span>
          <span className="flex items-center gap-1">
            <FaVenusMars className="text-blue-400" />
            {user.gender}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {user.skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center px-6 pb-5 mt-auto gap-4">
        <button
          onClick={onIgnore}
          className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
        >
          <motion.div whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 300 }}>
            <FaTimes className="text-sm" />
          </motion.div>
          Ignore
        </button>

        <button
          onClick={onLike}
          className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
        >
          <motion.div whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 300 }}>
            <FaHeart className="text-sm" />
          </motion.div>
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
