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

// function checkSolution(board, row, col, k) {
//   for (let i = 0; i < 9; i++) {
//     const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
//     const n = 3 * Math.floor(col / 3) + (i % 3);
//     if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
//       return false;
//     }
//   }
//   return true;
// }

// function solveBoard() {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (board[i][j] == " ") {
//         for (let k = 1; k <= 9; k++) {
//           if (checkSolution(board, i, j, k)) {
//             board[i][j] = k;
//             selects[9 * i + j].value = k;
//             selects[9 * i + j].style.backgroundColor = "green";
//             if (solveBoard(board)) {
//               selects[9 * i + j].style.backgroundColor = "blue";
//               return true;
//             } else {
//               board[i][j] = " ";
//             }
//           }
//         }
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function t() {
//   console.log(solveBoard());
// }

function isBoardValid() {
  return verifyRows() && verifyColumns() && verifyBoxes();
}

function verifyRows() {
  for (let i = 0; i < 9; i++) {
    let current = [];
    for (let j = 0; j < 9; j++) {
      if (current.includes(board[i][j])) {
        return false;
      } else if (board[i][j] != " ") {
        current.push(board[i][j]);
      }
    }
  }
  return true;
}

function verifyColumns() {
  for (let i = 0; i < 9; i++) {
    let current = [];
    for (let j = 0; j < 9; j++) {
      if (current.includes(board[j][i])) {
        return false;
      } else if (board[j][i] != " ") {
        current.push(board[j][i]);
      }
    }
  }
  return true;
}

function verifyBoxes() {
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  for (let y = 0; y < 9; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      let current = [];
      for (let i = 0; i < 9; i++) {
        let coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;
        if (current.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]] != " ") {
          current.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
}
