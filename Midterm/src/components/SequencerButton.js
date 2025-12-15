import React from "react";

// individual step button
const SequencerButton = ({ isActive, isCurrentStep, onClick }) => {
  return (
    <button
      className={`h-[76px] w-[76px] rounded-[20px] border transition-all duration-150 ${
        isActive 
          ? 'bg-[#e8ff00] border-[#e8ff00] shadow-lg' 
          : 'border-[#c5c5c5] hover:border-[#e8ff00] hover:shadow-md'
      } ${isCurrentStep ? 'ring-2 ring-[#e8ff00] ring-opacity-50' : ''}`}
      onClick={onClick}
      aria-label={`Step ${isActive ? 'active' : 'inactive'}`}
    />
  );
};

export default SequencerButton;