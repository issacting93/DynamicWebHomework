import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import SequencerGrid from "../components/SequencerGrid";
import SequencerControls from "../components/SequencerControls";

const ROWS = 4;
const COLS = 8;

const CHORD_NOTES = ["E4", "G4", "B4", "E3"]; // per row

const createInitialGrid = () => {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  grid[1][2] = true;
  grid[2][2] = true;
  grid[1][3] = true;
  return grid;
};

export default function SequencerPage() {
  // ADSR
  const [attack, setAttack] = useState(0.02);
  const [decay, setDecay] = useState(0.1);
  const [sustain, setSustain] = useState(0.3);
  const [release, setRelease] = useState(1.5);

  // Sequencer state
  const [grid, setGrid] = useState(createInitialGrid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);

  // Tone refs
  const synthRef = useRef(null);
  const loopRef = useRef(null);

  // Keep latest grid accessible inside the loop without recreating it
  const gridRef = useRef(grid);
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // Init Tone once (synth + loop)
  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack, decay, sustain, release },
    }).toDestination();
    synthRef.current = synth;

    let step = 0;
    const loop = new Tone.Loop((time) => {
      setCurrentStep(step); // update UI first

      const g = gridRef.current;
      for (let row = 0; row < ROWS; row++) {
        if (g[row][step]) {
          synth.triggerAttackRelease(CHORD_NOTES[row], "8n", time);
        }
      }

      step = (step + 1) % COLS;
    }, "16n");
    loopRef.current = loop;

    return () => {
      loop.dispose();
      synth.dispose();
      loopRef.current = null;
      synthRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Keep BPM in sync (gentle ramp)
  useEffect(() => {
    Tone.Transport.bpm.rampTo(bpm, 0.05);
  }, [bpm]);

  // Update envelope smoothly when ADSR changes
  useEffect(() => {
    if (!synthRef.current) return;
    synthRef.current.set({ envelope: { attack, decay, sustain, release } });
  }, [attack, decay, sustain, release]);

  // Play / Stop
  const handlePlay = useCallback(async () => {
    await Tone.start();            // required by browsers (user action)
    setCurrentStep(0);
    loopRef.current?.start(0);
    Tone.Transport.start("+0.05");
    setIsPlaying(true);
  }, []);

  const handleStop = useCallback(() => {
    Tone.Transport.stop();
    loopRef.current?.stop(0);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // Toggle a grid cell
  const toggleCell = useCallback((r, c) => {
    setGrid((prev) =>
      prev.map((row, ri) =>
        ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row
      )
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-gray-900   text-white">
      <div className="flex flex-col gap-4 items-center bg-black p-10">
        <SequencerControls
          isPlaying={isPlaying}
          handlePlay={handlePlay}
          handleStop={handleStop}
          bpm={bpm}
          setBpm={setBpm}
        />
      </div>

      <SequencerGrid
        grid={grid}
        currentStep={currentStep}
        onToggleCell={toggleCell}
      />

      <div className="flex flex-row gap-4 p-10 items-center">
        <label className="flex items-center gap-2">
          <span>Attack</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={attack}
            onChange={(e) => setAttack(parseFloat(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span>Decay</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={decay}
            onChange={(e) => setDecay(parseFloat(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span>Sustain</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sustain}
            onChange={(e) => setSustain(parseFloat(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span>Release</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={release}
            onChange={(e) => setRelease(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
