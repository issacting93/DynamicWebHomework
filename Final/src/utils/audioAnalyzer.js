// Class to analyze audio from microphone using Web Audio API
export class AudioAnalyzer {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.stream = null;
    this.dataArray = null;
    this.isActive = false;
    this.frame = 0;
    this.lastBeat = 0;
    this.beatThreshold = 1.5;
    this.beatMinInterval = 15;
    this.energyHistory = [];
    this.historySize = 43;
    
    // Frequency ranges for bass, mid, and treble
    // 2048 FFT at 44100Hz = ~21.5Hz per bin
    this.bassStart = 1;
    this.bassEnd = 12;      // ~20-250Hz
    this.midStart = 12;
    this.midEnd = 93;       // ~250-2000Hz
    this.trebleStart = 93;
    this.trebleEnd = 512;   // ~2000-11000Hz
  }

  // Initialize microphone and audio context
  async init() {
    try {
      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });

      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      this.audioContext.onstatechange = () => {
        if (this.audioContext.state === 'interrupted' || this.audioContext.state === 'closed') {
          this.isActive = false;
        }
      };
      
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      if (this.audioContext.state === 'closed' || this.audioContext.state === 'interrupted') {
        throw new Error(`AudioContext is ${this.audioContext.state}`);
      }
      
      // Create analyser node to get frequency data
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.3;

      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone.connect(this.analyser);

      this.isActive = true;
      return true;
    } catch (error) {
      // Handle different error types
      let errorMessage = 'Microphone unavailable';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Microphone permission denied';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'Microphone is in use by another app';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'No microphone found';
      }
      
      this.isActive = false;
      return false;
    }
  }

  // Get frequency data from analyser
  getFrequencyData() {
    if (!this.isActive || !this.analyser) {
      return null;
    }
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  // Calculate bass level from frequency data
  getBassLevel() {
    const data = this.getFrequencyData();
    if (!data) return 0;

    // Sum up frequencies in bass range
    let sum = 0;
    let max = 0;
    let count = 0;
    for (let i = this.bassStart; i < this.bassEnd; i++) {
      sum += data[i];
      max = Math.max(max, data[i]);
      count++;
    }
    if (count === 0) return 0;
    
    // Normalize and combine average and peak
    const avg = sum / count;
    const peak = max / 255;
    const avgNorm = avg / 255;
    const combined = (avgNorm * 0.6 + peak * 0.4);
    const threshold = 0.20;
    
    if (combined < threshold) return 0;
    
    // Normalize to 0-1 range
    const normalized = (combined - threshold) / (1 - threshold);
    return Math.min(1, Math.pow(normalized * 0.8, 0.98));
  }

  // Calculate mid level from frequency data
  getMidLevel() {
    const data = this.getFrequencyData();
    if (!data) return 0;

    let sum = 0;
    let max = 0;
    let count = 0;
    for (let i = this.midStart; i < this.midEnd; i++) {
      sum += data[i];
      max = Math.max(max, data[i]);
      count++;
    }
    if (count === 0) return 0;
    
    const avg = sum / count;
    const peak = max / 255;
    const avgNorm = avg / 255;
    const combined = (avgNorm * 0.4 + peak * 0.6);
    const threshold = 0.15;
    
    if (combined < threshold) return 0;
    
    const normalized = (combined - threshold) / (1 - threshold);
    return Math.min(1, Math.pow(normalized * 1.0, 0.95));
  }

  // Calculate treble level from frequency data
  getTrebleLevel() {
    const data = this.getFrequencyData();
    if (!data) return 0;

    let sum = 0;
    let max = 0;
    let count = 0;
    for (let i = this.trebleStart; i < this.trebleEnd; i++) {
      sum += data[i];
      max = Math.max(max, data[i]);
      count++;
    }
    if (count === 0) return 0;
    
    const avg = sum / count;
    const peak = max / 255;
    const avgNorm = avg / 255;
    const combined = (avgNorm * 0.3 + peak * 0.7);
    const threshold = 0.10;
    
    if (combined < threshold) return 0;
    
    const normalized = (combined - threshold) / (1 - threshold);
    return Math.min(1, Math.pow(normalized * 1.2, 0.9));
  }

  // Detect beats in the audio
  detectBeat(bassLevel) {
    this.frame++;
    const energy = bassLevel;
    
    // Keep history of energy levels
    this.energyHistory.push(energy);
    if (this.energyHistory.length > this.historySize) {
      this.energyHistory.shift();
    }

    if (this.energyHistory.length < this.historySize) {
      return false;
    }

    // Calculate if current energy is significantly higher than average
    const avgEnergy = this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;
    const variance = this.energyHistory.reduce((sum, val) => {
      return sum + Math.pow(val - avgEnergy, 2);
    }, 0) / this.energyHistory.length;
    const stdDev = Math.sqrt(variance);
    const threshold = avgEnergy + (stdDev * this.beatThreshold * 2);
    const timeSinceLastBeat = this.frame - this.lastBeat;
    const isBeat = energy > threshold && 
                   timeSinceLastBeat > this.beatMinInterval &&
                   energy > 0.1;
    
    if (isBeat) {
      this.lastBeat = this.frame;
      return true;
    }
    
    return false;
  }

  // Update audio levels - called every frame
  update() {
    if (!this.isActive || !this.audioContext) {
      this.isActive = false;
      return null;
    }

    if (this.audioContext.state === 'interrupted' || this.audioContext.state === 'closed') {
      this.isActive = false;
      return null;
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {
        this.isActive = false;
      });
      if (this.audioContext.state === 'suspended') {
        return null;
      }
    }

    // Get all audio levels
    let bassLevel, midLevel, trebleLevel, beatDetected;
    try {
      bassLevel = this.getBassLevel();
      midLevel = this.getMidLevel();
      trebleLevel = this.getTrebleLevel();
      beatDetected = this.detectBeat(bassLevel);
    } catch (error) {
      this.isActive = false;
      return null;
    }

    return {
      bassLevel,
      midLevel,
      trebleLevel,
      beatDetected,
      micActive: true
    };
  }

  // Stop audio analysis and clean up
  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    
    this.isActive = false;
  }
}

