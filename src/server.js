require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const http = require("http");
const socket = require("socket.io");

const server = http.createServer(app);
const io = socket(server);
const socketHandler = require("./socketHandler")

app.use(helmet());
app.use(morgan("short"));

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, "..", "client/")));


app.get("/clients", (req, res) => {
  res.send(players);
});

socketHandler.init(io);

server.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
