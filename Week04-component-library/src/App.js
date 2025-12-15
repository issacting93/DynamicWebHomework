import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'  
import HeroPage from './pages/HeroPage'  
import SequencerPage from './pages/SequencerPage'


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          {/* Dashboard/Home Route */}
          <Route path="/" element={< SequencerPage />} />
          
          {/* Component Routes */} 

          {/* 404 Fallback */}
          <Route path="*" element={
            <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-6">Page not found</p>
                <a href="/" className="text-blue-600 hover:text-blue-700">← Back to Components</a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
