# Contributing to Song Lyric Assist

First off, thank you for considering contributing to Song Lyric Assist! It's people like you that make Song Lyric Assist such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Adding New Artists](#adding-new-artists)
  - [Code Contributions](#code-contributions)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Adding New Artists

To add a new artist to the database:

1. **Verify Legal Compliance**
   - Ensure you have the right to use the lyrical content
   - Verify the content is being used for educational/analysis purposes
   - Do not include copyrighted lyrics directly

2. **Create Artist Directory Structure**
   ```
   Genres/[Genre]/[Artist-Name]/
   ├── lyric-dataset.txt
   ├── lyric-dataset.json
   └── README.md
   ```

3. **Format Requirements**

   **lyric-dataset.txt**:
   ```
   [Song Title 1]
   Metadata about the song structure and patterns
   
   [Song Title 2]
   Metadata about the song structure and patterns
   ```

   **lyric-dataset.json**:
   ```json
   {
     "artist": {
       "name": "Artist Full Name",
       "genres": ["Primary Genre"],
       "activeYears": "2000-present",
       "totalSongs": 100
     },
     "metadata": {
       "lastUpdated": "2025-05-22",
       "sourceVerification": "Verified sources",
       "analysisReady": true
     },
     "songs": [
       {
         "id": "unique_id",
         "title": "Song Title",
         "album": "Album Name",
         "year": 2024,
         "analysis": {
           "rhymeScheme": "ABAB",
           "keyThemes": ["theme1", "theme2"],
           "sentiment": "positive"
         }
       }
     ]
   }
   ```

4. **Update Constants**
   - Add the artist to `src/utils/constants.js`
   - Update the ARTIST_DISPLAY_NAMES mapping

### Code Contributions

1. **Find an Issue**
   - Look for issues labeled `good first issue` or `help wanted`
   - Comment on the issue to let others know you're working on it

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Write clear, commented code
   - Add tests for new functionality
   - Update documentation as needed

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/song-lyric-assist.git
   cd song-lyric-assist
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Style Guidelines

### JavaScript Style Guide

* Use ES6+ features
* 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Add trailing commas in multi-line objects/arrays
* Use meaningful variable names

```javascript
// Good
const artistData = {
  name: 'Artist Name',
  genre: 'Pop',
  songs: [
    'Song 1',
    'Song 2',
  ],
};

// Bad
const d = {
  n: "Artist Name",
  g: "Pop",
  s: ["Song 1", "Song 2"]
}
```

### CSS Style Guide

* Use CSS modules or styled-components for component styles
* Follow BEM naming convention for class names
* Mobile-first responsive design
* Use CSS variables for theme values

```css
/* Good */
.artist-selector {
  display: flex;
  flex-direction: column;
}

.artist-selector__item {
  padding: 0.5rem;
}

/* Bad */
.as {
  display: flex;
  flex-direction: column;
}
```

### React Component Guidelines

* Use functional components with hooks
* Keep components small and focused
* Use prop-types or TypeScript for type checking
* Extract complex logic into custom hooks

```javascript
// Good
const ArtistCard = ({ artist, onSelect }) => {
  const { name, genre, songCount } = artist;
  
  return (
    <div className="artist-card" onClick={() => onSelect(artist)}>
      <h3>{name}</h3>
      <p>{genre} • {songCount} songs</p>
    </div>
  );
};
```

## Commit Guidelines

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Commit Message Format
```
type(scope): subject

body

footer
```

**Types:**
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests
- **chore**: Changes to the build process or auxiliary tools

**Examples:**
```
feat(generator): add multi-artist style blending

Implement the ability to blend styles from multiple selected artists
using weighted averaging of style parameters.

Closes #123
```

## Pull Request Process

1. **Before Submitting**
   - Ensure all tests pass
   - Update documentation
   - Add yourself to contributors list if applicable
   - Ensure your code follows the style guidelines

2. **PR Description Template**
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tests pass locally
   - [ ] Added new tests for features
   - [ ] Tested on mobile devices

   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented my code where necessary
   - [ ] I have updated the documentation
   - [ ] My changes generate no new warnings
   ```

3. **Review Process**
   - A maintainer will review your PR
   - Address any feedback
   - Once approved, your PR will be merged

## Testing Guidelines

### Unit Tests
```javascript
describe('ArtistSelector', () => {
  it('should render all artists for selected genre', () => {
    // Test implementation
  });

  it('should limit selection to MAX_SELECTED_ARTISTS', () => {
    // Test implementation
  });
});
```

### Integration Tests
- Test complete user flows
- Verify data loading and generation
- Check error handling

## Documentation

When adding new features:
1. Update the README.md if needed
2. Add JSDoc comments to functions
3. Update API.md for any API changes
4. Include inline comments for complex logic

## Questions?

Feel free to open an issue with your question or reach out to the maintainers directly.

Thank you for contributing to Song Lyric Assist! 🎵