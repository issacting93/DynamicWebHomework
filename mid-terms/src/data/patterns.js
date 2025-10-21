// different patterns for the sequencer
// 1 = on, 0 = off

export const patterns = {
  basic: [
    [1,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,0]
  ],
  
  checkerboard: [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1]
  ],
  
  "Type-A": [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,0,0,0],
    [0,0,1,0,1,0,0,1],
    [0,1,0,0,0,0,1,0]
  ],
  
  "Type-B": [
    [1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,1,0],
    [0,0,0,0,1,0,0,1],
    [0,1,1,0,0,0,1,0]
  ]
};

// dropdown options
export const patternOptions = [
  { label: "Basic",        value: "basic" },
  { label: "Checkerboard", value: "checkerboard" },
  { label: "Type-A",       value: "Type-A" },
  { label: "Type-B",       value: "Type-B" },
];

// convert 1/0 to true/false
export const makePattern = (type) => {
  const pattern = patterns[type] || patterns.basic;
  return pattern.map(row => row.map(cell => cell === 1));
};
