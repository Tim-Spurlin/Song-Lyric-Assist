import React from 'react';
import { useApp } from '../contexts/AppContext';
import './Navigation.css';

const Navigation = () => {
  const { clearSelections } = useApp();

  return (
    <nav className="navigation">
      <div className="container nav-container">
        <div className="nav-brand">
          <h3>🎵 Song Lyric Assist</h3>
        </div>
        
        <div className="nav-links">
          <button 
            className="nav-button"
            onClick={clearSelections}
          >
            New Generation
          </button>
          <button className="nav-button">
            History
          </button>
          <button className="nav-button">
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;