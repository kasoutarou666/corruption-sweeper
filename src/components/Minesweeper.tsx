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
import { POLITICIANS } from "../lib/politicians";

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
  const [showNFT, setShowNFT] = useState(false);
  const [nftRevealed, setNftRevealed] = useState(false);
  const [selectedPolitician] = useState(
    POLITICIANS[Math.floor(Math.random() * POLITICIANS.length)]
  );
  const [nftFlipped, setNftFlipped] = useState(false);

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
    setShowNFT(false);
    setNftRevealed(false);
  };

  const handleNFTReveal = () => {
    setShowNFT(true);
    setTimeout(() => setNftRevealed(true), 500);
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    if (status === "won" || status === "lost") return;
    const cell = board[row][col];
    if (cell.isRevealed) return;

    if (flagMode) {
      if (cell.isRevealed) return;
      const newBoard = board.map(r => r.map(c => ({ ...c })));
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setMinesLeft(m => newBoard[row][col].isFlagged ? m - 1 : m + 1);
      setBoard(newBoard);
      return;
    }

    if (cell.isFlagged) return;

    let currentBoard = board;
    if (status === "idle") {
      currentBoard = placeMines(board, row, col);
      setStatus("playing");
      startTimer();
    }

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
    if (cell.neighborCount === 0) return "";
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
      border: "2px solid rgba(255,255,255,0.3)",
      borderRadius: "4px",
      cursor: "pointer",
      userSelect: "none",
      color: NUMBER_COLORS[cell.neighborCount] ?? "white",
      transition: "all 0.1s",
    };
    if (!cell.isRevealed) {
      return { ...base, background: flagMode ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.15)" };
    }
    if (cell.isMine) return { ...base, background: "rgba(239,68,68,0.4)" };
    return { ...base, background: "rgba(0,0,0,0.3)" };
  };

  // NFTカードのセルスタイル
  const getNFTCellStyle = (row: number, col: number): React.CSSProperties => {
    const cell = board[row][col];
    return {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.8rem",
      border: "1px solid rgba(255,215,0,0.4)",
      borderRadius: "3px",
      background: cell.isMine ? "rgba(239,68,68,0.4)" : "rgba(0,0,0,0.5)",
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
      <p style={{ fontSize: "0.75rem", opacity: 0.6, marginBottom: "12px" }}>証拠を集めて汚職議員を暴け！</p>

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
        <button onClick={handleReset} style={{ background: "none", border: "none", color: "white", fontSize: "1.2rem", cursor: "pointer" }}>
          {status === "won" ? "🎉" : status === "lost" ? "💀" : "😤"}
        </button>
        <span>⏱️ {time}s</span>
      </div>

      <button
        onClick={() => setFlagMode(f => !f)}
        style={{
          marginBottom: "12px",
          padding: "8px 24px",
          background: flagMode ? "linear-gradient(135deg, #ef4444, #b91c1c)" : "rgba(255,255,255,0.1)",
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
            <div key={`${row}-${col}`} style={getCellStyle(row, col)} onClick={() => handleCellClick(row, col)}>
              {getCellContent(row, col)}
            </div>
          ))
        )}
      </div>

      {status === "lost" && (
        <div style={{ marginTop: "16px", padding: "16px 24px", background: "rgba(239,68,68,0.2)", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>💀 闇の力に葬られました</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>証拠隠滅されてしまいました…</p>
          <button onClick={handleReset} style={{ marginTop: "8px", padding: "8px 24px", background: "linear-gradient(135deg, #e94560, #f5a623)", border: "none", borderRadius: "50px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            もう一度挑戦
          </button>
        </div>
      )}

      {status === "won" && !showNFT && (
        <div style={{ marginTop: "16px", padding: "16px 24px", background: "rgba(34,197,94,0.2)", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🎉 告発成功！</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>汚職議員を一掃した！{time}秒でクリア！</p>
          <button
            onClick={handleNFTReveal}
            style={{ marginTop: "8px", padding: "10px 24px", background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", borderRadius: "50px", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem" }}
          >
            🖼️ 告発した議員をNFTで確認！
          </button>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "8px" }}>
            <button
              onClick={() => {
                const text = `🔍 汚職議員を告発せよ！\n${time}秒で告発成功！証拠を集めて闇を暴いたで！\nhttps://corruption-sweeper.vercel.app\n#汚職議員を告発せよ #FarcasterMiniApp`;
                window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`, "_blank");
              }}
              style={{ padding: "8px 16px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", border: "none", borderRadius: "50px", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}
            >
              🟣 Farcasterでシェア
            </button>
            <button
              onClick={() => {
                const text = `🔍 汚職議員を告発せよ！\n${time}秒で告発成功！\nhttps://corruption-sweeper.vercel.app\n#汚職議員を告発せよ`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
              }}
              style={{ padding: "8px 16px", background: "linear-gradient(135deg, #000, #333)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50px", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}
            >
              𝕏 でシェア
            </button>
          </div>
          <button onClick={handleReset} style={{ marginTop: "8px", padding: "8px 24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50px", color: "white", cursor: "pointer" }}>
            もう一度
          </button>
        </div>
      )}

      {/* NFTリビール */}
      {showNFT && (
        <div style={{
          marginTop: "16px",
          padding: "20px",
          background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
          border: "2px solid rgba(255,215,0,0.5)",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "300px",
          width: "100%",
          transition: "all 0.5s",
          opacity: nftRevealed ? 1 : 0,
          transform: nftRevealed ? "scale(1)" : "scale(0.8)",
        }}>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,215,0,0.8)", marginBottom: "4px", letterSpacing: "2px" }}>
            ✨ CORRUPTION RECORD NFT ✨
          </p>
          <p style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "12px" }}>
            告発記録 #{Math.floor(Math.random() * 9999).toString().padStart(4, "0")}
          </p>

          <div
            onClick={() => setNftFlipped(true)}
            style={{
              width: "160px",
              height: "200px",
              margin: "0 auto 12px",
              borderRadius: "12px",
              border: `2px solid ${selectedPolitician.color}`,
              background: "rgba(0,0,0,0.6)",
              cursor: nftFlipped ? "default" : "pointer",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.5s",
            }}
          >
            {!nftFlipped ? (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #2c3e50, #1a1a2e)",
              }}>
                <p style={{ fontSize: "2rem" }}>🔒</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>タップでリビール</p>
              </div>
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}>
                <svg width="80" height="80" viewBox="0 0 32 32" style={{ marginBottom: "8px" }}
                  dangerouslySetInnerHTML={{ __html: selectedPolitician.svgPath }}
                />
                <p style={{ fontSize: "1rem", fontWeight: "bold", color: selectedPolitician.color }}>
                  {selectedPolitician.name}
                </p>
                <p style={{ fontSize: "0.65rem", opacity: 0.7, marginTop: "4px", padding: "0 8px" }}>
                  容疑：{selectedPolitician.crime}
                </p>
              </div>
            )}
          </div>

          <p style={{ fontSize: "0.7rem", opacity: 0.5, marginBottom: "12px" }}>
            この告発記録はブロックチェーンに刻まれた⛓️
          </p>

          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <button
              onClick={() => {
                const text = `🖼️ 汚職議員「${selectedPolitician.name}」を告発！\n${time}秒でクリア！\nこの記録はブロックチェーンに刻まれた⛓️\nhttps://corruption-sweeper.vercel.app\n#汚職議員を告発せよ #NFT #Base`;
                window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`, "_blank");
              }}
              style={{ padding: "8px 16px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", border: "none", borderRadius: "50px", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}
            >
              🟣 NFTをシェア
            </button>
            <button onClick={handleReset} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50px", color: "white", cursor: "pointer", fontSize: "0.8rem" }}>
              もう一度
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "12px", fontSize: "0.7rem", opacity: 0.4, textAlign: "center" }}>
        タップで証拠収集 | 告発状モードで汚職議員をマーク
      </div>
    </div>
  );
}