import { useState } from 'react'
import { AudioProvider } from './contexts/AudioContext'
import SciFiFrame from './components/SciFiFrame'
import SphereShader from './components/SphereShader'
import WingsLayer from './components/WingsLayer'
import './App.css'

function App() {
  // Track if the UI is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <AudioProvider autoInit={false}>
      <SphereShader isVisible={true} />
      <WingsLayer isExpanded={isExpanded} />
      <SciFiFrame isExpanded={isExpanded} onExpandChange={setIsExpanded} />
    </AudioProvider>
  )
}

export default App

