export function getColorFromLevel(level) {
  const l = Math.max(0, Math.min(1, level));
  const smoothStep = (t) => t * t * (3 - 2 * t);
  
  const colors = [
    { r: 0, g: 0, b: 0 },
    { r: 238, g: 82, b: 82 },
    { r: 251, g: 255, b: 0 },
    { r: 207, g: 82, b: 238 },
    { r: 56, g: 238, b: 197 }
  ];
  const stops = [0, 0.25, 0.5, 0.75, 1.0];
  
  let segment = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    if (l >= stops[i] && l <= stops[i + 1]) {
      segment = i;
      break;
    }
  }
  
  const segmentStart = stops[segment];
  const segmentEnd = stops[segment + 1];
  const t = (l - segmentStart) / (segmentEnd - segmentStart);
  const smoothT = smoothStep(t);
  
  const color1 = colors[segment];
  const color2 = colors[segment + 1];
  const r = Math.round(color1.r + (color2.r - color1.r) * smoothT);
  const g = Math.round(color1.g + (color2.g - color1.g) * smoothT);
  const b = Math.round(color1.b + (color2.b - color1.b) * smoothT);
  
  return `rgb(${r}, ${g}, ${b})`;
}

