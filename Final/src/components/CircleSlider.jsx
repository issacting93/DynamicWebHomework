import './CircleSlider.css';

export default function CircleSlider({ value, label, size = 80 }) {
  const percentage = Math.round(value * 100);
  const circumference = 2 * Math.PI * (size / 2 - 5);
  const offset = circumference - (value * circumference);

  return (
    <div className="circle-slider" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circle-slider-svg">
        <circle
          className="circle-slider-bg"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 5}
          fill="none"
          stroke="#F33833"
          strokeWidth="3"
        />
        <circle
          className="circle-slider-progress"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 5}
          fill="none"
          stroke="#F33833"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="circle-slider-content">
        <div className="circle-slider-label">{label}</div>
        <div className="circle-slider-value">{percentage}%</div>
      </div>
    </div>
  );
}

