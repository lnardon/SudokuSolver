const board = [
  [" ", " ", " ", "7", "9", " ", " ", "5", " "],
  ["3", "5", "2", " ", " ", "8", " ", "4", " "],
  [" ", " ", " ", " ", " ", " ", " ", "8", " "],
  [" ", "1", " ", " ", "7", " ", " ", " ", "4"],
  ["6", " ", " ", "3", " ", "1", " ", " ", "8"],
  ["9", " ", " ", " ", "8", " ", " ", "1", " "],
  [" ", "2", " ", " ", " ", " ", " ", " ", " "],
  [" ", "4", " ", "5", " ", " ", "8", "9", "1"],
  [" ", "8", " ", " ", "3", "7", " ", " ", " "],
];

let selects = Array.from(document.getElementsByTagName("select"));
selects.forEach((el) => {
  el.addEventListener("change", (e) => {
    board[parseInt(e.target.attributes[0].nodeValue)][
      [parseInt(e.target.name)]
    ] = e.target.value;
  });
});

function checkSolution(board, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
      return false;
    }
  }
  return true;
}

function solveBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === " ") {
        for (let k = 1; k <= 9; k++) {
          if (checkSolution(board, i, j, k)) {
            board[i][j] = k;
            if (solveBoard(board)) {
              return true;
            } else {
              board[i][j] = " ";
            }
          }
        }
        return false;
      }
    }
  }
  // document.getElementsByClassName("solution")[0].innerText = board;
  console.log(board);
  alert("Solution printed to the console!");
  return true;
}
