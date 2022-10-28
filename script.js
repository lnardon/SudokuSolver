let board = [
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
      if (board[i][j] === " ") {
        for (let k = 1; k <= 9; k++) {
          let stringK = k.toString();
          if (isValid(board, i, j, stringK)) {
            selects[9 * i + j].value = k;
            board[i][j] = stringK;
            if (solveBoard()) {
              selects[9 * i + j].style.backgroundColor = "#0BE377";
              selects[9 * i + j].style.color = "black";
              return true;
            } else {
              board[i][j] = " ";
              selects[9 * i + j].style.backgroundColor = "transparent";
              selects[9 * i + j].value = " ";
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
  document.getElementsByClassName("feedback")[0].style.display = "none";
  document.getElementsByClassName("solveBtn")[0].disabled = true;
  if (!solveBoard()) {
    document.getElementsByClassName("feedback")[0].style.display = "block";
    document.getElementsByClassName("feedback")[0].style.animation =
      "popup 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) forwards";
  }
  document.getElementsByClassName("solveBtn")[0].disabled = false;
}

function clearBoard() {
  selects.forEach((select) => {
    select.value = " ";
    select.style.backgroundColor = "transparent";
    select.style.color = "white";
  });
  board = [...Array(9)].map(() => [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  document.getElementsByClassName("feedback")[0].style.animation =
    "popout 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) forwards";
  setTimeout(() => {
    document.getElementsByClassName("feedback")[0].style.display = "none";
  }, 400);
}
