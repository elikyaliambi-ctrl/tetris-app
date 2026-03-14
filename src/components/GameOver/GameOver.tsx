import { memo } from 'react';

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
      <button
        onClick={onRestart}
        autoFocus
        style={{
          marginTop: '20px',
          padding: '12px 32px',
          backgroundColor: '#00f0f0',
          color: '#1a1a2e',
          border: 'none',
          borderRadius: '4px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'monospace',
        }}
        // Tillgänglighet – tydlig label för skärmläsare
        aria-label="Restart game"
      >
        SPELA IGEN
      </button>
    </div>
  );
});

export default GameOver;