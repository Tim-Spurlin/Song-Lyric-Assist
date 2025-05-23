import React from 'react';
import { useApp } from '../contexts/AppContext';
import './LyricDisplay.css';

const LyricDisplay = () => {
  const { generatedLyrics, isLoading, error } = useApp();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLyrics);
    // You could add a toast notification here
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLyrics], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'lyrics.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (error) {
    return (
      <div className="lyric-display error">
        <h2>Error</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="lyric-display loading">
        <div className="loading-animation">
          <div className="music-note">♪</div>
          <div className="music-note">♫</div>
          <div className="music-note">♪</div>
        </div>
        <p>Creating your lyrics...</p>
      </div>
    );
  }

  if (!generatedLyrics) {
    return (
      <div className="lyric-display placeholder">
        <h2>Your Lyrics Will Appear Here</h2>
        <p>Configure your preferences and click "Generate Lyrics" to begin</p>
        <div className="placeholder-icon">📝</div>
      </div>
    );
  }

  // Parse lyrics to format sections
  const formatLyrics = (lyrics) => {
    const sections = lyrics.split('\n\n');
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const isTitle = lines[0].match(/^\[.*\]$/) || lines[0].match(/^(Verse|Chorus|Bridge|Outro|Pre-Chorus|Intro)/i);
      
      if (isTitle) {
        return (
          <div key={index} className="lyric-section">
            <h3 className="section-title">{lines[0].replace(/[\[\]]/g, '')}</h3>
            <div className="section-content">
              {lines.slice(1).map((line, i) => (
                <p key={i} className="lyric-line">{line}</p>
              ))}
            </div>
          </div>
        );
      }
      
      return (
        <div key={index} className="lyric-section">
          <div className="section-content">
            {lines.map((line, i) => (
              <p key={i} className="lyric-line">{line}</p>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="lyric-display">
      <div className="lyric-header">
        <h2>Generated Lyrics</h2>
        <div className="lyric-actions">
          <button onClick={handleCopy} className="action-button">
            📋 Copy
          </button>
          <button onClick={handleDownload} className="action-button">
            💾 Download
          </button>
        </div>
      </div>
      
      <div className="lyric-content">
        {formatLyrics(generatedLyrics)}
      </div>
    </div>
  );
};

export default LyricDisplay;