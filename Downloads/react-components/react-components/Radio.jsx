import React, { useState } from 'react';
import './Radio.css';

const Radio = () => {
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleChange = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <div className="radio-group">
        <div className="fieldset-title">Choose a plan</div>
        
        <label className="radio-label">
          <div className="radio-wrap">
            <input 
              type="radio" 
              name="plan" 
              className="radio-input" 
              checked={selectedPlan === 'free'}
              onChange={() => handleChange('free')}
            />
            <div className="radio">
              <div className="radio-dot"></div>
            </div>
            <div className="radio-shadow"></div>
          </div>
          <span>Free Plan</span>
        </label>

        <label className="radio-label">
          <div className="radio-wrap">
            <input 
              type="radio" 
              name="plan" 
              className="radio-input" 
              checked={selectedPlan === 'pro'}
              onChange={() => handleChange('pro')}
            />
            <div className="radio">
              <div className="radio-dot"></div>
            </div>
            <div className="radio-shadow"></div>
          </div>
          <span>Pro Plan</span>
        </label>

        <label className="radio-label">
          <div className="radio-wrap">
            <input 
              type="radio" 
              name="plan" 
              className="radio-input" 
              checked={selectedPlan === 'enterprise'}
              onChange={() => handleChange('enterprise')}
            />
            <div className="radio">
              <div className="radio-dot"></div>
            </div>
            <div className="radio-shadow"></div>
          </div>
          <span>Enterprise Plan</span>
        </label>
      </div>
    </>
  );
};

export default Radio;
