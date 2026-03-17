import { useCallback, useEffect, useReducer } from 'react';
import {
  createEmptyBoard,
  randomTetromino,
  isValidMove,
  clearLines,
  calculateScore,
} from '../utils/tetrisLogic';
import type { GameState } from '../types/tetris';

// Start för spelet
const initialState: GameState = {
  board: createEmptyBoard(),
  currentPiece: null,
  position: { x: 4, y: 0 },
  score: 0,
  level: 0,
  lines: 0,
  gameOver: false,
  isPaused: false,
};

// Alla händelser i spelet
type Action =
  | { type: 'START_GAME' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'ROTATE' }
  | { type: 'HARD_DROP' }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'TICK' };

// Reducern, tar emot state o händelse o returnerar nytt state
function tetrisReducer(state: GameState, action: Action): GameState {
  if (state.gameOver && action.type !== 'START_GAME') return state;
  if (state.isPaused && action.type !== 'TOGGLE_PAUSE') return state;

  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        board: createEmptyBoard(),
        currentPiece: randomTetromino(),
        position: { x: 4, y: 0 },
      };

    case 'TOGGLE_PAUSE':
      return { ...state, isPaused: !state.isPaused };

    case 'MOVE_LEFT': {
      const newPos = { ...state.position, x: state.position.x - 1 };
      if (!state.currentPiece) return state;
      if (isValidMove(state.board, state.currentPiece.shape, newPos)) {
        return { ...state, position: newPos };
      }
      return state;
    }

    case 'MOVE_RIGHT': {
      const newPos = { ...state.position, x: state.position.x + 1 };
      if (!state.currentPiece) return state;
      if (isValidMove(state.board, state.currentPiece.shape, newPos)) {
        return { ...state, position: newPos };
      }
      return state;
    }

    case 'ROTATE': {
      if (!state.currentPiece) return state;
      // Rotera formen 90 grader 
      const rotated = state.currentPiece.shape[0].map((_, i) =>
        state.currentPiece!.shape.map(row => row[i]).reverse()
      );
      if (isValidMove(state.board, rotated, state.position)) {
        return {
          ...state,
          currentPiece: { ...state.currentPiece, shape: rotated },
        };
      }
      return state;
    }

    case 'TICK':
    case 'MOVE_DOWN': {
      if (!state.currentPiece) return state;
      const newPos = { ...state.position, y: state.position.y + 1 };

      // Kan biten röra sig nedåt
      if (isValidMove(state.board, state.currentPiece.shape, newPos)) {
        return { ...state, position: newPos };
      }

      // Biten har landat, placera den på brädet
      const newBoard = state.board.map(row => [...row]);
      state.currentPiece.shape.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
          if (cell !== 0) {
            const y = state.position.y + rowIdx;
            const x = state.position.x + colIdx;
            if (y >= 0) {
              newBoard[y][x] = [
                state.currentPiece!.type,
                state.currentPiece!.color,
              ];
            }
          }
        });
      });

      // Rensa fyllda rader
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      const newLines = state.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10);
      const newScore = state.score + calculateScore(linesCleared, state.level);

      // Ny bit, är spelet över?
      const nextPiece = randomTetromino();
      const startPos = { x: 4, y: 0 };
      const gameOver = !isValidMove(clearedBoard, nextPiece.shape, startPos);

      return {
        ...state,
        board: clearedBoard,
        currentPiece: nextPiece,
        position: startPos,
        score: newScore,
        level: newLevel,
        lines: newLines,
        gameOver,
      };
    }

    default:
      return state;
  }
}

// Själva hooken som komponenter använder
export const useTetris = () => {
  const [state, dispatch] = useReducer(tetrisReducer, initialState);

  // Automatisk rörelse nerpt baserat på level
  useEffect(() => {
    if (state.gameOver || state.isPaused || !state.currentPiece) return;
    const speed = Math.max(100, 800 - state.level * 70);
    const interval = setInterval(() => dispatch({ type: 'TICK' }), speed);
    return () => clearInterval(interval);
  }, [state.gameOver, state.isPaused, state.currentPiece, state.level]);

  // Tangentbordsstyrning
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':  dispatch({ type: 'MOVE_LEFT' }); break;
      case 'ArrowRight': dispatch({ type: 'MOVE_RIGHT' }); break;
      case 'ArrowDown':  dispatch({ type: 'MOVE_DOWN' }); break;
      case 'ArrowUp':    dispatch({ type: 'ROTATE' }); break;
      case ' ':          dispatch({ type: 'HARD_DROP' }); break;
      case 'p':          dispatch({ type: 'TOGGLE_PAUSE' }); break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { state, dispatch };
};