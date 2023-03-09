import React, { useEffect, useState } from 'react'
import {user} from "../join/Join.jsx";
import socketIO from "socket.io-client";
import Message from '../message/Message.jsx';
import  "./chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
const ENDPOINT="http://localhost:4500/";
const Cross=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg>
const snedpng=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"/></svg>
let socket;
const Chat = () => {
  const[id,setId]=useState("");
  const[messages,setMesseges]=useState([]);
  const send=()=>{
    const message=document.getElementById("chatinput").value;
    socket.emit("message",{message,id});
    document.getElementById("chatinput").value="";
  }
  console.log(messages);
  useEffect(()=>{
    // ye bta rha jab login krke chat route p jaaenge to y connection banaega endpoint mtlb jha server hai 
    socket=socketIO(ENDPOINT,{transports:["websocket"]});
    // connect ek by default hai jo connection bnte hi call hoga
    socket.on("connect" , ()=>{
        alert("conneted");
        setId(socket.id);
        console.log("1");
    })
    console.log(socket);
    // yha s bataega user join ho gya hai or oodhr on s recieve hoga
    socket.emit("joined",{user})
    // frr welcome message aaega oose recive krna hoga
    socket.on("welcome",(data)=>{
        setMesseges([...messages,data]);
        console.log(data.users);
        console.log(data.message);
    })
    // an so on...
    socket.on("userjoined",(data)=>{
        setMesseges([...messages,data]);
        console.log(data.users,data.message);
    })
    socket.on("leave", (data)=>{
        setMesseges([...messages,data]);
        console.log(data.users, data.message);
    })
    return ()=>{   
        socket.emit('disconnect');
        socket.off()
    }
  },[])
  useEffect(()=>{
    socket.on("sendMessage",(data)=>{
        setMesseges([...messages,data]);
        console.log(data.users,data.message,data.id);
    })
    return ()=>{
        socket.off();
    }
  },[messages])
  return (
    
    <div className="ChatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>Cchat </h2>
                <a href="/">{Cross}</a>
            </div>
            <ReactScrollToBottom className="chatbox">
                {
                    messages.map((item)=>{
                        return <Message  user={item.id === id ? '' : item.users}message={item.message} classs={item.id === id ?  'right' : 'left' } />
                    })
                }
            </ReactScrollToBottom>
            <div className="inputbox">
                <input onKeyPress={(e)=>e.key === 'Enter' ? send() : null } type="text" id='chatinput'/>
                <button className='sendbtn' onClick={send}>{snedpng}</button>
            </div>
        </div>
    </div>
  )
}

export default Chat
