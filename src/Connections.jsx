import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from './utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const [error, setError]=useState("");
  const people  = useSelector(store=>store.connection);
 const connectedPeople = async () => {
  try {
    const res = await axios.get("http://localhost:3000/user/connections", { withCredentials: true });
    const conn = res.data;
    console.log(conn.connections);
    dispatch(addConnection(conn.connections)); // FIXED: only dispatch the array\
  } catch (err) {
    setError(err.message);
    console.log(err.message);
  }
};

  useEffect(()=>{
    if (!people) connectedPeople();
  },[]);
 
  

  return (
   ( people&&<div>Connections</div>)
  )
}

export default Connections