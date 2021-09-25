
 let turn = 0;
const socket = io.connect('https://'+window.location.host);


function onDragMove(newLocation,oldLocation,source,piece,position,orientation) {
    console.log("New location: " + newLocation);
    console.log("Old location: " + oldLocation);
    console.log("Source: " + source);
    console.log("Piece: " + piece);
    console.log("Position: " + Chessboard.objToFen(position));
    console.log("Orientation: " + orientation);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   
    
}

socket.on('opponentMove',(data) =>{
    game.move({
        from: data.from,
        to: data.target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
    var string = `${data.from}-${data.target}`
    console.log("STR",string)
    board.move(string)
    // if(game.turn() == 'b'){
    //     const moves = game.moves()
    //     const move = moves[Math.floor(Math.random() * moves.length)]
    //     board.move()
    //     game.move(move)
    // }
})

var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  updateStatus()
  socket.emit("move" , {
        "from": source,
        "target": target,
        "movedBy":game.turn() === 'w' ? 'b':'w'
    })
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
  
}


$("html").click(function () {
    if (!board) {
       $(".click").remove();
        var config = {
            draggable: true,
            position: 'start',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
          }
        board = Chessboard("board1", config);
    }
});

//window.start = start;
