import React from 'react'
import Userprev from './Userprev'
import { useSelector } from 'react-redux'
import { Store } from 'lucide-react'
const Profile = () => {
    const user = useSelector((store)=>store.user).user;
    console.log(user);
    if(!user)
        return ;
  return (
   <div>
     <div>profile</div>
     <Userprev user = {user}/>
   </div>
  )
}

export default Profile