function board () {
  var tally = 1;
  for (var rank = 1; rank < 9; rank++) {
    for (var file = 1; file < 9; file++) {
      var currentColour = (file + rank) % 2 != 0;
      var squareColour = currentColour ? "dark" : "light";

      var container = document.getElementById( 'rank_' + rank );
      var square = document.createElement( 'div' );
      square.classList.add("square", squareColour);
      square.setAttribute("id", tally);
      square.setAttribute("onclick", "selectSquare(" + tally + ")");
      container.appendChild( square );
      tally += 1
    }
  }
}

function loadFEN (fen) {
  var pieces = {
    "p": window.Pawn,
    "r": window.Rook,
    "n": window.Knight,
    "b": window.Bishop,
    "q": window.Queen,
    "k": window.King,
  }
  var square = 1;
  for (var i = 0; i < fen.length; i++) {
    if (fen[i] === "/") {
      continue;
    }
    else if (fen[i] === " ") {
      break;
    }
    if (isNaN(fen[i]) === false) {
        square += Number(fen[i]);
    }
    else{
      colour = fen[i].toUpperCase() != fen[i];
      window.Board[square] = 0
      window.Board[square] += colour ? window.Black : window.White;
      window.Board[square] += pieces[fen[i].toLowerCase()]
      square +=1
    }
  }
}

function createFEN (){
  for (var i = 1; i < 65; i++) {
    // TODO
  }
}

function display (){
  var images = {
    90: "WPawn.svg",
    100: "WRook.svg",
    110: "WKnight.svg",
    120: "WBishop.svg",
    130: "WQueen.svg",
    140: "WKing.svg",
    170: "BPawn.svg",
    180: "BRook.svg",
    190: "BKnight.svg",
    200: "BBishop.svg",
    210: "BQueen.svg",
    220: "BKing.svg",
  }
  for (var i = 1; i < 65; i++) {
    if (window.Board[i] != undefined) {
      var container = document.getElementById(i);
      var img = document.createElement( 'img' );
      img.classList.add("piece");
      img.src = "lib/pieces/" + images[window.Board[i]]
      img.setAttribute("id", window.Board[i]);
      img.setAttribute("onclick", "selectPiece(" + window.Board[i] + ")");
      container.appendChild(img)
    }
  }
}

function selectSquare(square) {
  if (window.Loaded[0] === null) {
    window.Loaded[0] = square
    console.log(window.Loaded, window.Target)
  } else{
    window.Target[0] = square
    console.log(window.Loaded, window.Target)
    window.Loaded = [null, null];
    window.Target = [null, null];
  }
}

function selectPiece(square) {
  if (window.Loaded[1] === null) {
    window.Loaded[1] = square
  } else{
    window.Target[1] = square
  }
}

function pieces () {
  window.Board = [];
  window.Pawn = 10;
  window.Rook = 20;
  window.Knight= 30;
  window.Bishop = 40;
  window.Queen = 50;
  window.King = 60;

  window.White = 80;
  window.Black = 160;

  window.Loaded = [null, null];
  window.Target = [null, null];
}

function setup () {
  board();
  pieces();
  loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  display();
}
