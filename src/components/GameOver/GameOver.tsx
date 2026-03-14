import { memo } from 'react';
import Button from '../Button/Button';


interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver = memo(({ score, onRestart }: GameOverProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'monospace',
        zIndex: 10,
      }}
      role="alertdialog"
      aria-label="Game over"
      aria-modal="true"
    >
      <h2 style={{ color: '#f00000', fontSize: '48px', margin: 0 }}>
        GAME OVER
      </h2>
      <p style={{ color: '#888', fontSize: '18px' }}>
        Slutpoäng: <span style={{ color: '#00f0f0' }}>{score}</span>
      </p>
      <Button
  onClick={onRestart}
  variant="primary"
  ariaLabel="Restart game"
>
  SPELA IGEN
</Button>
    </div>
  );
});

export default GameOver;