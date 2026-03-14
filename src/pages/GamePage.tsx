import { useCallback } from 'react';
import { useTetris } from '../hooks/useTetris';
import Board from '../components/Board/Board';
import ScoreBoard from '../components/ScoreBoard/ScoreBoard';
import GameOver from '../components/GameOver/GameOver';
import VoiceControl from '../components/VoiceControl/VoiceControl';
import Button from '../components/Button/Button';


const GamePage = () => {
  const { state, dispatch } = useTetris();

  const handleRestart = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch({ type: 'TOGGLE_PAUSE' });
  }, [dispatch]);

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
      }}
      tabIndex={-1}
      aria-label='Tetris game'
      role='application'
    >
      <h1 style={{ color: '#00f0f0', marginBottom: '20px', letterSpacing: '8px' }}>
        TETRIS
      </h1>

      {/* Spelområdet */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

        {/* Brädet med relativ position så GameOver-overlayn fungerar */}
        <div style={{ position: 'relative' }}>
          <Board
            board={state.board}
            currentPiece={state.currentPiece}
            position={state.position}
          />
          {state.gameOver && (
            <GameOver score={state.score} onRestart={handleRestart} />
          )}
        </div>

        {/* Höger sida – poäng och kontroller */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ScoreBoard
            score={state.score}
            level={state.level}
            lines={state.lines}
          />

          {/* Knappar */}
          <Button
  onClick={!state.currentPiece ? handleRestart : handlePause}
  variant={state.isPaused ? 'success' : 'warning'}
  ariaLabel={!state.currentPiece ? 'Start game' : state.isPaused ? 'Resume game' : 'Pause game'}
  fullWidth
>
  {!state.currentPiece ? 'STARTA' : state.isPaused ? 'FORTSÄTT' : 'PAUSA'}
</Button>

          {/* Kontroller-info */}
          <div
            style={{
              color: '#555',
              fontSize: '12px',
              lineHeight: '1.8',
              padding: '12px',
              border: '1px solid #333',
              borderRadius: '4px',
            }}
            aria-label="Game controls"
          >
            <p style={{ margin: 0, color: '#888' }}>KONTROLLER</p>
            <p style={{ margin: 0 }}>← → Flytta</p>
            <p style={{ margin: 0 }}>↑ Rotera</p>
            <p style={{ margin: 0 }}>↓ Snabbare</p>
            <p style={{ margin: 0 }}>P Pausa</p>
          </div>
          <VoiceControl
            onCommand={(command) => dispatch({ type: command as any })}
            isGameActive={!!state.currentPiece && !state.gameOver}
          />
        </div>
      </div>
    </main>
  );
};

export default GamePage;