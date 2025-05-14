import React from 'react';
import Userprev from './Userprev';
import { useSelector } from 'react-redux';

const Profile = () => {
  // 1) hooks always at top
  const userSlice = useSelector((store) => store.user);

  // 2) early‐exit if no slice or no user
  if (!userSlice || !userSlice.user) {
    return null;
  }

  const user = userSlice.user;
  return (
    <div>
      <div>profile</div>
      <Userprev user={user} />
    </div>
  );
};

export default Profile;
