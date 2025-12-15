import { useState, useEffect, useRef } from 'react';
import { AudioAnalyzer } from '../utils/audioAnalyzer';

// Custom hook to manage audio analysis
export function useAudioAnalyzer(autoInit = false) {
  // State for audio data
  const [audioData, setAudioData] = useState({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    beatDetected: false,
    micActive: false
  });
  const [micError, setMicError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Keep reference to audio analyzer so it doesn't get recreated
  const audioAnalyzerRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // Function to update audio data (throttled to avoid too many updates)
  const handleAudioUpdate = (audio) => {
    const now = performance.now();
    // Only update every 100ms
    if (now - lastUpdateRef.current >= 100) {
      setAudioData({
        bassLevel: audio.bassLevel,
        midLevel: audio.midLevel,
        trebleLevel: audio.trebleLevel || 0,
        beatDetected: audio.beatDetected,
        micActive: audio.micActive
      });
      lastUpdateRef.current = now;
    }
  };

  // Initialize microphone and audio analyzer
  const init = async () => {
    if (audioAnalyzerRef.current) {
      return audioAnalyzerRef.current;
    }

    const analyzer = new AudioAnalyzer();
    try {
      const success = await analyzer.init();
      if (success) {
        audioAnalyzerRef.current = analyzer;
        setMicError(null);
        setIsInitialized(true);
        handleAudioUpdate({
          bassLevel: 0,
          midLevel: 0,
          trebleLevel: 0,
          beatDetected: false,
          micActive: true
        });
        return analyzer;
      } else {
        setMicError('Microphone unavailable');
        setIsInitialized(false);
        handleAudioUpdate({
          bassLevel: 0,
          midLevel: 0,
          trebleLevel: 0,
          beatDetected: false,
          micActive: false
        });
        return null;
      }
    } catch (err) {
      let errorMsg = 'Failed to access microphone';
      if (err.name === 'NotReadableError') {
        errorMsg = 'Microphone is in use by another app';
      }
      setMicError(errorMsg);
      setIsInitialized(false);
      handleAudioUpdate({
        bassLevel: 0,
        midLevel: 0,
        trebleLevel: 0,
        beatDetected: false,
        micActive: false
      });
      return null;
    }
  };

  // Stop audio analysis
  const stop = () => {
    if (audioAnalyzerRef.current) {
      audioAnalyzerRef.current.stop();
      audioAnalyzerRef.current = null;
      setIsInitialized(false);
      handleAudioUpdate({
        bassLevel: 0,
        midLevel: 0,
        trebleLevel: 0,
        beatDetected: false,
        micActive: false
      });
    }
  };

  // Auto-initialize if autoInit is true
  useEffect(() => {
    if (autoInit && !audioAnalyzerRef.current) {
      init();
    }

    // Cleanup on unmount
    return () => {
      if (audioAnalyzerRef.current) {
        stop();
      }
    };
  }, [autoInit]);

  // Update audio data in animation loop
  useEffect(() => {
    if (!audioAnalyzerRef.current || !audioAnalyzerRef.current.isActive) {
      return;
    }

    let animationFrameId;
    const updateAudio = () => {
      if (audioAnalyzerRef.current && audioAnalyzerRef.current.isActive) {
        const audio = audioAnalyzerRef.current.update();
        if (audio) {
          handleAudioUpdate(audio);
        }
      }
      animationFrameId = requestAnimationFrame(updateAudio);
    };

    animationFrameId = requestAnimationFrame(updateAudio);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInitialized]);

  return {
    audioAnalyzer: audioAnalyzerRef.current,
    audioData,
    micError,
    isInitialized,
    init,
    stop
  };
}
