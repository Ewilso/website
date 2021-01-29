function writeStatus(text){
  var writeTo = document.getElementById( 'status' );
  writeTo.innerHTML += (text + "<br>");
  writeTo.scrollTop = writeTo.scrollHeight;
}

function setVars(){
  window.whitePawnMoves = [0,0,0,0,0,0,0,0]
  window.blackPawnMoves = [0,0,0,0,0,0,0,0]
  window.mode = "None"
  window.destination = "None"
  window.turn = "white"
  window.loaded = "None"
}

function selectSquare(square){
  if (document.getElementById(square).innerHTML !== "") {
    window.destination = "None";
  }
  else if (window.loaded !== "None") {
    window.destination = square;
    writeStatus("Destination set to: " + window.destination + ".")
    document.getElementById('Destination').innerHTML = window.destination;
    var isLegal = checkLegalMove();
    writeStatus("Legal: " + isLegal + ".")
    if (isLegal === true) {
      document.getElementById(window.destination).appendChild(
        document.getElementById(window.loaded)
      );
      if (window.turn === "white") {
        window.turn = "black"
      }
      else {
        window.turn = "white"
      }
      document.getElementById('Turn').innerHTML = window.turn;
    }
    window.loaded = "None"
  }
}

function selectPiece(piece){
  window.destination = "None"
  window.loaded = piece;
  document.getElementById('Destination').innerHTML = window.destination;
  document.getElementById('Piece').innerHTML = window.loaded;
  writeStatus(piece + " selected.");
}

function checkLegalMove(){
  if (window.turn === "white" && window.loaded.indexOf("W") !== -1) {
    if (window.loaded.indexOf("Knight") !== -1) {
      // Validation rules
      writeStatus("Knight played.")
    }
    else if (window.loaded.indexOf("Bishop") !== -1) {
      return bishopCheck();
    }
    else if (window.loaded.indexOf("Queen") !== -1) {
      return royaltyCheck();
    }
    else if (window.loaded.indexOf("King") !== -1) {
      writeStatus("King played.")
    }
    else if (window.loaded.indexOf("Rook") !== -1) {
      return rookCheck();
    }
    else if (window.loaded.indexOf("Pawn") !== -1) {
      var check = pawnCheck(window.whitePawnMoves, "+", window.loaded, window.destination);
      return check;
    }
  }
  else if (window.turn === "black" && window.loaded.indexOf("B") !== -1) {
    if (window.loaded.indexOf("Knight") !== -1) {
      writeStatus("Knight played.")
    }
    else if (window.loaded.indexOf("bishop") !== -1) {
      return bishopCheck();
    }
    else if (window.loaded.indexOf("Queen") !== -1) {
      return royaltyCheck();
    }
    else if (window.loaded.indexOf("King") !== -1) {
      writeStatus("King played.")
    }
    else if (window.loaded.indexOf("Rook") !== -1) {
      return rookCheck();
    }
    else if (window.loaded.indexOf("Pawn") !== -1) {
      return pawnCheck(window.blackPawnMoves, "-", window.loaded, window.destination);
    }
  }
  else {
    return false;
  }
}

function rookCheck(){
  var moveFrom = document.getElementById(window.loaded).parentNode.id
  if(window.destination[0] === moveFrom[0]){
    return true;
  }
  else if (window.destination[1] === moveFrom[1]) {
    return true;
  }
}

function royaltyCheck(){
  var diagonal = bishopCheck()
  var straight = rookCheck()
  if (diagonal === true || straight === true) {
    return true;
  }
}

function bishopCheck(){
  var alphabet = ["a","b","c","d","e","f","g","h"]
  var moveFrom = document.getElementById(window.loaded).parentNode.id
  if (window.destination[1] - moveFrom[1] === alphabet.indexOf(window.destination[0]) - alphabet.indexOf(moveFrom[0])){
    return true;
  }
  else if (window.destination[1] - moveFrom[1] === (alphabet.indexOf(window.destination[0]) - alphabet.indexOf(moveFrom[0])) * -1){
    return true;
  }
}

function pawnCheck(movesArray, BorW, piece, square){
  var index = Number(piece.slice(-1)) - 1;
  var timesMoved = movesArray[index];
  var moveFrom = document.getElementById(piece).parentNode.id;
  if (BorW === "-") {
    var moveTo = moveFrom[1] - 1
    var doubleMove = moveFrom[1] - 2
  }
  else{
    var moveTo = Number(moveFrom[1]) + 1
    var doubleMove = Number(moveFrom[1]) + 2
  }
  var inBetween = square[0] + moveTo;
  if (Number(square[1]) === moveTo && square[0] === moveFrom[0]) {
    movesArray[index] = 1;
    return true;
  }
  else if (Number(square[1]) === doubleMove && timesMoved === 0 && square[0] === moveFrom[0] && document.getElementById(inBetween).innerHTML === "") {
    movesArray[index] = 1;
    return true;
  }
  else{
    return false;
  }
}

function setGameMode(mode){
  if (mode === "single" || mode === "double" || mode === "ai") {
    window.mode = mode;
  }
  writeStatus("Mode set to: " + window.mode);
}

