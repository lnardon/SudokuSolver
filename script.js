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

const feedbackElement = document.getElementsByClassName("feedback")[0];
const selects = Array.from(document.getElementsByTagName("select"));

selects.forEach((el, index) => {
  el.addEventListener("change", (e) => {
    board[parseInt(e.target.attributes[0].nodeValue)][
      [parseInt(e.target.name)]
    ] = e.target.value;
  });
});

function isAlternativeValid(board, row, col, alternative) {
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
          if (isAlternativeValid(board, i, j, stringK)) {
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

function isBoardValid() {
  const set = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const value = board[i][j];
      if (value !== " ") {
        const row = `v:${value} r:${i}`;
        const column = `v:${value} c:${j}`;
        const box = `v:${value} b:${Math.floor(i / 3)}, ${Math.floor(j / 3)}`;
        if (set.has(row) || set.has(column) || set.has(box)) {
          return false;
        } else {
          set.add(row);
          set.add(column);
          set.add(box);
        }
      }
    }
  }

  return true;
}

function handleSolver() {
  const solveButton = document.getElementsByClassName("solveBtn")[0];
  feedbackElement.style.display = "none";
  solveButton.disabled = true;
  if (isBoardValid()) {
    solveBoard();
  } else {
    feedbackElement.style.display = "block";
    feedbackElement.style.animation =
      "popup 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) forwards";
  }
  solveButton.disabled = false;
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
