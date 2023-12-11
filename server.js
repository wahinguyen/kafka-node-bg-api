const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

var corsOptions = {
  origin: "*",
};

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kafka node application." });
});

require("./app/routes/colors_behavior.routes.js")(app);
require("./app/background/kafka_external_process.js")(io);
require("./app/background/kafka_internal_process.js")();

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
