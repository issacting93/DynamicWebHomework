import React from "react";
import SequencerButton from "./SequencerButton";

const ROWS = 4;
const COLS = 12;

export default function SequencerGrid({
  grid,
  currentStep,
  onToggleCell,
}) {
  return (
    <div className="relative">
      {/* Step indicator overlay */}
      {currentStep >= 0 && (
        <div 
          className="absolute  opacity-30 h-full w-12 rounded transition-all duration-75 pointer-events-none"
          style={{ left: `${currentStep * 82}px` }}
        />
      )}
      
      {/* Grid */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 m-auto">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex}>
              <SequencerButton
                isActive={cell}
                // highlight only this column if it is the current step
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
