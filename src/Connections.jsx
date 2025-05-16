import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Connections = () => {
  const [error, setError]=useState("");
  const connectedPeople = async ()=>
  {
    try{
      const res = await axios.get("http://localhost:3000/user/connections",{withCredentials:true});
      console.log(res.data.connections);
      const connections  = res.data.connections;
        if(connections.length===1)
        throw new Error("You dont have any connections. \nPlease explore more.");
    }catch(err)
    {
      setError(err.message);
      console.log(err.message);
    }
  }
  useEffect(()=>{
    connectedPeople();
  },[]);
  return (
    <div>Connections</div>
  )
}

export default Connections