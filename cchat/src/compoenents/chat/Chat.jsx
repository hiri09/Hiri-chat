import React, { useEffect, useState } from 'react'
import {user} from "../join/Join.jsx";
import socketIO from "socket.io-client";
import Message from '../message/Message.jsx';
import  "./chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
const ENDPOINT="http://localhost:4500/";
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
                <a href="/"><img src="" alt="close" /></a>
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
                <button className='sendbtn' onClick={send}>send</button>
            </div>
        </div>
    </div>
  )
}

export default Chat
