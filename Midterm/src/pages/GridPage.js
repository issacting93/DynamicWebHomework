import React, { useState } from "react";
import SequencerControls from "../components/SequencerControls";
 
export default function GridPage() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-10">  
      <div className="text-white text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">BPM Controls Demo</h1>
        <p className="mb-2">This page demonstrates the BPM controls using a circular slider.</p>
        <p className="mb-2">The slider uses the @fseehawer/react-circular-slider library.</p>
        <p>Use the play/stop button to control playback.</p>
      </div>
      
      <SequencerControls 
        bpm={bpm} 
        setBpm={setBpm}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handleStop={handleStop}
      />
    </div>
  );
}