import type { Board, Cell, Tetromino, TetrominoType } from '../types/tetris';

// Alla 7 Tetromino-bitar med form och färg
export const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: {
    type: 'I',
    color: '#00f0f0',
    shape: [[1, 1, 1, 1]],
  },
  O: {
    type: 'O',
    color: '#f0f000',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    type: 'T',
    color: '#a000f0',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  S: {
    type: 'S',
    color: '#00f000',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    type: 'Z',
    color: '#f00000',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  J: {
    type: 'J',
    color: '#0000f0',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  L: {
    type: 'L',
    color: '#f0a000',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  EMPTY: {
    type: 'EMPTY',
    color: '',
    shape: [],
  },
};

// Skapar ett tomt bräde – 20 rader och 10 kolumner
export const createEmptyBoard = (): Board =>
  Array.from({ length: 20 }, () =>
    Array.from({ length: 10 }, (): Cell => ['EMPTY', ''])
  );

// Väljer en slumpmässig bit
export const randomTetromino = (): Tetromino => {
  const pieces: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const random = pieces[Math.floor(Math.random() * pieces.length)];
  return TETROMINOES[random];
};

// Kollar om en bit krockar med väggar eller andra bitar
export const isValidMove = (
  board: Board,
  shape: number[][],
  pos: { x: number; y: number }
): boolean => {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const newX = pos.x + col;
        const newY = pos.y + row;

        // Utanför vänster/höger vägg?
        if (newX < 0 || newX >= 10) return false;
        // Utanför botten?
        if (newY >= 20) return false;
        // Krockar med en befintlig bit?
        if (newY >= 0 && board[newY][newX][0] !== 'EMPTY') return false;
      }
    }
  }
  return true;
};

// Tar bort fyllda rader och returnerar nya brädet + antal rader borttagna
export const clearLines = (board: Board): { newBoard: Board; linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell[0] === 'EMPTY'));
  const linesCleared = 20 - newBoard.length;

  // Lägg till tomma rader högst upp för varje borttagen rad
  const emptyRows = Array.from({ length: linesCleared }, () =>
    Array.from({ length: 10 }, (): Cell => ['EMPTY', ''])
  );

  return { newBoard: [...emptyRows, ...newBoard], linesCleared };
};

// Beräknar poäng baserat på antal rader och level
export const calculateScore = (lines: number, level: number): number => {
  const points = [0, 100, 300, 500, 800];
  return points[lines] * (level + 1);
};
