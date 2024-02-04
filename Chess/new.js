// Chooses active navbar page
function setActive(page) {
  // Make all pages unactive
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  // Make selected page active
  document.getElementById(page).classList.add("active");
  // Same for buttons
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("activeButton");
  }
  document.getElementById(page + "Button").classList.add("activeButton");
}

// Turns sound on / off
function changeSounds() {
  window.Sounds = window.Sounds ? false : true
}

// Sets up each board square
function board() {
  ranks = document.getElementsByClassName("rank")
  for (var i = 0; i < ranks.length; i++) {
    ranks[i].innerHTML = ""
  }
  tally = 0;
  for (var rank = 0; rank < 8; rank++) {
    for (var file = 0; file < 8; file++) {
      var currentColour = (file + rank) % 2 != 0;
      var squareColour = currentColour ? "dark" : "light";

      var container = document.getElementById( 'rank_' + rank );
      var square = document.createElement( 'div' );
      square.classList.add("square", squareColour);
      square.setAttribute("id", tally);
      square.setAttribute("onclick", "selectSquare(" + tally + ")");
      container.appendChild( square );
      tally += 1;
    }
  }
}

function selectSquare(id){
  // Find piece in square
  var squareObj = document.getElementById(id);
  if (squareObj.childNodes.length > 0){
    var piece = squareObj.childNodes[0].id;
  }
  // Load it if it is the current player's colour
  if(window.Playing === window.Turn && (piece < 150 && window.Playing === 80) || (piece > 150 && window.Playing === 160)){
    if (window.Loaded[0] != null){
      document.getElementById(window.Loaded[0]).style.backgroundColor = "";
    }
    window.Loaded = [id, piece];
    // Reload board colours
    loadPieces();
    squareObj.style.backgroundColor = "#c7d6a0";
    LegalSearch();
  } else{
    // Otherwise move it if not and it is legal
    if (Loaded[0] != null){
      window.Target = [id, piece]
      if (checkLegal() === true){
        document.getElementById(window.LastMove[0]).style.backgroundColor = "";
        document.getElementById(window.LastMove[1]).style.backgroundColor = "";
        // Play move sound / Do move
        var choice = window.Target[1] === null
        if (window.Sounds === true) {
          var audio = choice ? new Audio("lib/move.wav") : new Audio("lib/take.wav");
          audio.play();
        }
        window.LastMove = [window.Loaded[0], window.Target[0]] // Save to unhighlight later
        // Move actual piece
        window.Board[window.Target[0]] = window.Loaded[1];
        window.Board[window.Loaded[0]] = null
        loadPieces();
        // reset for next move
        document.getElementById(window.Loaded[0]).style.backgroundColor = "#8ed1bb";
        document.getElementById(window.Target[0]).style.backgroundColor = "#d66464";
        window.Loaded = [null, null];
        window.Target = [null, null];
        var nextTurn = window.Turn > 100;
        // For testing
        window.Turn = nextTurn ? 80 : 160;
        window.Playing = nextTurn ? 80 : 160;
        //createFEN();
      }
    }
  }
}

function LegalSearch(){
  var legal = [];
  var piece = window.Loaded[1] - window.Turn;
  console.log(piece);
  var diag = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  var orthog = [[1, 0], [-1, 0], [0, -1], [0, 1]];
  var knight = [[2, 1], [1, 2], [2, -1], [-1, 2], [-2, -1], [-1, -2], [-2, 1], [1, -2]];
  switch (piece){
    case 10:
      var rank = parseInt(window.Loaded[0] / 8);
      if (rank == 6){
        legal = feel(0, -2, l = legal, maxdist = 3)
      }
      break;
    case 30:
      for (var i = 0; i < 8; i++){
        legal = feel(knight[i][0], knight[i][1], l = legal, maxdist = 2);
      }
      break;
    case 40:
      // Diagonal search
      for (var i = 0; i < 5; i++){
        legal = feel(diag[i][0], diag[i][1], l = legal);
      }
      break;
    case 20:
      // Orthogonal search
      for (var i = 0; i < 5; i++){
        legal = feel(orthog[i][0], orthog[i][1], l = legal);
      }
      break;
    case 50:
      // Queen Moves
      for (var i = 0; i < 5; i++){
        legal = feel(orthog[i][0], orthog[i][1], l = legal);
        legal = feel(diag[i][0], diag[i][1], l = legal);
      }
      break;
    case 60:
      // King Moves
      for (var i = 0; i < 5; i++){
        legal = feel(orthog[i][0], orthog[i][1], l = legal, maxdist = 2);
        legal = feel(diag[i][0], diag[i][1], l = legal, maxdist = 2);
      }
      break;
  }
  console.log(legal);
  window.Legal = legal;
}

