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
selects.forEach((el, index) => {
  el.addEventListener("change", (e) => {
    board[parseInt(e.target.attributes[0].nodeValue)][
      [parseInt(e.target.name)]
    ] = e.target.value;
  });
});

function isValid(board, row, col, alternative) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i] === alternative ||
      board[i][col] === alternative ||
      board[m][n] === alternative
    ) {
      return false;
    }
  }
  return true;
}

function solveBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == " ") {
        for (let k = 1; k <= 9; k++) {
          let stringK = k.toString();
          if (isValid(board, i, j, stringK)) {
            selects[9 * i + j].value = k;
            selects[9 * i + j].style.backgroundColor = "#C20A00";
            board[i][j] = stringK;
            if (solveBoard()) {
              selects[9 * i + j].style.backgroundColor = "#0BE377";
              selects[9 * i + j].style.color = "black";
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
  return true;
}

function handleSolver() {
  document.getElementsByClassName("solveBtn")[0].disabled = true;
  if (!solveBoard()) {
    alert("Solution could not be found.");
  }
  document.getElementsByClassName("solveBtn")[0].disabled = false;
}
