const chess = require('chess');

// create a game client
const gameClient = chess.create();
let move, status;

// capture events
gameClient.on('check', (attack) => {
  // get more details about the attack on the King
  console.log(attack);
});

// look at the status and valid moves
status = gameClient.getStatus();

// make a move
move = gameClient.move('a4');

// look at the status again after the move to see
// the opposing side's available moves
status = gameClient.getStatus();

console.log("STATUS",status)