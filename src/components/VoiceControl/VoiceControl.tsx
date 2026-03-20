import { useState, useCallback } from 'react';

interface VoiceControlProps {
  onCommand: (command: string) => void;
  isGameActive: boolean;
}

const VoiceControl = ({ onCommand, isGameActive }: VoiceControlProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState<'idle' | 'recording' | 'loading' | 'error'>('idle');
  const [lastCommand, setLastCommand] = useState<string>('');

  const startRecording = useCallback(async () => {
    if (!isGameActive || isRecording) return;

    try {
      // Be om tillstånd att använda mikrofonen
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
      ? 'audio/webm' 
      : 'audio/ogg';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      const audioChunks: BlobPart[] = [];

      setIsRecording(true);
      setStatus('recording');

      // Samla ihop ljuddata medan vi spelar in
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      // När inspelningen är klar – skicka till API
      mediaRecorder.onstop = async () => {
        setStatus('loading');
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(audioChunks, { type: mimeType });
        await sendToAPI(audioBlob, mimeType);
        setIsRecording(false);
      };

      // Spela in i 2 sekunder
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 2000);

    } catch (err) {
      setStatus('error');
      setIsRecording(false);
      console.error('Microphone error:', err);
    }
  }, [isGameActive, isRecording]);

  const sendToAPI = async (audioBlob: Blob, mimeType: string) => {
    try {
      const form = new FormData();
      const extension = mimeType.includes('webm') ? 'webm' : 'ogg';
      form.append('file', audioBlob, `voice.${extension}`);
      form.append('language', 'english');

      const response = await fetch('https://api.apyhub.com/stt/file', {
        method: 'POST',
        headers: {
          'apy-token': 'APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X',
        },
        body: form,
      });

      const data = await response.json();
      console.log('API svar:', data);
      // API:t returnerar texten i data.data
      const transcript: string = data?.data?.toLowerCase() ?? '';

      interpretCommand(transcript);
    } catch (err) {
      setStatus('error');
      console.error('API error:', err);
    }
  };

  // Tolka vad användaren sa och skicka rätt kommando
  const interpretCommand = (transcript: string) => {
    setLastCommand(transcript);

    if (transcript.includes('left'))   onCommand('MOVE_LEFT');
    else if (transcript.includes('right'))  onCommand('MOVE_RIGHT');
    else if (transcript.includes('down'))   onCommand('MOVE_DOWN');
    else if (transcript.includes('rotate') || transcript.includes('up')) onCommand('ROTATE');
    else if (transcript.includes('pause'))  onCommand('TOGGLE_PAUSE');
    else if (transcript.includes('start'))  onCommand('START_GAME');
    else if (transcript.includes('drop'))   onCommand('HARD_DROP');

    setStatus('idle');
  };

  // Färg på knappen beroende på status
  const buttonColor = {
    idle: '#444',
    recording: '#f00000',
    loading: '#f0a000',
    error: '#880000',
  }[status];

  const buttonText = {
    idle: '🎤 Röststyrning',
    recording: '⏺ Lyssnar...',
    loading: '⏳ Tolkar...',
    error: '❌ Försök igen',
  }[status];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
        border: '1px solid #333',
        borderRadius: '4px',
        fontFamily: 'monospace',
      }}
      aria-label="Voice control"
      role="region"
    >
      <button
        onClick={startRecording}
        disabled={!isGameActive || status === 'recording' || status === 'loading'}
        style={{
          padding: '10px',
          backgroundColor: buttonColor,
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: 'bold',
          cursor: isGameActive ? 'pointer' : 'not-allowed',
          fontFamily: 'monospace',
          opacity: isGameActive ? 1 : 0.5,
        }}
        aria-label={buttonText}
        aria-pressed={isRecording}
      >
        {buttonText}
      </button>

      {/* Visa senaste kommandot */}
      {lastCommand && (
        <p
          style={{ color: '#888', fontSize: '11px', margin: 0 }}
          aria-live="polite"
        >
          Hörde: "{lastCommand}"
        </p>
      )}

      {/* Hjälptext */}
      <div style={{ color: '#555', fontSize: '11px', lineHeight: '1.6' }}>
        <p style={{ margin: 0 }}>Säg: left / right</p>
        <p style={{ margin: 0 }}>rotate / down / drop</p>
        <p style={{ margin: 0 }}>pause / start</p>
      </div>
    </div>
  );
};

export default VoiceControl;