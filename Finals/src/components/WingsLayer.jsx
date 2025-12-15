import wingsSvg from '../assets/01wings.svg';
import './WingsLayer.css';

// Component that shows wings SVG when UI is expanded
export default function WingsLayer({ isExpanded }) {
  return (
    <div className={`wings-layer ${isExpanded ? 'wings-layer--visible' : ''}`}>
      <img 
        src={wingsSvg} 
        alt="Wings" 
        className="wings-svg"
      />
    </div>
  );
}

