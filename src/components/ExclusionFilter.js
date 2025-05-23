import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { EXCLUSION_SUGGESTIONS, LIMITS } from '../utils/constants';
import './ExclusionFilter.css';

const ExclusionFilter = () => {
  const { 
    exclusions, 
    exclusionsEnabled, 
    setExclusionsEnabled,
    addExclusion,
    removeExclusion 
  } = useApp();
  
  const [inputValue, setInputValue] = useState('');

  const handleToggle = () => {
    setExclusionsEnabled(!exclusionsEnabled);
  };

  const handleAddExclusion = (e) => {
    e.preventDefault();
    if (inputValue.trim() && exclusions.length < LIMITS.MAX_EXCLUSIONS) {
      addExclusion(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!exclusions.includes(suggestion) && exclusions.length < LIMITS.MAX_EXCLUSIONS) {
      addExclusion(suggestion);
    }
  };

  return (
    <div className="exclusion-filter">
      <div className="exclusion-header">
        <h3>Style Exclusions</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={exclusionsEnabled}
            onChange={handleToggle}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
      
      {exclusionsEnabled && (
        <div className="exclusion-content">
          <p className="exclusion-description">
            Specify themes, words, or concepts to avoid in the generated lyrics
          </p>
          
          <form onSubmit={handleAddExclusion} className="exclusion-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type exclusion and press Enter"
              disabled={exclusions.length >= LIMITS.MAX_EXCLUSIONS}
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || exclusions.length >= LIMITS.MAX_EXCLUSIONS}
            >
              Add
            </button>
          </form>
          
          {exclusions.length > 0 && (
            <div className="exclusion-tags">
              {exclusions.map((exclusion, index) => (
                <span key={index} className="exclusion-tag">
                  {exclusion}
                  <button 
                    onClick={() => removeExclusion(exclusion)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          
          <div className="exclusion-suggestions">
            <p>Common exclusions:</p>
            <div className="suggestion-chips">
              {EXCLUSION_SUGGESTIONS.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={exclusions.includes(suggestion) || exclusions.length >= LIMITS.MAX_EXCLUSIONS}
                  className="suggestion-chip"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          <p className="exclusion-count">
            {exclusions.length}/{LIMITS.MAX_EXCLUSIONS} exclusions
          </p>
        </div>
      )}
    </div>
  );
};

export default ExclusionFilter;