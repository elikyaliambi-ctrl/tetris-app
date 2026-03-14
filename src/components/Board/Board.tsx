import { useMemo } from 'react';
import type { Board as BoardType, Cell as CellType } from '../../types/tetris';
import type { Tetromino } from '../../types/tetris';
import Cell from '../Cell/Cell';

interface BoardProps {
  board: BoardType;
  currentPiece: Tetromino | null;
  position: { x: number; y: number };
}

const Board = ({ board, currentPiece, position }: BoardProps) => {
  // Kombinerar brädet med den aktiva biten – räknas bara om när något ändras
  const displayBoard = useMemo(() => {
    const newBoard = board.map(row => [...row]);

    if (currentPiece) {
      currentPiece.shape.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
          if (cell !== 0) {
            const y = position.y + rowIdx;
            const x = position.x + colIdx;
            if (y >= 0 && y < 20 && x >= 0 && x < 10) {
              newBoard[y][x] = [currentPiece.type, currentPiece.color] as CellType;
            }
          }
        });
      });
    }

    return newBoard;
  }, [board, currentPiece, position]);

  return (
    <div
      role="grid"
      aria-label="Tetris board"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(20, 30px)`,
        gridTemplateColumns: `repeat(10, 30px)`,
        border: '2px solid #444',
        backgroundColor: '#1a1a2e',
      }}
    >
      {displayBoard.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <Cell
            key={`${rowIdx}-${colIdx}`}
            type={cell[0]}
            color={cell[1]}
          />
        ))
      )}
    </div>
  );
};

export default Board;