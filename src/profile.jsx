import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Userprev from './Userprev';
import axios from 'axios';
import { addUser } from './utils/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user?.user);
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [age,       setAge]       = useState('');
  const [bio,       setBio]       = useState('');
  const [phone,     setPhone]     = useState('');
  const [skills,    setSkills]    = useState([]);
  const [gender,    setGender]    = useState('');
  const [image,     setImage]     = useState('');
  const [location,  setLocation]  = useState('');
  const [project1,  setProject1]  = useState('');
  const [message,   setMessage]   = useState(false);
  const [error,     setError]     = useState('');

  // Load user data on mount
  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setGender(user.gender);
    setBio(user.bio);
    setImage(user.image);
    setLocation(user.location);
    setPhone(user.phone);
    setProject1(user.project1);
    setSkills(user.skills);
  }, [user]);

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(false);
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  if (!user) return null;

  const saveData = async () => {
    try {
      setError('');
      const res = await axios.patch(
        'http://localhost:3000/profile/edit',
        { firstName, lastName, age, bio, phone, skills, gender, image, location, project1 },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setMessage(true);
    } catch (err) {
      setError(err.response?.data || "An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveData();
  };

  return (
    <>
      {/* Toasts */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] w-fit max-w-md animate-pulse">
        {message && (
          <div className="relative px-6 py-4 rounded-xl shadow-lg border border-green-500/50 bg-gradient-to-r from-green-900/50 to-gray-900/50 backdrop-blur-lg text-green-300 flex items-center gap-4">
            <div className="text-2xl animate-bounce">🚀</div>
            <div className="text-sm sm:text-base font-medium">
              <strong>Success!</strong> Your profile has been updated.
            </div>
          </div>
        )}
        {error && (
          <div className="relative px-6 py-4 rounded-xl shadow-lg border border-red-500/50 bg-gradient-to-r from-red-900/50 to-gray-900/50 backdrop-blur-lg text-red-300 flex items-center gap-4">
            <div className="text-2xl animate-pulse">⚠️</div>
            <div className="text-sm sm:text-base font-medium">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}
      </div>

      {/* Main Form */}
      <div className="max-w-6xl mx-auto p-6 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-gray-900 rounded-2xl shadow-2xl animate-fade-in-up min-h-screen">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-orange-500 tracking-wide animate-slide-down">
          Edit Your Profile
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 bg-gray-800/70 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-lg border border-gray-700/50 transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:scale-[1.02] animate-fade-in"
          >
            {/* First + Last Name */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-orange-400 font-medium">First Name</label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-orange-400 font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
                />
              </div>
            </div>

            {/* Age + Gender */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-orange-400 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-orange-400 font-medium">Gender</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Bio, Image, Location, Phone, Project, Skills */}
            <div>
              <label className="block text-orange-400 font-medium">Bio</label>
              <textarea
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-orange-400 font-medium">Profile Image URL</label>
              <input
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-orange-400 font-medium">Location</label>
              <input
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-orange-400 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-orange-400 font-medium">Project</label>
              <input
                name="project1"
                value={project1}
                onChange={(e) => setProject1(e.target.value)}
                className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-orange-400 font-medium">Skills (comma separated)</label>
              <input
                name="skills"
                value={skills}
                onChange={(e) => {
                  const value = e.target.value;
                  setSkills(value.split(',').map(skill => skill.trim()));
                }}
                className="mt-1 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700/50 text-gray-100 focus:bg-gray-600 focus:ring-2 focus:ring-orange-500 transition-all duration-200 hover:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg font-semibold rounded-lg hover:from-orange-600 hover:to-pink-600 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Save Changes
            </button>
          </form>

          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <h3 className="text-2xl font-semibold mb-4 text-orange-400 text-center">Live Preview</h3>
            <Userprev user={{ firstName, lastName, age, gender, bio, location, skills, phone, image, project1 }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;