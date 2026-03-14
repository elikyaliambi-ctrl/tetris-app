// Vilka färger/typer av bitar som finns
export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L' | 'EMPTY';

// En cell på brädet – antingen tom eller fylld med en färg
export type Cell = [TetrominoType, string];

// Brädet är ett 2D-rutnät av celler (20 rader, 10 kolumner)
export type Board = Cell[][];

// En Tetromino-bit har ett namn, form och färg
export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  color: string;
}

// Spelets state – allt spelet behöver hålla koll på
export interface GameState {
  board: Board;
  currentPiece: Tetromino | null;
  position: { x: number; y: number };
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  isPaused: boolean;
}