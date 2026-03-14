import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0d0d1a',
        fontFamily: 'monospace',
        color: 'white',
      }}
    >
      <h1
        style={{
          fontSize: '72px',
          color: '#00f0f0',
          letterSpacing: '12px',
          margin: 0,
        }}
      >
        TETRIS
      </h1>

      <p style={{ color: '#888', marginTop: '10px', fontSize: '16px' }}>
        Det klassiska spelet
      </p>

      <button
        onClick={() => navigate('/game')}
        style={{
          marginTop: '40px',
          padding: '16px 48px',
          backgroundColor: '#00f0f0',
          color: '#1a1a2e',
          border: 'none',
          borderRadius: '4px',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'monospace',
          letterSpacing: '4px',
        }}
        aria-label="Start playing Tetris"
        autoFocus
      >
        SPELA
      </button>

      <div style={{ marginTop: '40px', color: '#555', fontSize: '12px', lineHeight: '2' }}>
        <p style={{ margin: 0 }}>← → Flytta</p>
        <p style={{ margin: 0 }}>↑ Rotera</p>
        <p style={{ margin: 0 }}>↓ Snabbare</p>
        <p style={{ margin: 0 }}>P Pausa</p>
      </div>
    </main>
  );
};

export default HomePage;