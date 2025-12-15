export default function CenterGroup({ onExpand }) {
  return (
    <div className="center-group">
      <div className="circle-outer"></div>
      <div className="circle-inner"></div>
      <div className="center-dot" onClick={onExpand}></div>
    </div>
  );
}

