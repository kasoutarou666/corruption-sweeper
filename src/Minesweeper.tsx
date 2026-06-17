import { useState, useCallback } from "react";
import {
  Board,
  GameStatus,
  BOARD_SIZE,
  MINE_COUNT,
  createEmptyBoard,
  placeMines,
  revealCell,
  checkWin,
} from "../lib/minesweeperLogic";

const NUMBER_COLORS: Record<number, string> = {
  1: "#3b82f6",
  2: "#22c55e",
  3: "#ef4444",
  4: "#7c3aed",
  5: "#b91c1c",
  6: "#0891b2",
  7: "#000",
  8: "#6b7280",
};

export function Minesweeper() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [status, setStatus] = useState<GameStatus>("idle");
  const [flagMode, setFlagMode] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINE_COUNT);
  const [time, setTime] = useState(0);
  const [timerRef, setTimerRef] = useState<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    const ref = setInterval(() => setTime(t => t + 1), 1000);
    setTimerRef(ref);
  };

  const stopTimer = () => {
    if (timerRef) clearInterval(timerRef);
  };

  const handleReset = () => {
    stopTimer();
    setBoard(createEmptyBoard());
    setStatus("idle");
    setFlagMode(false);
    setMinesLeft(MINE_COUNT);
    setTime(0);
    setTimerRef(null);
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    if (status === "won" || status === "lost") return;
    const cell = board[row][col];
    if (cell.isRevealed) return;

    // 旗モード
    if (flagMode) {
      if (cell.isRevealed) return;
      const newBoard = board.map(r => r.map(c => ({ ...c })));
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setMinesLeft(m => newBoard[row][col].isFlagged ? m - 1 : m + 1);
      setBoard(newBoard);
      return;
    }

    if (cell.isFlagged) return;

    // 初回クリック
    let currentBoard = board;
    if (status === "idle") {
      currentBoard = placeMines(board, row, col);
      setStatus("playing");
      startTimer();
    }

    // 地雷を踏んだ
    if (currentBoard[row][col].isMine) {
      const newBoard = currentBoard.map(r => r.map(c => ({
        ...c,
        isRevealed: c.isMine ? true : c.isRevealed,
      })));
      setBoard(newBoard);
      setStatus("lost");
      stopTimer();
      return;
    }

    const newBoard = revealCell(currentBoard, row, col);
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setStatus("won");
      stopTimer();
    }
  }, [board, status, flagMode]);

  const getCellContent = (row: number, col: number) => {
    const cell = board[row][col];
    if (cell.isFlagged && !cell.isRevealed) return "📋";
    if (!cell.isRevealed) return "";
    if (cell.isMine) return "🤵";
    if (cell.neighborCount === 0) return "㊙️";
    return cell.neighborCount.toString();
  };

  const getCellStyle = (row: number, col: number): React.CSSProperties => {
    const cell = board[row][col];
    const base: React.CSSProperties = {
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: cell.isRevealed && !cell.isMine && cell.neighborCount > 0 ? "0.85rem" : "1rem",
      fontWeight: "bold",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "4px",
      cursor: "pointer",
      userSelect: "none",
      color: NUMBER_COLORS[cell.neighborCount] ?? "white",
      transition: "all 0.1s",
    };

    if (!cell.isRevealed) {
      return {
        ...base,
        background: flagMode
          ? "rgba(239,68,68,0.2)"
          : "rgba(255,255,255,0.15)",
      };
    }

    if (cell.isMine) {
      return { ...base, background: "rgba(239,68,68,0.4)" };
    }

    return {
      ...base,
      background: "rgba(0,0,0,0.3)",
    };
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      color: "white",
      fontFamily: "sans-serif",
      padding: "16px",
    }}>
      <h1 style={{ fontSize: "1.3rem", marginBottom: "4px" }}>🔍 汚職議員を告発せよ！</h1>
      <p style={{ fontSize: "0.75rem", opacity: 0.6, marginBottom: "12px" }}>
        証拠を集めて汚職議員を暴け！
      </p>

      {/* ステータスバー */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "340px",
        marginBottom: "8px",
        padding: "8px 16px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "12px",
        fontSize: "0.9rem",
      }}>
        <span>🤵 {minesLeft}</span>
        <button
          onClick={handleReset}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          {status === "won" ? "🎉" : status === "lost" ? "💀" : "😤"}
        </button>
        <span>⏱️ {time}s</span>
      </div>

      {/* 告発モード切り替え */}
      <button
        onClick={() => setFlagMode(f => !f)}
        style={{
          marginBottom: "12px",
          padding: "8px 24px",
          background: flagMode
            ? "linear-gradient(135deg, #ef4444, #b91c1c)"
            : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50px",
          color: "white",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontWeight: "bold",
        }}
      >
        {flagMode ? "📋 告発状モード ON" : "📋 告発状モード OFF"}
      </button>

      {/* ボード */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 36px)`,
        gap: "2px",
        padding: "8px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
      }}>
        {Array.from({ length: BOARD_SIZE }, (_, row) =>
          Array.from({ length: BOARD_SIZE }, (_, col) => (
            <div
              key={`${row}-${col}`}
              style={getCellStyle(row, col)}
              onClick={() => handleCellClick(row, col)}
            >
              {getCellContent(row, col)}
            </div>
          ))
        )}
      </div>

      {/* ゲームオーバー・クリア */}
      {status === "lost" && (
        <div style={{
          marginTop: "16px",
          padding: "16px 24px",
          background: "rgba(239,68,68,0.2)",
          borderRadius: "12px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>💀 闇の力に葬られました</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>証拠隠滅されてしまいました…</p>
          <button
            onClick={handleReset}
            style={{
              marginTop: "8px",
              padding: "8px 24px",
              background: "linear-gradient(135deg, #e94560, #f5a623)",
              border: "none",
              borderRadius: "50px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            もう一度挑戦
          </button>
        </div>
      )}

      {status === "won" && (
        <div style={{
          marginTop: "16px",
          padding: "16px 24px",
          background: "rgba(34,197,94,0.2)",
          borderRadius: "12px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🎉 告発成功！</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>汚職議員を一掃した！{time}秒でクリア！</p>
          <button
            onClick={handleReset}
            style={{
              marginTop: "8px",
              padding: "8px 24px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              border: "none",
              borderRadius: "50px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            もう一度
          </button>
        </div>
      )}

      <div style={{ marginTop: "12px", fontSize: "0.7rem", opacity: 0.4, textAlign: "center" }}>
        タップで証拠収集 | 告発状モードで汚職議員をマーク
      </div>
    </div>
  );
}