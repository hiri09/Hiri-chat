import React, { useState } from 'react'
import "./Join.css";
import { Link } from 'react-router-dom';
let user;
const senduser=()=>{
  user=document.getElementById("Joininput").value;
  document.getElementById("Joininput").value="";
}
const Join = () => {
  const[name,setName]=useState("");
  
  return (
    <div className="Joinpage">
      <div className="JoinContainer">
        <img src="https://www.logolynx.com/images/logolynx/69/6907d3b634d702bf2cbb421addffcdf4.jpeg " style={{width:"150px"}} alt="logo" />
        <h1>Hiri Chat</h1>
        <input type="text" id='Joininput' placeholder='Enter Your Name' onChange={(e)=>{setName(e.target.value)}}/>
        <Link onClick={(e)=>{
          if(name===""){
            e.preventDefault();
          }
        }}
        to="/chat" >
           <button className='Joinbtn' onClick={senduser}>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;
export {user};
