import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { motion } from 'framer-motion';

interface GameOverProps {
  score: number;
  level: number;
  onRestart: () => void;
}

const GameOver = memo(({ score, level, onRestart }: GameOverProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const saveScore = () => {
    if (!name.trim()) return;

    const entry = {
      name: name.trim(),
      score,
      level,
      date: new Date().toLocaleDateString('sv-SE'),
    };

    const existing = localStorage.getItem('tetris-highscores');
    const scores = existing ? JSON.parse(existing) : [];
    const updated = [...scores, entry].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem('tetris-highscores', JSON.stringify(updated));
    setSaved(true);
  };

  return (
    // motion.div istället för div, tonar in smidigt
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
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
        gap: '12px',
      }}
      role="alertdialog"
      aria-label="Game over"
      aria-modal="true"
    >
      <h2 style={{ color: '#f00000', fontSize: '48px', margin: 0 }}>
        DU TORSKADE!
      </h2>
      <p style={{ color: '#888', fontSize: '18px', margin: 0 }}>
        Slutpoäng: <span style={{ color: '#00f0f0' }}>{score}</span>
      </p>

      {!saved ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Skriv ditt namn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={15}
            autoFocus
            style={{
              padding: '10px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              textAlign: 'center',
            }}
            aria-label="Enter your name for highscore"
          />
          <Button onClick={saveScore} variant="primary" ariaLabel="Save score">
            SPARA POÄNG
          </Button>
        </div>
      ) : (
        <p style={{ color: '#00f000' }}>✓ Poäng sparad!</p>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <Button onClick={onRestart} variant="warning" ariaLabel="Restart game">
          SPELA IGEN
        </Button>
        <Button onClick={() => navigate('/highscore')} variant="primary" ariaLabel="View highscores">
          HIGHSCORE
        </Button>
      </div>
    </motion.div> // avslutande motion.div
  );
});

export default GameOver;