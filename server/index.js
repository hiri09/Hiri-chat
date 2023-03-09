const http=require("http");
const express=require("express");
const socketIO=require("socket.io");
const cors=require("cors");

const app=express();
const port= process.env.PORT;

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
    // jab koi naya user aaega tab joined call hoga or ooski id usres me store ho jaegi and brodcast ki help se ham sbko bta denge ki 
    // ye naya bnda add hua h
    socket.on("joined",({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined bro`);
        // y admin ki trf s meesge hoga nae bnde k lie but y isrf sbko dikhega except joiner
        socket.broadcast.emit("userjoined",{users: "Admin" , message:`${users[socket.id]} has joined`});
        // y admin ki trf s meesge hoga nae bnde k lie
        socket.emit("welcome",{users:"Admin",message:`welcome to the chat ${users[socket.id]}`});
    })
    socket.on("message",({message,id})=>{
       io.emit("sendMessage",{users:users[id],message,id});
    })
    // jab kat dega koi tb ka seen h y
    socket.on('disconnect',()=>{
        // ye call hog or messeg dega sbko ki bhai wo bnda has gone
        socket.broadcast.emit(`leave`, {users:"Admin",message:`${users[socket.id]} has leave the chat`});
        console.log("user left");
    })
})
server.listen(port,()=>{
    console.log(`server is working on ${port}`);
});




