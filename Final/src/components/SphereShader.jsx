import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAudio } from '../contexts/AudioContext';
import './SphereShader.css';

// Component that renders a 3D sphere with animated shader
const SphereShader = ({ isVisible = true }) => {
  const { audioAnalyzer } = useAudio();
  
  // Refs to store Three.js objects
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const animationRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  
  // Store smoothed audio values to avoid jittery animations
  const audioSmoothedRef = useRef({ low: 0, mid: 0, high: 0, overall: 0 });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform float u_audioLow;
    uniform float u_audioMid;
    uniform float u_audioHigh;
    uniform float u_audioOverall;
    uniform float u_audioReactivity;

    varying vec2 vUv;

    float map(vec2 p, float z) {
      return length(p) - 1.0;
    }

    vec2 rotate(vec2 v, float a) {
      float s = sin(a);
      float c = cos(a);
      mat2 m = mat2(c, -s, s, c);
      return m * v;
    }

    float nsin(float value) {
      return sin(value * 6.2831853072) * 0.5 + 0.5;
    }

    void main(void) {
      vec2 uv;
      vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

      float l = length(p);
      float z = time;
      
      // Audio reactivity - stronger distortion multipliers
      float audioInfluence = (u_audioLow * 0.7 + u_audioMid * 0.8 + u_audioHigh * 0.5) * u_audioReactivity;
      float audioPulse = u_audioOverall * u_audioReactivity;
      float bassDistort = u_audioLow * u_audioReactivity * 4.0;
      float midDistort = u_audioMid * u_audioReactivity * 3.0;
      float trebleDistort = u_audioHigh * u_audioReactivity * 2.5;
      
      // Base animation continues over time (independent of audio)
      float baseAngle = 6.2831853072 * nsin(z * 0.001) * 20.0;
      // Audio distorts the rotation angle more dramatically
      float angle = baseAngle + audioInfluence * 8.0;
      vec3 color = vec3(0.0);

      for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 7; i++) {
          z += 0.2;
          
          // Base pattern calculation (time-based)
          uv.x = map(p, z);
          uv.y = map(p, z);

          // Base offsets (time-based)
          uv.x -= (sin(float(i) * 0.2) * 0.5);
          uv.y += (cos(float(j) * 0.1) * 0.5);
          
          // Audio distorts UV coordinates before rotation
          uv.x += bassDistort * sin(z * 0.1 + float(i) * 0.5) * 0.4;
          uv.y += midDistort * cos(z * 0.15 + float(j) * 0.5) * 0.4;
          uv.x += trebleDistort * sin(z * 0.2) * 0.2;
          
          // Rotate with audio-distorted angle
          uv = rotate(uv, angle);
          
          // Audio distorts the wave pattern more
          float waveDistort = audioPulse * 3.0;
          uv += p / l * abs(sin(l * 8.0 - z * 0.05 + waveDistort));
          
          // Audio enhances pattern intensity and phase
          float patternIntensity = 0.2 + audioPulse * 0.4;
          float phaseDistort = cos(z * 0.05 + audioInfluence * 3.0);
          color[j] += patternIntensity / fract(uv.y * uv.x + phaseDistort) * 1.0 - 0.01 / abs(uv.y * uv.x) * 2.0;
          color[j] += 0.1 + audioPulse * 0.2;
          
          // Audio increases color intensity range
          float maxIntensity = 1.7 + audioPulse * 0.6;
          color[j] = clamp(color[j], 0.1, maxIntensity);
        }
      }

      color[0] += 0.0;
      color[1] -= 0.5;
      color[2] -= 0.9;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Set up Three.js scene when component mounts
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create scene with black background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 0, 1000);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Shader uniforms - values that can be changed from JavaScript
    const uniforms = {
      time: { value: 1.0 },
      resolution: { type: 'v2', value: new THREE.Vector2(width, height) },
      mouse: { type: 'v2', value: new THREE.Vector2(0, 0) },
      u_audioLow: { value: 0.0 },
      u_audioMid: { value: 0.0 },
      u_audioHigh: { value: 0.0 },
      u_audioOverall: { value: 0.0 },
      u_audioReactivity: { value: 1.0 }
    };

    // Create shader material with custom vertex and fragment shaders
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    // Create sphere geometry and mesh
    const geometry = new THREE.SphereGeometry(300, 100, 100);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 20;
    mesh.rotation.y = 20;
    mesh.rotation.z = 20;
    scene.add(mesh);
    meshRef.current = mesh;

    // Handle window resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.resolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      const mesh = meshRef.current;
      const uniforms = mesh.material.uniforms;

      // Get audio data and smooth it out
      if (audioAnalyzer && audioAnalyzer.isActive) {
        const audio = audioAnalyzer.update();
        if (audio) {
          // Smooth audio values using exponential moving average
          const smoothing = 0.8;
          audioSmoothedRef.current.low = 
            audioSmoothedRef.current.low * smoothing + audio.bassLevel * (1 - smoothing);
          audioSmoothedRef.current.mid = 
            audioSmoothedRef.current.mid * smoothing + audio.midLevel * (1 - smoothing);
          audioSmoothedRef.current.high = 
            audioSmoothedRef.current.high * smoothing + (audio.trebleLevel || 0) * (1 - smoothing);
          audioSmoothedRef.current.overall = 
            (audioSmoothedRef.current.low + audioSmoothedRef.current.mid + audioSmoothedRef.current.high) / 3;

          // Update shader uniforms with audio data
          uniforms.u_audioLow.value = audioSmoothedRef.current.low;
          uniforms.u_audioMid.value = audioSmoothedRef.current.mid;
          uniforms.u_audioHigh.value = audioSmoothedRef.current.high;
          uniforms.u_audioOverall.value = audioSmoothedRef.current.overall;
        }
      }

      // Rotate mesh and update time based on audio
      if (mesh) {
        const audioSpeed = 1.0 + (audioSmoothedRef.current.overall * 0.5);
        mesh.rotation.y += delta * 0.5 * audioSpeed;
        mesh.rotation.x += delta * 0.5 * audioSpeed;
        uniforms.time.value += delta * 5 * (1.0 + audioSmoothedRef.current.overall * 0.3);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [isVisible, audioAnalyzer]);

  if (!isVisible) return null;

  return <div ref={containerRef} className="sphere-shader-container" />;
};

export default SphereShader;

