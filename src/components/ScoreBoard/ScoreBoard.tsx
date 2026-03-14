import { memo } from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

const ScoreBoard = memo(({ score, level, lines }: ScoreBoardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#1a1a2e',
        border: '2px solid #444',
        borderRadius: '8px',
        minWidth: '150px',
        color: 'white',
        fontFamily: 'monospace',
      }}
      // Tillgänglighet – uppdateras automatiskt för skärmläsare
      aria-live="polite"
      aria-label="Game statistics"
    >
      <div>
        <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>POÄNG</p>
        <p style={{ color: '#00f0f0', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          {score}
        </p>
      </div>

      <div>
        <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>LEVEL</p>
        <p style={{ color: '#f0a000', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          {level}
        </p>
      </div>

      <div>
        <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>RADER</p>
        <p style={{ color: '#00f000', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          {lines}
        </p>
      </div>
    </div>
  );
});

export default ScoreBoard;