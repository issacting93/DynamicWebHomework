import React from "react";
import SequencerButton from "./SequencerButton";

// the sequencer grid component
export default function SequencerGrid({
  grid,
  currentStep,
  onToggleCell,
}) {
  return (
    <div className="relative p-6 rounded-lg flex flex-col">
      {/* Current step highlight */}
      {currentStep >= 0 && (
        <div 
          className="absolute opacity-30 h-full w-4 ml-2 rounded transition-all duration-75 pointer-events-none bg-[#e8ff00]"
          style={{ left: `${currentStep * 82}px` }}
        />
      )}
      
      {/* Grid buttons */}
      {grid && grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 mb-2">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex}>
              <SequencerButton
                isActive={cell}
                isCurrentStep={cellIndex === currentStep}
                onClick={() => onToggleCell(rowIndex, cellIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
