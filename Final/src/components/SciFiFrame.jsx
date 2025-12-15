import { useState, useEffect } from 'react';
import { useAudio } from '../contexts/AudioContext';
import FrameCorners from './FrameCorners';
import CenterGroup from './CenterGroup';
import AudioVisualization from './AudioVisualization';
import AudioLevelsDisplay from './AudioLevelsDisplay';
import { getColorFromLevel } from '../utils/colorUtils';
import './SciFiFrame.css';

// Main UI frame component
export default function SciFiFrame({ isExpanded, onExpandChange }) {
  const { audioData, micError, init, stop, isInitialized } = useAudio();

  // Start/stop audio when expanding/collapsing
  useEffect(() => {
    if (isExpanded && !isInitialized) {
      init();
    } else if (!isExpanded && isInitialized) {
      stop();
    }
  }, [isExpanded, isInitialized, init, stop]);

  const handleExpand = () => {
    onExpandChange(true);
  };

  const handleCollapse = () => {
    onExpandChange(false);
  };

  return (
    <div className={`scifi-frame ${isExpanded ? 'expanded' : ''}`}>
      <CenterGroup onExpand={handleExpand} />
      <FrameCorners />
      <div className="bars">
        <div className="bar bar--top"></div>
        <div className="bar bar--bottom"></div>
      </div>
      {isExpanded && (
        <AudioVisualization 
          audioData={audioData} 
          getColorFromLevel={getColorFromLevel}
        />
      )}
      <AudioLevelsDisplay audioData={audioData} micError={micError} />
      <button className="collapse-btn" onClick={handleCollapse}>
        Collapse
      </button>
    </div>
  );
}

