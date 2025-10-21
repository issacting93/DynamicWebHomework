import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import SequencerGrid from "../components/SequencerGrid";
import SequencerControls from "../components/SequencerControls";
import Dropdown from "../components/Dropdown";
import { patternOptions, makePattern } from "../data/patterns";

const ROWS = 4;
const COLS = 8;
const CHORD_NOTES = ["Bb4", "D4", "F4", "A4"];

export default function SequencerPage() {
  // envelope - ADSR,
  const [envelope, setEnvelope] = useState({
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 1.0,
  });

  function setEnv(key) {
    return function (value) {
      switch (key) {
        case "attack":
          setEnvelope(prev => ({ ...prev, attack: value }));
          break;
        case "decay":
          setEnvelope(prev => ({ ...prev, decay: value }));
          break;
        case "sustain":
          setEnvelope(prev => ({ ...prev, sustain: value }));
          break;
        case "release":
          setEnvelope(prev => ({ ...prev, release: value }));
          break;
        default:
          console.warn(`Unknown envelope parameter: ${key}`);
      }
    }
  }
  

  // main sequencer  
  let [grid, setGrid] = useState(makePattern("basic"));
  let [isPlaying, setIsPlaying] = useState(false);
  let [bpm, setBpm] = useState(120);
  let [currentStep, setCurrentStep] = useState(0);
  let [selectedPattern, setSelectedPattern] = useState("basic");

  // refs for audio stuff
  const synthRef = useRef(null);
  const loopRef = useRef(null);
  const gridRef = useRef(grid);

  // keep grid updated
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // cleanup
  useEffect(() => {
    return () => {
      loopRef.current?.dispose?.();
      synthRef.current?.dispose?.();
      loopRef.current = null;
      synthRef.current = null;
    };
  }, []);

  // update bpm
  useEffect(() => {
    Tone.Transport.bpm.rampTo(bpm, 0.05);
  }, [bpm]);

  // update synth
  useEffect(() => {
    if (synthRef.current) synthRef.current.set({ envelope });
  }, [envelope]);

  // change pattern
  const changePattern = (option) => {
    const value = option.value;
    setSelectedPattern(value);
    setGrid(makePattern(value));
  };

  // start playing
  const play = async () => {
    await Tone.start();
    if (!synthRef.current) {
      synthRef.current = new Tone.PolySynth({
        oscillator: { type: "sawtooth" },
        envelope,
      }).connect(Tone.Master);
    }

    let step = 0;
    loopRef.current = new Tone.Loop((time) => {
      setCurrentStep(step);   // update UI first
      
      // check if the current step is on in the grid
      for (let row = 0; row < ROWS; row++) {
        if (gridRef.current[row][step]) {
          synthRef.current.triggerAttackRelease(CHORD_NOTES[row], "8n", time);  // play the chord
        }
      }
      
      step = (step + 1) % COLS;  // move to the next step
    }, "8n");

    setCurrentStep(0);  // reset the current step
    loopRef.current.start(0);  // start the loop
    Tone.Transport.start();  // start the transport
    setIsPlaying(true);  // set the playing state to true
  };

  // stop playing
  const stop = () => {
    Tone.Transport.stop();
    loopRef.current?.stop(0);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // click to turn step on/off
  const toggleStep = (row, col) => {
    setGrid((g) => {
      const newGrid = g.map(row => [...row]); 
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  };

  const sliderDefs = [
    { key: "attack", min: 0, max: 1, step: 0.01 },
    { key: "decay", min: 0, max: 1, step: 0.01 },
    { key: "sustain", min: 0, max: 1, step: 0.01 },
    { key: "release", min: 0, max: 1, step: 0.01 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Controls Section */}
          <div className="flex flex-col gap-6 items-center">
            <SequencerControls
              isPlaying={isPlaying}
              handlePlay={play}
              handleStop={stop}
              bpm={bpm}
              setBpm={setBpm}
            />

            {/* Envelope Controls */}
            <div className="flex flex-col gap-4  bg-black rounded-lg w-full">
               <div className="flex flex-col gap-4 ">
                {sliderDefs.map(({ key, min, max, step }) => (
                  <label key={key} className="flex flex-col items-center gap-2">
                    <div className="flex flex-row gap-2 w-full">
                    <span className="text-sm font-medium capitalize">{key}</span>
                    <span className="text-xs text-gray-400">
                      {envelope[key].toFixed(2)}
                    </span>
                    </div>
                   
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={envelope[key]}
                      onChange={(e) => setEnv(key)(parseFloat(e.target.value))}
                      className="w-28 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider w-full"
                      style={{
                        background: `linear-gradient(to right, #e8ff00 0%, #e8ff00 ${envelope[key] * 100}%, #374151 ${envelope[key] * 100}%, #374151 100%)`
                      }}
                    />
                
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="flex flex-col gap-4 p-6 bg-black rounded-lg">
            <Dropdown
              options={patternOptions}
              selected={selectedPattern}
              onChange={changePattern}
              label="Pattern"
            />
            
            <SequencerGrid
              grid={grid}
              currentStep={currentStep}
              onToggleCell={toggleStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
