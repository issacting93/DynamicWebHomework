import { createContext, useContext } from 'react';
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer';

// Create context for sharing audio data across components
const AudioContext = createContext(null);

// Provider component that wraps the app and provides audio data
export function AudioProvider({ children, autoInit = true }) {
  const audio = useAudioAnalyzer(autoInit);

  return (
    <AudioContext.Provider value={audio}>
      {children}
    </AudioContext.Provider>
  );
}

// Hook to access audio context
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
