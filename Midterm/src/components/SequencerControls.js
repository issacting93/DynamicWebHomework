import React, { useMemo } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

// bpm and play/stop controls
export default function SequencerControls({
  isPlaying,
  handlePlay,
  handleStop,
  bpm,
  setBpm,
  minBpm = 60,
  maxBpm = 240,
}) {
  // make bpm array for slider
  const BPM_VALUES = useMemo(
    () =>
      Array.from({ length: maxBpm - minBpm + 1 }, (_, i) =>
        String(minBpm + i)
      ),
    [minBpm, maxBpm]
  );

  // keep bpm in range
  const clamp = (value) => Math.min(maxBpm, Math.max(minBpm, value));
  const clampedBpm = clamp(bpm ?? minBpm);

  // get index for slider
  const dataIndex = Math.min(
    BPM_VALUES.length - 1,
    Math.max(0, clampedBpm - minBpm)
  );

  // handle bpm change
  const onCircularChange = (value) => setBpm(clamp(Number(value)));

  return (
    <div className="flex flex-col items-center gap-6">
      {/* BPM Slider */}
      <div 
        style={{ 
          '--knob-color': '#e8ff00',
          '--knob-border': '2px solid #e8ff00'
        }}
        className="circular-slider-container"
      >
        <CircularSlider
          ariaLabel="Tempo (BPM)"
          label="BPM"
          labelColor="#e8ff00"
          knobColor="#e8ff00"
          knobSize={20}
          knobRadius={10}
          progressColorFrom="#e8ff00"
          progressColorTo="#e8ff00"
          progressSize={20}
          trackColor="#131313ff"
          trackSize={10}
          width={200}
          data={BPM_VALUES}
          dataIndex={dataIndex}
          onChange={onCircularChange}
          style={{
            '--knob-color': '#e8ff00',
            '--knob-background': '#e8ff00'
          }}
        />
      </div>

      {/* Play/Stop Buttons */}
      <div className="flex items-center gap-3">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="bg-[#e8ff00] px-6 py-2 rounded-lg text-black font-medium hover:bg-[#d4e600] transition-colors shadow-lg"
          >
            Play
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="border-2 border-[#e8ff00] px-6 py-2 rounded-lg bg-black text-[#e8ff00] font-medium hover:bg-[#e8ff00] hover:text-black transition-colors shadow-lg"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
