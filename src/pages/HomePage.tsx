import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';


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

      <Button
  onClick={() => navigate('/game')}
  variant="primary"
  ariaLabel="Start playing Tetris"
>
  SPELA
</Button>

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