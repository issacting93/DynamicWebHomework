import CircleSlider from './CircleSlider';
import AudioSVG from './AudioSVG';
import svgAsset from '../assets/svg-09.svg';

// Component that displays audio visualization with sliders and SVGs
export default function AudioVisualization({ audioData, getColorFromLevel }) {
  return (
    <>
      {/* Circle sliders showing audio levels */}
      <div className="circle-sliders-container">
        <CircleSlider 
          value={audioData.bassLevel} 
          label="BASS" 
          size={80}
        />
        <CircleSlider 
          value={audioData.midLevel} 
          label="MID" 
          size={80}
        />
        <CircleSlider 
          value={audioData.trebleLevel} 
          label="TREBLE" 
          size={80}
        />
      </div>
      {/* SVGs that change color based on audio */}
      <div className="audio-svg-container">
        <div className="audio-svg-wrapper audio-svg-wrapper--low">
          <AudioSVG 
            src={svgAsset}
            pathId="low"
            strokeColor={getColorFromLevel(audioData.bassLevel)}
          />
        </div>
        <div className="audio-svg-wrapper audio-svg-wrapper--mid">
          <AudioSVG 
            src={svgAsset}
            pathId="mid"
            strokeColor={getColorFromLevel(audioData.midLevel)}
          />
        </div>
        <div className="audio-svg-wrapper audio-svg-wrapper--high">
          <AudioSVG 
            src={svgAsset}
            pathId="high"
            strokeColor={getColorFromLevel(audioData.trebleLevel)}
          />
        </div>
      </div>
    </>
  );
}

