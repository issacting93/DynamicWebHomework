const CORNER_PATH = "M24 79H42.7L42.8 79L48.6 73.7L55.8 79H59V81H72.5V81L72.5 81L90 63.6L88.6 62.3L89.5 61.3L89.5 61.3L94.4 55.3L94.5 55.2V54H96V44L90 39V29H88.2L88.8 0L88.3 0L87.8 0L87.2 29H85V39L91 44V54H93.5V54.8L88.7 60.7L87.9 61.6L86.4 60.1L70.5 76H59V78H56.2L49 72.6L48.6 72.4L48.3 72.6L42.3 78H24V76H10V78H0V79H10V81H24V79Z";

const Corner = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 96 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={CORNER_PATH} />
    </svg>
  </div>
);

export default function FrameCorners() {
  return (
    <div className="frame-corners">
      <Corner className="corner corner--top-left" />
      <Corner className="corner corner--top-right" />
      <Corner className="corner corner--bottom-left" />
      <Corner className="corner corner--bottom-right" />
      <div className="connector connector--top-left-h"></div>
      <div className="connector connector--top-right-h"></div>
      <div className="connector connector--bottom-left-h"></div>
      <div className="connector connector--bottom-right-h"></div>
      <div className="connector connector--top-left-v"></div>
      <div className="connector connector--top-right-v"></div>
      <div className="connector connector--bottom-left-v"></div>
      <div className="connector connector--bottom-right-v"></div>
    </div>
  );
}

