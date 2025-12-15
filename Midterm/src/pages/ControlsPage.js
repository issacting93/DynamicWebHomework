import React, { useState } from "react";
import SequencerGrid from "../components/SequencerGrid";  

const initialGrid = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1]
];

export default function ControlsPage() {
  const [grid, setGrid] = useState(initialGrid);
  const [currentStep] = useState(0);

  // Click to turn step on/off
  const toggleStep = (row, col) => {
    setGrid((g) => {
      const newGrid = g.map(row => [...row]); // Deep copy each row
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-10">  
      <div className="text-white text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Grid Controls Demo</h1>
        <p className="mb-2">This page demonstrates the sequencer grid with 4 rows and 8 columns.</p>
        <p className="mb-2">Each cell can be toggled on/off by clicking.</p>
        <p>The grid updates in real time and is displayed as a 2D array.</p>
      </div>
      
      <div className="bg-black text-white p-6 rounded-lg">
        <SequencerGrid grid={grid} currentStep={currentStep} onToggleCell={toggleStep} />
      </div>
    </div>
  );
}