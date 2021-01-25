function makeBoard() {
  var i;
  var j;
  for (i = 0; i < 8; i++) {
    currentRow = document.getElementById( 'row_' + i );
    console.log(currentRow)
    for (j = 0; j < 8; j++) {
      l = "Hello";
    }
  }
}

function chessLoop() {
  makeBoard();
}