// Search in any of the 8 directions
function feel(a, b, l = [], maxdist = 8, colour = true){
  var rank = parseInt(window.Loaded[0] / 8);
  var file = (window.Loaded[0] % 8);
  for (var i = 1; i < maxdist; i++){
    // Add an offset of (a, b)
    var location = (rank + (i * a)) * 8 + (file + (i * b));
    var newsquare = Board[location];
    // Stops weird diagonal extra offsets
    if (file + (i * b) > 7 || rank + (i * a) > 7
    || file + (i * b) < 0 || rank + (i * a) < 0){
      break;
    }
    // Select takeable pieces but prevents x-raying through pieces
    if (newsquare != undefined){
      if ((window.Playing === 160 && newsquare < 150) ||
      (window.Playing === 80 && newsquare > 150)){
        if (colour === true){
          document.getElementById(location).style.backgroundColor = "#d66464";
        }
        l[location] = true;
      }
      break;
    }
    if (colour === true){
      document.getElementById(location).style.backgroundColor = "#d66464";
    }
    l[location] = true;
  }
  return l;
}

// Checks move legality
function checkLegal(rank, file){
  console.log(window.Loaded, window.Target)
  if (window.Target[1] != null && 
    (window.Target[1] < 150 && window.Playing === 80) || 
    (window.Target[1] > 150 && window.Playing === 160)){
    // Select different piece instead of taking it
    return false;
  } else if (window.Loaded[1] === null || window.Loaded[0] === null || window.Target[0] === null){
    // Prevents any possible miscombination of squares clicked
    return false;
  } else if (window.Legal[window.Target[0]] === true){
    return true
  }
}

// Loads board state from FEN string
function loadFEN (fen){
  window.FEN = fen
  document.getElementById("fenstring").value = window.FEN;
  window.Board = [];
  var square = 0;
  for (var i = 0; i < fen.length; i++) {
    if (fen[i] === "/") {
      rank = document.getElementById(square).parentNode.id[5]
      square = rank * 8
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
      window.Board[square] += colour ? 160 : 80;
      window.Board[square] += window.pieces[fen[i].toLowerCase()]
      square +=1
    }
  }
  window.Turn = 80;
  loadPieces();
}

// Update piece images based on Board
function loadPieces() {
  for (var i = 0; i < 64; i++) {
    var container = document.getElementById(i);
    container.style.backgroundColor = "";
    container.innerHTML = ""
    if (window.Board[i] != undefined) {
      var img = document.createElement( "img" );
      img.classList.add("piece");
      img.src = "lib/pieces/" + window.Board[i] + ".svg"
      img.setAttribute("id", window.Board[i]);
      container.appendChild(img)
    }
  }
}

// Create FEN from board
function createFEN (){
  fen = ""
  for (var square = 0; square < 64; square++) {
    var piece = window.Board[square];
    if (piece > 150){
      piece -= 160;
      var colour = "black";
    }
    else {
      piece -= 80;
      var colour = "white";
      console.log(pieces[1])
    }
  }
  fen = "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR"
  window.FEN = fen
  document.getElementById("fenstring").value = window.FEN
}

// Declares initial board state
function setup () {
  // General data
  window.Sounds = true;
  window.ondragstart = function() { return false; }
  // Game data
  window.Moves = [];
  window.Board = [];
  window.Legal = [];
  window.LastMove = [0, 0];
  window.Turn = 80;
  window.FEN = null;
  window.Playing = 0;
  window.Loaded = [null, null]; // square, piece
  window.Target = [null, null]; // square, piece
  // Gets piece svg with (colour + piece value).svg
  // White: 80, Black: 160
  window.pieces = {
    "p": 10,
    "r": 20,
    "n": 30,
    "b": 40,
    "q": 50,
    "k": 60,
  };
  board();
  choose('white'); // For testing
}

// Resets buttons to start game
function reset () {
  button = document.getElementsByClassName("option")
  button[0].onclick=function(){choose('white')};
  button[1].onclick=function(){choose('black')};
  board();
}

// Chooses side
function choose (side) {
  button = document.getElementsByClassName("option")
  button[0].onclick = "";
  button[1].onclick = "";
  if (side === "white") {
    //loadFEN("rnbqkbnr/8/8/8/8/8/8/RNBQKBNR")
    loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
    window.Playing = 80;
  } else if (side === "black") {
    //loadFEN("RNBQKBNR/8/8/8/8/8/8/rnbqkbnr")
    loadFEN("RNBQKBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbqkbnr")
    window.Playing = 160;
  }
}
  