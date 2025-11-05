import React, { useState } from 'react';
import './Textarea.css';

const Textarea = () => {
  const [message, setMessage] = useState('');

  return (
    <>
      <div className="form-group">
        <label className="label" htmlFor="message">Message</label>
        <div className="textarea-wrap">
          <textarea 
            id="message" 
            placeholder="Enter your message here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="textarea-shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Textarea;
