import React, { useState, useRef } from 'react';

export default function CircularBPMSlider() {
  const [bpm, setBpm] = useState(120);
  const svgRef = useRef(null);
  
  const minBpm = 40;
  const maxBpm = 240;
  const radius = 140;
  const strokeWidth = 28;
  
  const getAngle = (e) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = (e.touches?.[0]?.clientX || e.clientX) - rect.left - 200;
    const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top - 200;
    return Math.atan2(x, -y) * (180 / Math.PI);
  };
  
  const updateBpm = (e) => {
    const angle = (getAngle(e) + 360) % 360;
    setBpm(Math.round(minBpm + (angle / 360) * (maxBpm - minBpm)));
  };
  
  const handleStart = (e) => {
    updateBpm(e);
    const move = (e) => { e.preventDefault(); updateBpm(e); };
    const end = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end, { once: true });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end, { once: true });
  };
  
  const angle = ((bpm - minBpm) / (maxBpm - minBpm)) * 360;
  const circumference = 2 * Math.PI * radius;
  const progress = (angle / 360) * circumference;
  const rad = angle * (Math.PI / 180);
  const handleX = 200 + radius * Math.sin(rad);
  const handleY = 200 - radius * Math.cos(rad);
  
  return (
    <div className="flex items-center justify-center  bg-gradient-to-br  ">
      <div className="relative" onMouseDown={handleStart} onTouchStart={handleStart} style={{ touchAction: 'none' }}>
        <svg ref={svgRef} width="400" height="400">
          <circle cx="200" cy="200" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
          <circle cx="200" cy="200" r={radius} fill="none" stroke="#d4ff00" strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={circumference - progress}
            strokeLinecap="round" transform="rotate(-90 200 200)" />
          <circle cx={handleX} cy={handleY} r="18" fill="#d4ff00" />
          <circle cx={handleX} cy={handleY} r="12" fill="#b8e000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-7xl font-bold text-white">{bpm}</div>
            <div className="text-2xl font-semibold tracking-wider" style={{ color: '#d4ff00' }}>BPM</div>
          </div>
        </div>
 
      </div>
    </div>
  );
}