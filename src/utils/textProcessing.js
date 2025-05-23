// Process and clean text for analysis
export const processText = (text) => {
    if (!text || typeof text !== 'string') return '';
    
    return text
      .toLowerCase()
      .replace(/[^\w\s'-]/g, '') // Keep words, spaces, apostrophes, and hyphens
      .replace(/\s+/g, ' ')       // Normalize whitespace
      .trim();
  };
  
  // Tokenize text into words
  export const tokenize = (text) => {
    const processed = processText(text);
    return processed.split(/\s+/).filter(word => word.length > 0);
  };
  
  // Remove stop words
  export const removeStopWords = (words) => {
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
      'to', 'was', 'will', 'with', 'the', 'i', 'you', 'we', 'they',
      'me', 'him', 'her', 'us', 'them', 'my', 'your', 'our', 'their',
      'this', 'that', 'these', 'those', 'am', 'been', 'being', 'do',
      'does', 'did', 'have', 'had', 'having', 'may', 'might', 'must',
      'can', 'could', 'should', 'would', 'shall', 'will', 'there',
      'here', 'where', 'when', 'why', 'how', 'what', 'which', 'who'
    ]);
    
    return words.filter(word => !stopWords.has(word.toLowerCase()));
  };
  
  // Extract n-grams from text
  export const extractNGrams = (text, n = 2) => {
    const words = tokenize(text);
    const ngrams = [];
    
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.push(words.slice(i, i + n).join(' '));
    }
    
    return ngrams;
  };
  
  // Calculate word frequency
  export const calculateWordFrequency = (text) => {
    const words = tokenize(text);
    const frequency = new Map();
    
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });
    
    // Convert to sorted array
    return Array.from(frequency.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([word, count]) => ({ word, count }));
  };
  
  // Calculate TF-IDF (Term Frequency-Inverse Document Frequency)
  export const calculateTFIDF = (documents) => {
    const documentFrequency = new Map();
    const termFrequencies = [];
    
    // Calculate term frequency for each document
    documents.forEach((doc, docIndex) => {
      const words = tokenize(doc);
      const tf = new Map();
      
      words.forEach(word => {
        tf.set(word, (tf.get(word) || 0) + 1);
        
        // Track document frequency
        if (!termFrequencies[docIndex]?.has(word)) {
          documentFrequency.set(word, (documentFrequency.get(word) || 0) + 1);
        }
      });
      
      termFrequencies[docIndex] = tf;
    });
    
    // Calculate TF-IDF scores
    const tfidfScores = [];
    const totalDocs = documents.length;
    
    termFrequencies.forEach((tf, docIndex) => {
      const scores = new Map();
      
      tf.forEach((freq, word) => {
        const tf_score = freq / Math.max(...tf.values());
        const idf_score = Math.log(totalDocs / (documentFrequency.get(word) || 1));
        scores.set(word, tf_score * idf_score);
      });
      
      tfidfScores[docIndex] = scores;
    });
    
    return tfidfScores;
  };
  
  // Clean lyrics for display
  export const cleanLyrics = (lyrics) => {
    if (!lyrics) return '';
    
    return lyrics
      .replace(/\[([^\]]+)\]/g, '\n[$1]\n') // Format section headers
      .replace(/\n{3,}/g, '\n\n')            // Remove excessive line breaks
      .trim();
  };
  
  // Format lyrics for generation
  export const formatLyrics = (sections) => {
    return sections
      .map(section => {
        if (typeof section === 'string') {
          return section;
        }
        
        const { type, content } = section;
        return `[${type}]\n${content}`;
      })
      .join('\n\n');
  };
  
  // Extract sections from lyrics
  export const extractSections = (lyrics) => {
    const sections = [];
    const lines = lyrics.split('\n');
    let currentSection = null;
    let currentContent = [];
    
    lines.forEach(line => {
      const sectionMatch = line.match(/^\[([^\]]+)\]$/);
      
      if (sectionMatch) {
        // Save previous section
        if (currentSection) {
          sections.push({
            type: currentSection,
            content: currentContent.join('\n').trim()
          });
        }
        
        // Start new section
        currentSection = sectionMatch[1];
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    });
    
    // Save last section
    if (currentSection) {
      sections.push({
        type: currentSection,
        content: currentContent.join('\n').trim()
      });
    }
    
    return sections;
  };
  
  // Calculate text similarity (Jaccard similarity)
  export const calculateSimilarity = (text1, text2) => {
    const words1 = new Set(tokenize(text1));
    const words2 = new Set(tokenize(text2));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  };
  
  // Generate text statistics
  export const generateTextStats = (text) => {
    const words = tokenize(text);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const uniqueWords = new Set(words);
    
    return {
      wordCount: words.length,
      uniqueWordCount: uniqueWords.size,
      sentenceCount: sentences.length,
      averageWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
      averageSentenceLength: words.length / sentences.length,
      lexicalDiversity: uniqueWords.size / words.length
    };
  };
  
  // Censor explicit content
  export const censorExplicitContent = (text, exclusions = []) => {
    let censored = text;
    
    // Default explicit words to censor
    const explicitWords = [
      'fuck', 'shit', 'damn', 'hell', 'ass', 'bitch',
      // Add more as needed
    ];
    
    // Combine with user exclusions
    const allExclusions = [...explicitWords, ...exclusions];
    
    allExclusions.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const replacement = '*'.repeat(word.length);
      censored = censored.replace(regex, replacement);
    });
    
    return censored;
  };
  
  // Convert text to title case
  export const toTitleCase = (text) => {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  
  // Wrap text to specified line length
  export const wrapText = (text, lineLength = 80) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      if (currentLine.length + word.length + 1 <= lineLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines.join('\n');
  };