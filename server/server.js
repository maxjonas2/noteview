const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

app.use(express.static("public"));

const io = new Server(server, { cors: { origin: "*" } });

let boardItems = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("changeEvent", boardItems);

  socket.on("changeEvent", (message) => {
    boardItems = message;
    socket.broadcast.emit("changeEvent", boardItems);
  });
});

server.listen(3000, () => {
  console.log("Llistening on port 3000");
});
