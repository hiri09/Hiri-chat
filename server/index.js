const http=require("http");
const express=require("express");
const socketIO=require("socket.io");
const cors=require("cors");

const app=express();
const port= 4500;
const users=[{}];
app.use(cors());
app.get("/",(req,res)=>{
    res.send("sending messege");
})
const server=http.createServer(app);
// io it is type of circuit
const io=socketIO(server);
// jab bhi koi new circuit judega isse to y call bilkul starting me
io.on("connection",(socket)=>{
    console.log("new connection");
    
    socket.on("joined",({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined bro` );
            
        socket.broadcast.emit("userjoined",{user:"Admin" , message: `${users[socket.id]} has joined bro`});

        socket.emit("welcome",{user:"Admin", message:`welcome to the chat ${users[socket.id]}`});
    })
    socket.on("message",({message,id})=>{
        io.emit("sendMessage",{user:users[id],message,id})
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin" , message: `${users[socket.id]} has left you baby my baby`})
        console.log("user left");
    });
})
server.listen(port,()=>{
    console.log(`server is working on ${port}`);
});




