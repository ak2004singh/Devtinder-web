import React from 'react';
import { FaMapMarkerAlt, FaVenusMars, FaTimes, FaHeart } from 'react-icons/fa';

const Userprev = ({ user }) => {
  return (
    <div className="w-[420px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
      {/* User Image */}
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-full h-72 object-cover"
      />

      {/* User Info */}
      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Name & Age */}
        <h2 className="text-3xl font-extrabold text-gray-900">
          {user.firstName}{' '}
          <span className="capitalize">{user.lastName}</span>,{' '}
          <span className="text-blue-600 font-bold">{user.age}</span>
        </h2>

        {/* Bio */}
        <p className="text-gray-600 italic">{user.bio}</p>

        {/* Location & Gender */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-pink-500" />
            {user.location}
          </span>
          <span className="flex items-center gap-1 capitalize">
            <FaVenusMars className="text-blue-400" />
            {user.gender}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(user.skills || []).map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Static Buttons */}
      <div className="flex justify-between items-center px-6 pb-5 gap-4 mt-auto">
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow">
          <FaTimes />
          Ignore
        </button>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow">
          <FaHeart />
          Interested
        </button>
      </div>
    </div>
  );
};

export default Userprev;
