// Extract rhyme patterns from lyrics
export const extractPatterns = (lines) => {
    if (!lines || lines.length < 2) return null;
  
    const pattern = [];
    const endWords = lines.map(line => getLastWord(line).toLowerCase());
    const rhymeGroups = new Map();
    let currentGroup = 'A';
  
    endWords.forEach((word, index) => {
      let foundRhyme = false;
  
      // Check if this word rhymes with any previous words
      for (const [prevWord, group] of rhymeGroups.entries()) {
        if (doWordsRhyme(word, prevWord)) {
          pattern[index] = group;
          foundRhyme = true;
          break;
        }
      }
  
      if (!foundRhyme) {
        // Assign new rhyme group
        pattern[index] = currentGroup;
        rhymeGroups.set(word, currentGroup);
        currentGroup = String.fromCharCode(currentGroup.charCodeAt(0) + 1);
      }
    });
  
    return pattern.join('');
  };
  
  // Get the last word from a line
  const getLastWord = (line) => {
    const words = line.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    // Remove punctuation
    return lastWord.replace(/[.,!?;:'"]/g, '');
  };
  
  // Simple rhyme detection
  const doWordsRhyme = (word1, word2) => {
    if (word1 === word2) return true;
    
    // Check if words end with the same 2-3 characters (simplified rhyme detection)
    const ending1 = word1.slice(-3);
    const ending2 = word2.slice(-3);
    
    if (ending1 === ending2) return true;
    
    // Check common rhyme patterns
    const rhymePairs = [
      ['ay', 'ey', 'ai'],
      ['ight', 'ite', 'yte'],
      ['ow', 'ou', 'ough'],
      ['ee', 'ea', 'ey'],
      ['ore', 'or', 'our'],
      ['ake', 'eak', 'ache']
    ];
    
    for (const group of rhymePairs) {
      if (group.some(ending => word1.endsWith(ending)) && 
          group.some(ending => word2.endsWith(ending))) {
        return true;
      }
    }
    
    return false;
  };
  
  // Analyze meter and syllable patterns
  export const analyzeMeter = (line) => {
    // Simplified syllable counting
    const syllables = countSyllables(line);
    const stress = detectStressPattern(line);
    
    return {
      syllableCount: syllables,
      stressPattern: stress,
      meterType: classifyMeter(stress)
    };
  };
  
  // Count syllables in a line (simplified)
  const countSyllables = (line) => {
    const words = line.toLowerCase().split(/\s+/);
    let totalSyllables = 0;
    
    words.forEach(word => {
      // Remove non-alphabetic characters
      word = word.replace(/[^a-z]/g, '');
      
      // Count vowel groups as syllables (simplified)
      const vowelGroups = word.match(/[aeiouy]+/g) || [];
      let syllables = vowelGroups.length;
      
      // Adjust for silent e
      if (word.endsWith('e') && syllables > 1) {
        syllables--;
      }
      
      // Ensure at least one syllable per word
      if (syllables === 0) syllables = 1;
      
      totalSyllables += syllables;
    });
    
    return totalSyllables;
  };
  
  // Detect stress pattern (simplified)
  const detectStressPattern = (line) => {
    // This is a very simplified stress detection
    // In reality, this would require a pronunciation dictionary
    const words = line.split(/\s+/);
    const pattern = [];
    
    words.forEach((word, index) => {
      if (isStressedWord(word, index, words)) {
        pattern.push('S'); // Stressed
      } else {
        pattern.push('u'); // Unstressed
      }
    });
    
    return pattern.join('');
  };
  
  // Determine if a word is likely stressed
  const isStressedWord = (word, index, allWords) => {
    // Simple heuristic: content words are usually stressed
    const unstressedWords = [
      'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
      'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
      'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall'
    ];
    
    return !unstressedWords.includes(word.toLowerCase());
  };
  
  // Classify meter type
  const classifyMeter = (stressPattern) => {
    // Simplified meter classification
    if (stressPattern.includes('uS')) {
      return 'iambic'; // Unstressed-stressed pattern
    } else if (stressPattern.includes('Su')) {
      return 'trochaic'; // Stressed-unstressed pattern
    } else if (stressPattern.includes('uuS')) {
      return 'anapestic'; // Two unstressed, one stressed
    } else if (stressPattern.includes('Suu')) {
      return 'dactylic'; // One stressed, two unstressed
    }
    
    return 'mixed';
  };
  
  // Find alliteration patterns
  export const findAlliteration = (line) => {
    const words = line.toLowerCase().split(/\s+/);
    const alliterations = [];
    
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i][0] === words[i + 1][0] && /^[a-z]/.test(words[i][0])) {
        alliterations.push({
          words: [words[i], words[i + 1]],
          letter: words[i][0],
          position: i
        });
      }
    }
    
    return alliterations;
  };
  
  // Find assonance patterns
  export const findAssonance = (line) => {
    const words = line.toLowerCase().split(/\s+/);
    const vowelSounds = words.map(word => extractVowelSounds(word));
    const assonances = [];
    
    for (let i = 0; i < vowelSounds.length - 1; i++) {
      for (let j = i + 1; j < vowelSounds.length; j++) {
        if (vowelSounds[i] === vowelSounds[j] && vowelSounds[i]) {
          assonances.push({
            words: [words[i], words[j]],
            sound: vowelSounds[i],
            positions: [i, j]
          });
        }
      }
    }
    
    return assonances;
  };
  
  // Extract vowel sounds from a word (simplified)
  const extractVowelSounds = (word) => {
    const vowelPattern = word.match(/[aeiouy]+/g);
    return vowelPattern ? vowelPattern.join('') : '';
  };
  
  // Detect repetition patterns
  export const detectRepetition = (lines) => {
    const repetitions = {
      exactLines: [],
      phrases: [],
      words: new Map()
    };
    
    // Find repeated lines
    const lineMap = new Map();
    lines.forEach((line, index) => {
      const normalized = line.toLowerCase().trim();
      if (lineMap.has(normalized)) {
        repetitions.exactLines.push({
          line: line,
          positions: [...lineMap.get(normalized), index]
        });
      } else {
        lineMap.set(normalized, [index]);
      }
    });
    
    // Find repeated phrases (3+ words)
    const allText = lines.join(' ').toLowerCase();
    const words = allText.split(/\s+/);
    
    for (let phraseLength = 3; phraseLength <= 5; phraseLength++) {
      for (let i = 0; i <= words.length - phraseLength; i++) {
        const phrase = words.slice(i, i + phraseLength).join(' ');
        const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = allText.match(regex);
        
        if (matches && matches.length > 1) {
          repetitions.phrases.push({
            phrase: phrase,
            count: matches.length
          });
        }
      }
    }
    
    // Count word frequencies
    words.forEach(word => {
      if (word.length > 3) { // Only count words longer than 3 characters
        repetitions.words.set(word, (repetitions.words.get(word) || 0) + 1);
      }
    });
    
    return repetitions;
  };