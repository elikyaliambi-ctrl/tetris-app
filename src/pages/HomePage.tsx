import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      {/* Titeln faller in uppifrån */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ fontSize: '72px', color: '#00f0f0', letterSpacing: '12px', margin: 0 }}
      >
        TETRIS
      </motion.h1>

      {/* Undertexten tonar in */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ color: '#888', marginTop: '10px', fontSize: '16px' }}
      >
        Det klassiska spelet
      </motion.p>

      {/* Knappen poppar in */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        style={{ marginTop: '40px' }}
      >
        <Button
          onClick={() => navigate('/game')}
          variant="primary"
          ariaLabel="Start playing Tetris"
        >
          SPELA CHIPPES TETRIS
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ marginTop: '40px', color: '#555', fontSize: '12px', lineHeight: '2' }}
      >
        <p style={{ margin: 0 }}>← → Flytta</p>
        <p style={{ margin: 0 }}>↑ Rotera</p>
        <p style={{ margin: 0 }}>↓ Snabbare</p>
        <p style={{ margin: 0 }}>P Pausa</p>
      </motion.div>
    </main>
  );
};

export default HomePage;