import { memo } from 'react';
import type { TetrominoType } from '../../types/tetris';

interface CellProps {
  type: TetrominoType;
  color: string;
}

// memo = React ritar bara om cellen om dess värden ändrats (prestandaoptimering)
const Cell = memo(({ type, color }: CellProps) => {
  const isEmpty = type === 'EMPTY';

  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: isEmpty ? '#1a1a2e' : color,
        border: isEmpty ? '1px solid #2a2a4a' : `1px solid ${color}`,
        boxShadow: isEmpty ? 'none' : `inset 2px 2px 4px rgba(255,255,255,0.3)`,
        borderRadius: '2px',
      }}
      // Tillgänglighet – skärmläsare förstår vad cellen är
      role="gridcell"
      aria-label={isEmpty ? 'empty cell' : `${type} piece`}
    />
  );
});

export default Cell;