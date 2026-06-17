export const BOARD_SIZE = 9;
export const MINE_COUNT = 10;

export type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
};

export type Board = Cell[][];
export type GameStatus = "idle" | "playing" | "won" | "lost";

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0,
    }))
  );
}

export function placeMines(board: Board, firstRow: number, firstCol: number): Board {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  let placed = 0;

  while (placed < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (!newBoard[row][col].isMine && !(row === firstRow && col === firstCol)) {
      newBoard[row][col].isMine = true;
      placed++;
    }
  }

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (!newBoard[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && newBoard[nr][nc].isMine) {
              count++;
            }
          }
        }
        newBoard[r][c].neighborCount = count;
      }
    }
  }

  return newBoard;
}

export function revealCell(board: Board, row: number, col: number): Board {
  const newBoard = board.map(r => r.map(c => ({ ...c })));

  function reveal(r: number, c: number) {
    if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return;
    if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) return;
    newBoard[r][c].isRevealed = true;
    if (newBoard[r][c].neighborCount === 0 && !newBoard[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          reveal(r + dr, c + dc);
        }
      }
    }
  }

  reveal(row, col);
  return newBoard;
}

export function checkWin(board: Board): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (!board[r][c].isMine && !board[r][c].isRevealed) return false;
    }
  }
  return true;
}
