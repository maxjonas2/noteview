const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("changeEvent", (msg) => {
    socket.broadcast.emit("changeEvent", msg);
  });
});

server.listen(3000, () => {
  console.log("Llistening on port 3000");
});
