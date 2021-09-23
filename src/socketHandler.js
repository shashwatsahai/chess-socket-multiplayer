const chessHandler = require("./chessHandler");
const socketHandler = {};

socketHandler.init = function (io) {
  var players = [];
  io.on("connection", (client) => {
    console.log("connected");

    if (players.length > 2) {
      return;
    }
    client.join("game");

    players.push(client.id);

    client.on("move", (data) => {
        
      chessHandler.move(data.from, data.target);
    
      players.forEach((player) => {
        if (player != client.id) {
        //   console.log("SENDTO", player);
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
};

module.exports = socketHandler;
