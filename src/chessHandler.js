const chess = require("chess");

// create a game client
const gameClient = chess.create();
let move, status;

// // capture events
// gameClient.on('check', (attack) => {
//   // get more details about the attack on the King
//   console.log(attack);
// });

// // look at the status and valid moves
// status = gameClient.getStatus();

// // make a move
// move = gameClient.move('a4');

// // look at the status again after the move to see
// // the opposing side's available moves
// status = gameClient.getStatus();

const chessHandler = {};

chessHandler.move = (src, dest) => {
  if (!gameClient) {
    gameClient = chess.create();
  }
//   var object = { from: src, to: dest };
//   console.log("src", src, "dest", dest, "object", object);

//   const d=gameClient.notatedMoves();
//   console.log(d);

//   let status = gameClient.getStatus(),
//   validMoves = status.notatedMoves;
//   move = gameClient.move('a4');

//  console.log("MOVE",move)
//   status = gameClient.getStatus()
//   console.log("STAT",status)
//   console.log(validMoves['g3']);
};

console.log("STATUS", status);

module.exports = chessHandler;
