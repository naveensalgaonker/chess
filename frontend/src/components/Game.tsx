import { useEffect, useState } from "react";

const Game = ({ boardState }: { boardState?: Record<string, string> }) => {
  const [board, setBoard] = useState<Array<Array<{ row: number; col: number; cell: string; piece: string | null }>>>([]);
  const default_board_state: Record<string, string> = {
    // Black pieces
    'a1': 'br', 'b1': 'bn', 'c1': 'bb', 'd1': 'bq', 'e1': 'bk', 'f1': 'bb', 'g1': 'bn', 'h1': 'br',
    'a2': 'bp', 'b2': 'bp', 'c2': 'bp', 'd2': 'bp', 'e2': 'bp', 'f2': 'bp', 'g2': 'bp', 'h2': 'bp',
  
    // White pieces
    'a8': 'wr', 'b8': 'wn', 'c8': 'wb', 'd8': 'wq', 'e8': 'wk', 'f8': 'wb', 'g8': 'wn', 'h8': 'wr',
    'a7': 'wp', 'b7': 'wp', 'c7': 'wp', 'd7': 'wp', 'e7': 'wp', 'f7': 'wp', 'g7': 'wp', 'h7': 'wp',
  };

  useEffect(() => {
    let state = boardState || default_board_state;
    let currentBoard = new Array(8).fill(null).map((_, row) => 
      new Array(8).fill(null).map((_, col) => {
        let cell = `${String.fromCharCode(col+97)}${8-row}`
        return { row: 8-row, col, cell, piece: state[cell] || null };
      })
    );
    console.log(currentBoard);
    
    setBoard(currentBoard);
  }, [boardState]);

  return (
    <div>
      <div className="board-container p-12">
        <div className="board">
          {board.length > 0 && board.map((row, rowIndex) => (
            <div key={rowIndex} className="row flex">
              {row.map((col, colIndex) => (
                <div key={colIndex} className="cell border-solid border-2 border-sky-500 w-20 h-20">
                  {col.piece &&
                    <img src={`${col.piece}.png`} alt={col.piece} />
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game