function setActive(page) {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  document.getElementById(page).classList.add("active");
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("activeButton");
  }
  document.getElementById(page + "Button").classList.add("activeButton");
}

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

function pawnCheck () {

}

function rookCheck () {

}

function knightCheck () {

}

function bishopCheck () {

}

function queenCheck () {

}

function kingCheck() {

}

function loadFEN (fen) {
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
      window.Board[square] += window.pieces[fen[i].toLowerCase()]
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
  for (var i = 1; i < 65; i++) {
    if (window.Board[i] != undefined) {
      var container = document.getElementById(i);
      var img = document.createElement( "img" );
      img.classList.add("piece");
      img.src = "lib/pieces/" + window.Board[i] + ".svg"
      img.setAttribute("id", window.Board[i]);
      img.setAttribute("onclick", "selectPiece(" + window.Board[i] + ")");
      container.appendChild(img)
    }
  }
}

function selectSquare(square) {
  if (window.Loaded[0] === null && window.Loaded[1] != null) {
      window.Loaded[0] = square
      document.getElementById(window.Loaded[0]).style.backgroundColor = "#c7d6a0"
  } else if (window.Loaded[0] != null) {
    window.Target[0] = square
    console.log(checkLegal())
    if (checkLegal() === true) {
      document.getElementById(window.Target[0]).innerHTML = document.getElementById(window.Loaded[0]).innerHTML
      document.getElementById(window.Loaded[0]).innerHTML = ""
      var choice = window.Target[1] === null
      var audio = choice ? new Audio("lib/move.wav") : new Audio("lib/take.wav");
      audio.play();
      window.Board[window.Loaded[0]] = "";
      window.Board[window.Target[0]] = window.Loaded[1]
      document.getElementById(window.Loaded[0]).style.backgroundColor = ""
      for (var i = 0; i < window.LastMove.length; i++) {
        document.getElementById(window.LastMove[i]).style.backgroundColor = ""
      }
      window.LastMove = [window.Loaded[0], window.Target[0]]
      for (var i = 0; i < window.LastMove.length; i++) {
        document.getElementById(window.LastMove[i]).style.backgroundColor = "#8ed1bb"
      }
      window.Loaded = [null, null];
      var nextTurn = window.Turn > 100;
      window.Turn = nextTurn ? 80 : 160;
    }
    window.Target = [null, null];
  }
}

function selectPiece(square) {
  if (window.Loaded[1] === null) {
    window.Loaded[1] = square
  } else {
    window.Target[1] = square
  }
}

function checkLegal () {
  var borw = window.Loaded[1] < 170;
  var pieceType = window.Loaded[1]
  switch (pieceType -= borw ? 80 : 160) {
    case 10:
      pawnCheck();
      break;
    case 20:
      rookCheck();
      break;
    case 30:
      knightCheck();
      break;
    case 40:
      bishopCheck();
      break;
    case 50:
      queenCheck();
      break;
    case 60:
      kingCheck();
      break;
  }
  if ((window.Loaded[1] > 140 && window.Target[1] > 140) || (window.Loaded[1] < 141 && window.Target[1] < 141 && window.Target[1] != null)) {
    document.getElementById(window.Loaded[0]).style.backgroundColor = ""
    window.Loaded = window.Target;
    document.getElementById(window.Loaded[0]).style.backgroundColor = "#c7d6a0"
    return false;
  } else if ((window.Turn > 100 && window.Loaded[1] > 169) || (window.Turn < 100 && window.Loaded[1] < 141)) {
    return true;
  }
  else if (window.Loaded[0] != null){
    document.getElementById(window.Loaded[0]).style.backgroundColor = ""
    window.Loaded = [null, null];
    return false;
  }
  else{
    return false;
  }
}

function pieces () {
  window.Moves = [];
  window.Board = [];
  window.LastMove = [];
  window.Turn = 80

  window.Pawn = 10;
  window.Rook = 20;
  window.Knight = 30;
  window.Bishop = 40;
  window.Queen = 50;
  window.King = 60;
  window.pieces = {
    "p": window.Pawn,
    "r": window.Rook,
    "n": window.Knight,
    "b": window.Bishop,
    "q": window.Queen,
    "k": window.King,
  };

  window.White = 80;
  window.Black = 160;

  window.Loaded = [null, null];
  window.Target = [null, null];
}

function setup () {
  board();
  pieces();
}

function choose (){
  var buttons = document.getElementsByClassName("option");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = null;
  }
  loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  display();
}
