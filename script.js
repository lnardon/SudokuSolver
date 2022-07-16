function checkSolution(board, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
      return false;
    }
  }
  return true;
}

function solveBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == " ") {
        for (let k = 1; k <= 9; k++) {
          if (checkSolution(board, i, j, k)) {
            board[i][j] = `${k}`;
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
  return true;
}
