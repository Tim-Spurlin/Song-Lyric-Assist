import React from 'react';
import { useApp } from '../contexts/AppContext';
import { LIMITS } from '../utils/constants';
import './StylePrompt.css';

const StylePrompt = () => {
  const { stylePrompt, setStylePrompt } = useApp();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= LIMITS.MAX_PROMPT_LENGTH) {
      setStylePrompt(value);
    }
  };

  const remainingChars = LIMITS.MAX_PROMPT_LENGTH - stylePrompt.length;

  return (
    <div className="style-prompt">
      <textarea
        value={stylePrompt}
        onChange={handleChange}
        placeholder="Describe the style, mood, theme, and any specific elements you want in your lyrics. The more detail you provide, the better the generator can tailor the output to your vision. For example: 'Create an uplifting song about overcoming challenges, with metaphors about climbing mountains and finding inner strength. Should have an anthemic chorus suitable for arena performances.'"
        className="style-textarea"
        rows={6}
      />
      <div className="character-count">
        <span className={remainingChars < 100 ? 'warning' : ''}>
          {remainingChars} characters remaining
        </span>
      </div>
      
      <div className="prompt-suggestions">
        <p className="suggestions-title">💡 Tips for better results:</p>
        <ul>
          <li>Describe the mood and emotion you want to convey</li>
          <li>Mention specific themes or topics to explore</li>
          <li>Include details about the intended audience or setting</li>
          <li>Reference specific song structures if desired</li>
        </ul>
      </div>
    </div>
  );
};

export default StylePrompt;