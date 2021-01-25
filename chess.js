function writeStatus(text){
  var writeTo = document.getElementById( 'status' );
  writeTo.innerHTML += (text + "<br>")
  writeTo.scrollTop = writeTo.scrollHeight;
}

function selectPiece(piece){
  window.loaded = piece
  document.getElementById('Piece').innerHTML = window.loaded
  writeStatus(piece + " selected.")
}
function selectSquare(square){
  writeStatus(square + " selected.")
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
    BBishopKing: ["f8", "pieces/BBishop.png"],
    BBishopQueen: ["c8", "pieces/BBishop.png"],
    BKnightKing: ["g8", "pieces/BKnight.png"],
    BKnightQueen: ["b8", "pieces/BKnight.png"],
    BRookKing: ["h8", "pieces/BRook.png"],
    BRookQueen: ["a8", "pieces/BRook.png"],
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
    WBishopKing: ["f1", "pieces/WBishop.png"],
    WBishopQueen: ["c1", "pieces/WBishop.png"],
    WKnightKing: ["g1", "pieces/WKnight.png"],
    WKnightQueen: ["b1", "pieces/WKnight.png"],
    WRookKing: ["h1", "pieces/WRook.png"],
    WRookQueen: ["a1", "pieces/WRook.png"],
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
    container.appendChild(img)
  }
  writeStatus("Pieces loaded in primary positions.");
  document.getElementById('Turn').innerHTML = window.turn
  writeStatus("Turn set.")
  document.getElementById('Piece').innerHTML = window.loaded
}

function chessSetup() {
  window.turn = "white"
  window.loaded = "None"
  loadBoard()
  setupPieces()
}
