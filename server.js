const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// set port, listen for requests
const API_PORT = process.env.API_PORT;
app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}.`);
});

// const SOCKET_PORT = process.env.SOCKET_PORT;
// server.listen(SOCKET_PORT, () => {
//   console.log("socket server listening on *:" + SOCKET_PORT);
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kafka node application." });
});

require("./app/routes/colors_behavior.routes.js")(app);
require("./app/background/kafka_external_process.js")(io);
require("./app/background/kafka_internal_process.js")();
