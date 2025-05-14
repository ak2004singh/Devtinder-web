import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Userprev from './Userprev';

const Profile = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((store) => store.user);
  const user = userSlice && userSlice.user ? userSlice.user : null;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '11',
    gender: '',
    bio: '',
    image: '',
    location: '',
    phone: '',
    project1: '',
    skills: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.age > 10 ? user.age : '11',
        gender: user.gender || '',
        bio: user.bio || '',
        image: user.image || '',
        location: user.location || '',
        phone: user.phone || '',
        project1: typeof user.project1 === 'string' ? user.project1 : '',
        skills: user.skills ? user.skills.join(', ') : '',
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      const newAge = parseInt(value);
      if (isNaN(newAge) || newAge < 10) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (parseInt(formData.age) <= 10) {
      newErrors.age = 'Age must be greater than 10';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Place your update logic here
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl shadow-2xl animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-tight animate-slide-down">
        Edit Your Profile
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-10">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-xl space-y-6 transition-all duration-300 ease-in-out transform hover:scale-[1.01] animate-fade-in"
        >
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-purple-800 font-semibold">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-purple-800 font-semibold">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-purple-800 font-semibold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`mt-1 w-full border ${errors.age ? 'border-red-500' : 'border-purple-300'} rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400`}
              />
              {errors.age && <div className="text-red-500 text-sm mt-1">{errors.age}</div>}
            </div>
            <div className="flex-1">
              <label className="block text-purple-800 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Profile Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Project</label>
            <input
              name="project1"
              value={formData.project1}
              onChange={handleChange}
              className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Skills (comma separated)</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 w-full border border-purple-300 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 focus:bg-white focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 shadow-xl"
          >
            Save Changes
          </button>
        </form>

        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Live Preview</h3>
          <Userprev
            user={{
              ...user,
              ...formData,
              project1: formData.project1,
              skills: formData.skills.split(',').map((s) => s.trim()),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