function loadBoard(){
  // Builds the board with chess square notation for an id.
  var squareID = [
    "a1","a2","a3","a4","a5","a6","a7","a8",
    "b1","b2","b3","b4","b5","b6","b7","b8",
    "c1","c2","c3","c4","c5","c6","c7","c8",
    "d1","d2","d3","d4","d5","d6","d7","d8",
    "e1","e2","e3","e4","e5","e6","e7","e8",
    "f1","f2","f3","f4","f5","f6","f7","f8",
    "g1","g2","g3","g4","g5","g6","g7","g8",
    "h1","h2","h3","h4","h5","h6","h7","h8",
  ]
  var j;
  for(j = 0; j < 4; j++){
    var i;
    for(i = 1; i < 8; i+=2){
      var wcontainer = document.getElementById( 'row_' + i );
      var wSquare = document.createElement( 'div' );
      wSquare.classList.add("square", "white");
      wSquare.setAttribute("id", squareID[0]);
      wSquare.setAttribute("onclick", "selectSquare('"+ squareID[0] + "')");
      squareID.shift();
      wcontainer.appendChild( wSquare );
      var bcontainer = document.getElementById( 'row_' + (i + 1) );
      var bSquare = document.createElement( 'div' );
      bSquare.classList.add("square", "black");
      bSquare.setAttribute("id", squareID[0]);
      bSquare.setAttribute("onclick", "selectSquare('"+ squareID[0] + "')");
      squareID.shift();
      bcontainer.appendChild( bSquare );
    }
    var i;
    for(i = 1; i < 8; i+=2){
      var bcontainer = document.getElementById( 'row_' + i );
      var bSquare = document.createElement( 'div' );
      bSquare.classList.add("square", "black");
      bSquare.setAttribute("id", squareID[0]);
      bSquare.setAttribute("onclick", "selectSquare('"+ squareID[0] + "')");
      squareID.shift();
      bcontainer.appendChild( bSquare );
      var wcontainer = document.getElementById( 'row_' + (i + 1) );
      var wSquare = document.createElement( 'div' );
      wSquare.classList.add("square", "white");
      wSquare.setAttribute("id", squareID[0]);
      wSquare.setAttribute("onclick", "selectSquare('"+ squareID[0] + "')");
      squareID.shift();
      wcontainer.appendChild( wSquare );
    }
  }
  writeStatus("Board Loaded.");
}

function setupPieces(){
  var placements = {
    // Black pieces
    BQueen: ["d8","pieces/BQueen.png"],
    BKing: ["e8", "pieces/BKing.png"],
    Bbishopking: ["f8", "pieces/BBishop.png"],
    Bbishopqueen: ["c8", "pieces/BBishop.png"],
    BKnightking: ["g8", "pieces/BKnight.png"],
    BKnightqueen: ["b8", "pieces/BKnight.png"],
    BRookking: ["h8", "pieces/BRook.png"],
    BRookqueen: ["a8", "pieces/BRook.png"],
    BPawn1: ["a7", "pieces/BPawn.png"],
    BPawn2: ["b7", "pieces/BPawn.png"],
    BPawn3: ["c7", "pieces/BPawn.png"],
    BPawn4: ["d7", "pieces/BPawn.png"],
    BPawn5: ["e7", "pieces/BPawn.png"],
    BPawn6: ["f7", "pieces/BPawn.png"],
    BPawn7: ["g7", "pieces/BPawn.png"],
    BPawn8: ["h7", "pieces/BPawn.png"],
    // White pieces
    WQueen: ["d1","pieces/WQueen.png"],
    WKing: ["e1", "pieces/WKing.png"],
    WBishopking: ["f1", "pieces/WBishop.png"],
    WBishopqueen: ["c1", "pieces/WBishop.png"],
    WKnightking: ["g1", "pieces/WKnight.png"],
    WKnightqueen: ["b1", "pieces/WKnight.png"],
    WRookking: ["h1", "pieces/WRook.png"],
    WRookqueen: ["a1", "pieces/WRook.png"],
    WPawn1: ["a2", "pieces/WPawn.png"],
    WPawn2: ["b2", "pieces/WPawn.png"],
    WPawn3: ["c2", "pieces/WPawn.png"],
    WPawn4: ["d2", "pieces/WPawn.png"],
    WPawn5: ["e2", "pieces/WPawn.png"],
    WPawn6: ["f2", "pieces/WPawn.png"],
    WPawn7: ["g2", "pieces/WPawn.png"],
    WPawn8: ["h2", "pieces/WPawn.png"],
  }
  for(var piece in placements){
    var container = document.getElementById( placements[piece][0] );
    var img = document.createElement( 'img' );
    img.classList.add("piece");
    img.src = placements[piece][1]
    img.setAttribute("onclick", "selectPiece('" + piece + "')");
    img.setAttribute("id", piece);
    container.appendChild(img)
  }
  document.getElementById('Turn').innerHTML = window.turn
  document.getElementById('Piece').innerHTML = window.loaded
  document.getElementById('Destination').innerHTML = window.destination
  writeStatus("Setup completed.");
}

function chessSetup() {
  setVars()
  loadBoard()
  setupPieces()
}

// AI TODO:
