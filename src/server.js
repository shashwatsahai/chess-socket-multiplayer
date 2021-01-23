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

app.use(helmet());
app.use(morgan("short"));

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
//app.use(express.static(path.join(__dirname, "..", "client/")));

var players = [];
app.get("/clients", (req, res) => {
  res.send(players);
});
io.on("connection", (client) => {
  console.log("connected");

  client.join("game");

  players.push(client.id);

  client.on("move", (data) => {
    console.log("here data", data, "client,id", client.id);
    players.forEach((player) => {
      if (player != client.id) {
        console.log("SENDTO", player);
        io.to(player).emit("opponentMove", {
          from: data.from,
          target: data.target,
        });
      }
    });
  });

  client.on("disconnect", () => {
    players = players.filter((player) => player != client.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
