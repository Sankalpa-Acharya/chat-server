const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  },
});

app.get('/',(req,res)=>{
  res.send('<h1>Server Check ;)</h1>')
})
io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("Join Room No", room);

    socket.on("send-message", (message,id) => {
      console.log('message- sent');
      socket.to(id).emit("receive-message", message);
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
