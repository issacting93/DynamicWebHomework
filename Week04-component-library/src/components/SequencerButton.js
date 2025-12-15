import React from "react";
const SequencerButton = ({ isActive, isCurrentStep, onClick }) => {
    return (
      <button
        className={`h-[76px] w-[76px] rounded-[20px] border transition-all duration-150 ${
          isActive 
            ? 'bg-[#e8ff00] border-[#e8ff00]' 
            : 'border-[#c5c5c5] hover:border-[#e8ff00]'
        }`}
        onClick={onClick}
      />
    );
  };

   export default SequencerButton;