import { useEffect, useState } from "react";

interface Cell {
  row: number;
  col: number;
  cell: string;
  piece: string | null;
  bgColor: string;
  cellType: string;
  r_label: number;
  c_label: string;
}

const Board = ({
  boardState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socket,
}: {
  boardState?: Record<string, string>;
  socket: unknown;
}) => {
  const [board, setBoard] = useState<Array<Array<Cell>>>([]);
  const default_board_state: Record<string, string> = {
    // Black pieces
    a1: "br",
    b1: "bn",
    c1: "bb",
    d1: "bq",
    e1: "bk",
    f1: "bb",
    g1: "bn",
    h1: "br",
    a2: "bp",
    b2: "bp",
    c2: "bp",
    d2: "bp",
    e2: "bp",
    f2: "bp",
    g2: "bp",
    h2: "bp",

    // White pieces
    a8: "wr",
    b8: "wn",
    c8: "wb",
    d8: "wq",
    e8: "wk",
    f8: "wb",
    g8: "wn",
    h8: "wr",
    a7: "wp",
    b7: "wp",
    c7: "wp",
    d7: "wp",
    e7: "wp",
    f7: "wp",
    g7: "wp",
    h7: "wp",
  };

  const [defatedPieces, setDefatedPieces] = useState<Array<string>>([]);

  const [move, setMove] = useState<{
    from: Cell | null;
    to: Cell | null;
  }>({
    from: null,
    to: null,
  });

  // const dragItem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const state = boardState || default_board_state;
    let prev = false;
    const currentBoard = new Array(8).fill(null).map((_, row) => {
      prev = !prev;
      return new Array(8).fill(null).map((_, col) => {
        const r_label = row + 1; // 8 - row
        const c_label = String.fromCharCode(col + 97);
        const cell = `${c_label}${r_label}`;
        prev = !prev;
        return {
          row,
          c_label,
          r_label,
          col,
          cell,
          piece: state[cell] || null,
          bgColor: prev ? "#739552" : "#ebecd0",
          cellType: prev ? "black" : "white",
        } as Cell;
      });
    });
    // console.log(currentBoard);

    setBoard(currentBoard);
  }, []);

  // useEffect(() => {}, [socket]);

  const handlePieceMove = (cell: Cell , type:string, presentEnd:boolean=false) => {
    console.log(">>>> handlePieceMove", type , move);
    
    if (cell?.piece && !move?.from) {
      const currMove = { ...move, from: cell };
      setMove(currMove);
      console.log(">>>> setMove", currMove);
      return;
    }
    if (move?.from && cell) {
      // check if move is valid, if valid do the below
      const madeMove = { 
        ...move, 
        to: presentEnd? move.to : cell 
      };
      setMove({ from: null, to: null });
      console.log(">>>> madeMove", madeMove);
      const { from, to } = madeMove;
      if (from && to) {
        console.log(">>>> moveChessPiece", from, to);
        const currentBoard = [...board];
        const curr_piece = from?.piece;
        const present_piece = to?.piece;
        if (
          curr_piece &&
          present_piece &&
          curr_piece.charAt(0) == present_piece.charAt(0)
        ) {
          console.log(">>>>>>> Invalid Move");
          return;
        }
        if (curr_piece && present_piece) {
          setDefatedPieces([...defatedPieces, present_piece]);
        }
        currentBoard[from.row][from.col].piece = null;
        currentBoard[to.row][to.col].piece = curr_piece;
        // if(present_piece){
        //   currentBoard[to.row][to.col].piece = null
        // }
        setBoard(currentBoard);
      }
      return;
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
    // handlePieceMove(cell , 'drag_start');
    const currMove = { from:cell, to: null };
    setMove(currMove);
    // const target = e.target as HTMLDivElement;
    // dragItem.current = target;
    // dragItem.current.addEventListener("dragend", () => handleDragOver(e, cell));
    // e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
    // console.log("handleDragEnter", e, cell);
    const currMove = { ...move, to: cell };
    setMove(currMove);
    e.preventDefault();
    // console.log(">>>>handleDragEnter setMove", currMove);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, cell: Cell) => {
    // console.log("handleDragOver", e, cell);
    // console.log(">>>>handleDragOver move", move);
    handlePieceMove(cell,'drag_end' , true);
    setMove({from:null, to: null });
    e.preventDefault();
  };

  return (
    <div>
      <div className="board-container p-12 flex">
        <div className="mt-10">
          {board.length > 0 &&
            board.map((_row, rowIndex) => (
              <div
                key={rowIndex}
                className="w-20 h-20 text-center leading-[80px]"
              >
                {rowIndex + 1}
              </div>
            ))}
        </div>

        <div className="">
          <div>
            <div className="flex">
              {board.length > 0 &&
                board.map((_row, rowIndex) => (
                  <div key={rowIndex} className="w-20 h-10 text-center">
                    {String.fromCharCode(rowIndex + 97)}
                  </div>
                ))}
            </div>
            <div className="board">
              {board.length > 0 &&
                board.map((row, rowIndex) => (
                  <div key={rowIndex} className="row flex">
                    {row.map((col, colIndex) => (
                      <div
                        onClick={() => handlePieceMove(col , 'click')}
                        key={colIndex}
                        className={`cell w-20 h-20`}
                        // className={`cell border-solid border-2 border-sky-500 w-20 h-20`}
                        style={{ backgroundColor: col.bgColor }}
                        onDragEnter={(e) => handleDragEnter(e, col)}
                        onDragEnd={(e) => handleDragOver(e, col)}
                      >
                        {col.piece && (
                          <img
                            draggable
                            onDragStart={(e) => handleDragStart(e, col)}
                            src={`${col.piece}.png`}
                            alt={col.piece}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
            <div className="flex">
              {board.length > 0 &&
                board.map((_row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="w-20 h-10 text-center leading-[40px]"
                  >
                    {String.fromCharCode(rowIndex + 97)}
                  </div>
                ))}
            </div>
          </div>

          {/* Defeated Piece Logic */}
          <div className="flex mt-10 max-w-[640px] flex-wrap">
            {defatedPieces.length > 0 &&
              defatedPieces.map((piece, index) => (
                <div
                  key={index}
                  className="w-10 h-10 text-center bg-slate-500 border-r-white border-r"
                >
                  <img src={`${piece}.png`} alt={piece} />
                </div>
              ))}
          </div>
        </div>
        <div className="mt-10">
          {board.length > 0 &&
            board.map((_row, rowIndex) => (
              <div
                key={rowIndex}
                className="w-20 h-20 text-center leading-[80px]"
              >
                {rowIndex + 1}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
