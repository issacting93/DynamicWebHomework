export default function AudioLevelsDisplay({ audioData, micError }) {
  return (
    <div className="audio-levels">
      <div>[BASS: <span>{Math.round(audioData.bassLevel * 100)}</span>%]</div>
      <div>[MID: <span>{Math.round(audioData.midLevel * 100)}</span>%]</div> 
      <div>[TREBLE: <span>{Math.round(audioData.trebleLevel * 100)}</span>%]</div>
      <div>[MIC: <span style={{ color: audioData.micActive ? '#4CAF50' : '#FF9800' }}>
        {audioData.micActive ? 'ACTIVE' : 'SIM'}
      </span>]</div>
      {micError && (
        <div style={{ 
          fontSize: '10px', 
          color: '#FF6B6B', 
          marginTop: '4px',
          maxWidth: '200px',
          lineHeight: '1.3'
        }}>
          ⚠️ {micError}
        </div>
      )}
    </div>
  );
}

