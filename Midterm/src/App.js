import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import GridPage from './pages/GridPage';
import SequencerPage from './pages/SequencerPage'; 
import ControlsPage from './pages/ControlsPage';
import SetupPage from './pages/SetupPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<SequencerPage />} />
          <Route path="/controls" element={<GridPage />} />
          <Route path="/grid" element={<ControlsPage />} />
          <Route path="/set-up" element={<SetupPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
