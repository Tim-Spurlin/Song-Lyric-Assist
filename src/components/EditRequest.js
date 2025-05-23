import React from 'react';
import { useApp } from '../contexts/AppContext';
import { LIMITS } from '../utils/constants';
import './EditRequest.css';

const EditRequest = () => {
  const { editRequest, setEditRequest, generatedLyrics } = useApp();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= LIMITS.MAX_EDIT_REQUEST_LENGTH) {
      setEditRequest(value);
    }
  };

  return (
    <div className="edit-request">
      <h3>Edit Request (Optional)</h3>
      <p className="edit-description">
        Request specific edits to refine the generated lyrics
      </p>
      <input
        type="text"
        value={editRequest}
        onChange={handleChange}
        placeholder={generatedLyrics ? "e.g., 'Make the chorus more upbeat' or 'Add more metaphors in verse 2'" : "Generate lyrics first, then request edits here"}
        className="edit-input"
        disabled={!generatedLyrics}
      />
      <div className="character-count">
        {editRequest.length}/{LIMITS.MAX_EDIT_REQUEST_LENGTH} characters
      </div>
    </div>
  );
};

export default EditRequest;