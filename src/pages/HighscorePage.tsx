import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';

interface HighscoreEntry {
  name: string;
  score: number;
  level: number;
  date: string;
}

const HighscorePage = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<HighscoreEntry[]>([]);

  // Hämta highscores från localStorage när sidan laddas
  useEffect(() => {
    const saved = localStorage.getItem('tetris-highscores');
    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []);

  const clearScores = () => {
    localStorage.removeItem('tetris-highscores');
    setScores([]);
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0d0d1a',
        padding: '20px',
        fontFamily: 'monospace',
        color: 'white',
      }}
    >
      <h1 style={{ color: '#00f0f0', letterSpacing: '8px' }}>HIGHSCORE</h1>

      {scores.length === 0 ? (
        <p style={{ color: '#888', marginTop: '40px' }}>
          Inga highscores än – spela ett spel!
        </p>
      ) : (
        <table
          style={{ marginTop: '30px', borderCollapse: 'collapse', width: '400px' }}
          aria-label="Highscore table"
        >
          <thead>
            <tr style={{ color: '#888', fontSize: '12px' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>#</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>NAMN</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>POÄNG</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>LEVEL</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>DATUM</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr
                key={index}
                style={{
                  borderTop: '1px solid #333',
                  color: index === 0 ? '#f0a000' : 'white',
                }}
              >
                <td style={{ padding: '8px' }}>{index + 1}</td>
                <td style={{ padding: '8px' }}>{entry.name}</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#00f0f0' }}>
                  {entry.score}
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{entry.level}</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#888', fontSize: '11px' }}>
                  {entry.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
        <Button onClick={() => navigate('/')} variant="primary" ariaLabel="Go to home">
          HEM
        </Button>
        <Button onClick={() => navigate('/game')} variant="warning" ariaLabel="Play again">
          SPELA
        </Button>
        {scores.length > 0 && (
          <Button onClick={clearScores} variant="danger" ariaLabel="Clear highscores">
            RENSA
          </Button>
        )}
      </div>
    </main>
  );
};

export default HighscorePage;