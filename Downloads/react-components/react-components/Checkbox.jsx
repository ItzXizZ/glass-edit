import React, { useState } from 'react';
import './Checkbox.css';

const Checkbox = () => {
  const [checks, setChecks] = useState({
    terms: true,
    newsletter: false,
    remember: false
  });

  const handleChange = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <label className="checkbox-label">
        <div className="checkbox-wrap">
          <input 
            type="checkbox" 
            className="checkbox-input" 
            checked={checks.terms}
            onChange={() => handleChange('terms')}
          />
          <div className="checkbox"></div>
          <div className="checkbox-shadow"></div>
        </div>
        <span>Accept terms and conditions</span>
      </label>

      <label className="checkbox-label">
        <div className="checkbox-wrap">
          <input 
            type="checkbox" 
            className="checkbox-input" 
            checked={checks.newsletter}
            onChange={() => handleChange('newsletter')}
          />
          <div className="checkbox"></div>
          <div className="checkbox-shadow"></div>
        </div>
        <span>Subscribe to newsletter</span>
      </label>

      <label className="checkbox-label">
        <div className="checkbox-wrap">
          <input 
            type="checkbox" 
            className="checkbox-input" 
            checked={checks.remember}
            onChange={() => handleChange('remember')}
          />
          <div className="checkbox"></div>
          <div className="checkbox-shadow"></div>
        </div>
        <span>Remember me</span>
      </label>
    </>
  );
};

export default Checkbox;
