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
  if (
    [
      2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56,
      59, 62, 65, 68, 71, 74, 77, 80,
    ].filter((er) => index === er).length > 0
  ) {
    el.style.marginRight = "1.5rem";
  }
  if ([18, 45].filter((er) => index === er).length > 0) {
    el.style.marginBottom = "1.5rem";
  }
});

function isValid(board, row, col, alternative) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i] == alternative ||
      board[i][col] == alternative ||
      board[m][n] == alternative
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
          if (isValid(board, i, j, k)) {
            selects[9 * i + j].value = k;
            selects[9 * i + j].style.backgroundColor = "red";
            board[i][j] = k.toString();
            if (solveBoard()) {
              selects[9 * i + j].style.backgroundColor = "green";
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
