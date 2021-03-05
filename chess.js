// TODO: Move list, All Moves, Material log, FEN creator
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

function changeSounds () {
  window.Sounds = window.Sounds ? false : true
}

function board () {
  ranks = document.getElementsByClassName("rank")
  for (var i = 0; i < ranks.length; i++) {
    ranks[i].innerHTML = ""
  }
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

function piece () {
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
  window.White = 80;
  window.Black = 160;
  window.pieces = {
    "p": window.Pawn,
    "r": window.Rook,
    "n": window.Knight,
    "b": window.Bishop,
    "q": window.Queen,
    "k": window.King,
  };

  window.Loaded = [null, null];
  window.Target = [null, null];
  window.Sounds = true;
}

function pawnCheck () {
  if ((window.Offset === 8 && window.Target[1] === null) || ((window.Offset === 9 || window.Offset === 7) && window.Target[1] != null)) {
    return true;
  } else if (window.Offset === 16 && ((window.Loaded[0] > 48 && window.Loaded[0] < 57) || (window.Loaded[0] > 8 && window.Loaded[0] < 17))) {
    return true;
  }
  return false;
}

function rookCheck () {
  fromRank = document.getElementById(window.Loaded[0]).parentNode.id[5]
  toRank = document.getElementById(window.Target[0]).parentNode.id[5]
  if (window.Offset % 8 === 0 || fromRank === toRank) {
    return true;
  }
  return false;
}

function knightCheck () {
  switch (window.Offset) {
    case 15:
      return true;
    case 17:
      return true;
    case 10:
      return true;
    case 6:
      return true;
    default:
    return false;
  }
}

function bishopCheck () {
  loadedColour = document.getElementById(window.Loaded[0]).classList[1]
  targetColour = document.getElementById(window.Target[0]).classList[1]
  if ((window.Offset % 9 === 0 || window.Offset % 7 === 0) && loadedColour === targetColour) {
    return true;
  }
  return false;
}

function queenCheck () {
  if (bishopCheck() === true || rookCheck === true) {
    return true;
  }
  return false;
}

function kingCheck() {
  if (window.Offset === 9 || window.Offset === 7 || window.Offset === 1 || window.Offset === 8) {
    return true;
  }
  return false;
}

function loadFEN (fen) {
  var audio = new Audio("lib/move.wav");
  audio.play();
  window.FEN = fen
  document.getElementById("fenstring").value = window.FEN;
  window.Board = [];
  var square = 1;
  for (var i = 0; i < fen.length; i++) {
    if (fen[i] === "/") {
      rank = document.getElementById(square - 1).parentNode.id[5]
      square = rank * 8 + 1
    }
    else if (fen[i] === " ") {
      break;
    }
    else if (isNaN(fen[i]) === false) {
        square += Number(fen[i]);
    }
    else if (fen[i].toLowerCase() in window.pieces){
      colour = fen[i].toUpperCase() != fen[i];
      window.Board[square] = 0
      window.Board[square] += colour ? window.Black : window.White;
      window.Board[square] += window.pieces[fen[i].toLowerCase()]
      square +=1
    }
    else{
      continue;
    }
  }
  display();
}

function createFEN (){
  for (var i = 1; i < 65; i++) {
    square = document.getElementById(i)
    rank = square.parentNode.id[5]
  }
  fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  window.FEN = fen
  document.getElementById("fenstring").value = window.FEN
}

function display (){
  window.Turn = 80;
  for (var i = 1; i < 65; i++) {
    var container = document.getElementById(i);
    container.style.backgroundColor = "";
    container.innerHTML = ""
    if (window.Board[i] != undefined) {
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
    if ((window.Loaded[1] > 140 && window.Turn > 140) || (window.Loaded[1] < 141 && window.Turn < 141)) {
      window.Loaded[0] = square
      document.getElementById(window.Loaded[0]).style.backgroundColor = "#c7d6a0"
    } else{
      window.Loaded = [null, null]
    }
  } else if (window.Loaded[0] != null) {
    window.Target[0] = square
    if (calcLegal() === true) {
      document.getElementById(window.Target[0]).innerHTML = document.getElementById(window.Loaded[0]).innerHTML
      document.getElementById(window.Loaded[0]).innerHTML = ""
      var choice = window.Target[1] === null
      if (window.Sounds === true) {
        var audio = choice ? new Audio("lib/move.wav") : new Audio("lib/take.wav");
        audio.play();
      }
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
      createFEN()
    }
    window.Target = [null, null];
    genLegal()
  }
}

function selectPiece(square) {
  if (window.Loaded[1] === null) {
    window.Loaded[1] = square
  } else {
    window.Target[1] = square
  }
}

function genLegal() {
  window.legal = [];
  for (var i = 1; i < 65; i++) {
    square = document.getElementById(i)
    if (square.innerHTML !== "") {
      piece = square.childNodes[0].id
      window.Loaded = [i, Number(piece)]
      var borw = piece < 170;
      var pieceType = piece -= borw ? 80 : 160
      for (var j = 1; j < 65; j++) {
        window.Target = [j, null]
        window.Offset = Math.abs(window.Loaded[0] - window.Target[0])
        switch (pieceType) {
          case 10:
            checkLegal = pawnCheck();
            break;
          case 20:
            checkLegal = rookCheck();
            break;
          case 30:
            checkLegal = knightCheck();
            break;
          case 40:
            checkLegal = bishopCheck();
            break;
          case 50:
            checkLegal = queenCheck();
            break;
          case 60:
            checkLegal = kingCheck();
            break;
        }
        if (checkLegal === true) {
          window.legal.push([i, j])
        }
        window.Target = [null, null]
      }
      window.Loaded = [null, null]
    }
  }
}

function calcLegal () {
  if ((window.Loaded[1] > 140 && window.Target[1] > 140) || (window.Loaded[1] < 141 && window.Target[1] < 141 && window.Target[1] != null)) {
    document.getElementById(window.Loaded[0]).style.backgroundColor = ""
    window.Loaded = window.Target;
    document.getElementById(window.Loaded[0]).style.backgroundColor = "#c7d6a0"
    return false;
  } else if (((window.Turn > 100 && window.Loaded[1] > 169) || (window.Turn < 100 && window.Loaded[1] < 141) && searchForLegal() === true)) {
    return true;
  }
  else if (window.Loaded[0] != null){
    document.getElementById(window.Loaded[0]).style.backgroundColor = ""
    window.Loaded = [null, null];
    return false;
  }
  else {
    return false;
  }
}

function searchForLegal () {
  window.legal = [window.Loaded[1], window.Target[1]]
  return true;
}

function setup () {
  window.ondragstart = function() { return false; }
  board();
  piece();
}

function reset () {
  button = document.getElementsByClassName("option")
  button[0].onclick=function(){choose()};
  button[0].onclick=function(){choose()};
  setup()
}

function choose () {
  button = document.getElementsByClassName("option")
  button[0].onclick = "";
  button[0].onclick = "";
  loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  genLegal()
}
