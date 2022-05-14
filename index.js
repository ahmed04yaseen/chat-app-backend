const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");

const cors = require('cors')
const app = express();

app.use(cors());
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")

env.config();


mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.t2bwn.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
  });

  app.use(express.json());
  app.use("/api/user",userRoutes);
  app.use("/api/chat", chatRoutes)
  app.use("/api/message", messageRoutes)

  app.use("/uploads", express.static('uploads'))


  const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
  });

  const io = require("socket.io")(server, {
pingTimeout : 90000,
cors:{
  origin: "https://localhost:3000"
}

  })

  io.on("connection", (socket)=>{
    console.log("Connected to socket.io");
    socket.on("setup", (userData)=>{
      socket.join(userData._id);
      socket.emit("connected")
    })

    socket.on("join chat", (room) => {
      socket.join(room);

      console.log("User Joined Room: " + room);
    });
    socket.on("leave room", (room) =>{
      socket.leave(room);
      console.log("User Left room :" + room)
    })

    socket.on("new message",async (newMessageRecieved) => {
      console.log(newMessageRecieved.chat.users)
      var chat = newMessageRecieved.chat
      if (!chat.users) return console.log("chat.users not defined");
//test
console.log(newMessageRecieved.chat._id)
// var numClients = io.sockets.adapter.rooms[newMessageRecieved.chat._id]!=undefined ? Object.keys(io.sockets.adapter.rooms[newMessageRecieved.chat._id]).length:0;
// console.log(numClients)

      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.myId) return;

        //test
        socket.in(user._id).emit("message came", "message came");

  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
        console.log("hii")
      });

    })
   
  })
 