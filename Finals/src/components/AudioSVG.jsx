import { useEffect, useState, useRef } from 'react';

// Component that loads an SVG and changes the color of a specific path
export default function AudioSVG({ src, pathId, strokeColor }) {
  const [svgContent, setSvgContent] = useState(null);
  const containerRef = useRef(null);

  // Fetch SVG file
  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(setSvgContent)
      .catch(() => {});
  }, [src]);

  // Update SVG when content or color changes
  useEffect(() => {
    if (containerRef.current && svgContent && strokeColor) {
      const container = containerRef.current;
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const svgElement = svgDoc.querySelector('svg');
      
      if (svgElement) {
        // Find the path we want to color
        const path = svgDoc.querySelector(`#${pathId}`);
        if (path) {
          path.setAttribute('stroke', strokeColor);
          path.setAttribute('fill', strokeColor);
          if (!path.getAttribute('stroke-width')) {
            path.setAttribute('stroke-width', '1');
          }
          path.style.display = 'block';
        }
        
        // Hide all other paths
        const allPaths = svgDoc.querySelectorAll('path');
        allPaths.forEach(p => {
          if (p.id !== pathId) {
            p.style.display = 'none';
          }
        });
        
        // Put the modified SVG into the container
        container.innerHTML = '';
        container.appendChild(svgElement);
      }
    }
  }, [svgContent, pathId, strokeColor]);

  if (!svgContent) return null;

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    />
  );
}

