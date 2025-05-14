import axios from 'axios';
import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Link , useNavigate} from 'react-router-dom';
import { removeUser } from './utils/userSlice';

const NavBar = () => {
    const user = useSelector((store)=>store.user).user;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async ()=>{
        try{
            const res = await axios.post("http://localhost:3000/logout",{}, {withCredentials: true});
            dispatch(removeUser());
            return navigate('/login');
        }catch(err)
        {
            console.log(err);
        }
    };
  return (
    <div className="navbar bg-base-300 shadow-sm  ">
    <div className="flex-1 ">
        <Link to = "/" className="btn btn-ghost text-xl">🧑‍💻 DevTinder</Link>
    </div>
    {user&&(
        <div className="flex gap-2">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-6">
                <div className="w-10 rounded-full" >
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={user.image} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                <Link to = "/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </Link>
                </li>
                <li><Link to = "/setting">Settings</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
        </div>
    </div>)}
</div>
  )
}

export default NavBar