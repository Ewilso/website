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
      //square.setAttribute("onclick", "selectSquare('"+ squareID[0] + "')");
      container.appendChild( square );
      tally += 1
    }
  }
}

function display (){
  var images = {
    90: "WPawn.png",
    100: "WRook.png",
    110: "WKnight.png",
    120: "WBishop.png",
    130: "WQueen.png",
    140: "WKing.png",
    170: "BPawn.png",
    180: "BRook.png",
    190: "BKnight.png",
    200: "BBishop.png",
    210: "BQueen.png",
    220: "BKing.png",
  }
  for (var i = 1; i < 65; i++) {
    if (window.Board[i] != undefined) {
      var container = document.getElementById(i);
      var img = document.createElement( 'img' );
      img.classList.add("piece");
      img.src = "lib/pieces/" + images[window.Board[i]]
      img.setAttribute("id", window.Board[i]);
      container.appendChild(img)
    }
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
  window.Board[1] = window.Pawn + window.White;
  window.Board[2] = window.Rook + window.White;
  window.Board[3] = window.Knight + window.White;
  window.Board[4] = window.Bishop + window.White;
  window.Board[5] = window.Queen + window.White;
  window.Board[6] = window.King + window.White;
  window.Board[9] = window.Pawn + window.Black;
  window.Board[10] = window.Rook + window.Black;
  window.Board[11] = window.Knight + window.Black;
  window.Board[12] = window.Bishop + window.Black;
  window.Board[13] = window.Queen + window.Black;
  window.Board[14] = window.King + window.Black;
  console.log(window.Board)
}

function setup () {
  board();
  pieces();
  display();
}
