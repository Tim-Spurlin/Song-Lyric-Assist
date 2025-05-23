import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { GenerationProvider } from './contexts/GenerationContext';
import Navigation from './components/Navigation';
import GenreSelector from './components/GenreSelector';
import ArtistSelector from './components/ArtistSelector';
import StylePrompt from './components/StylePrompt';
import EditRequest from './components/EditRequest';
import ExclusionFilter from './components/ExclusionFilter';
import GenerateButton from './components/GenerateButton';
import LyricDisplay from './components/LyricDisplay';
import './App.css';

function App() {
  return (
    <AppProvider>
      <GenerationProvider>
        <div className="App">
          <Navigation />
          
          <main className="container">
            <div className="hero-section">
              <h1 className="text-center">Song Lyric Assist</h1>
              <p className="text-center subtitle">
                Generate original song lyrics in the style of your favorite artists
              </p>
            </div>

            <div className="generation-interface">
              <div className="control-panel">
                <div className="control-section">
                  <h2>1. Choose a Genre</h2>
                  <GenreSelector />
                </div>

                <div className="control-section">
                  <h2>2. Select Artists</h2>
                  <ArtistSelector />
                </div>

                <div className="control-section">
                  <h2>3. Describe Your Style</h2>
                  <StylePrompt />
                </div>

                <div className="control-section">
                  <h2>4. Additional Options</h2>
                  <EditRequest />
                  <ExclusionFilter />
                </div>

                <div className="control-section generate-section">
                  <GenerateButton />
                </div>
              </div>

              <div className="output-panel">
                <LyricDisplay />
              </div>
            </div>
          </main>

          <footer className="footer">
            <div className="container">
              <p className="text-center">
                © 2025 Song Lyric Assist. Created for educational and creative purposes.
              </p>
            </div>
          </footer>
        </div>
      </GenerationProvider>
    </AppProvider>
  );
}

export default App;