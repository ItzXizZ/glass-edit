import React, { useState, useRef, useEffect } from 'react';
import './Toggle.css';

const Toggle = () => {
  const [selectedOption, setSelectedOption] = useState('1');
  const [previousOption, setPreviousOption] = useState('');
  const switcherRef = useRef(null);

  useEffect(() => {
    if (switcherRef.current) {
      switcherRef.current.setAttribute('c-previous', previousOption);
    }
  }, [previousOption]);

  const handleChange = (newOption) => {
    setPreviousOption(selectedOption);
    setSelectedOption(newOption);
  };

  return (
    <>
      <div className="toggle-wrap">
        <fieldset className="switcher" ref={switcherRef}>
          <legend className="switcher__legend">Choose theme</legend>
          <label className="switcher__option">
            <input 
              className="switcher__input" 
              type="radio" 
              name="theme" 
              value="light" 
              c-option="1" 
              checked={selectedOption === '1'}
              onChange={() => handleChange('1')}
            />
          </label>
          <label className="switcher__option">
            <input 
              className="switcher__input" 
              type="radio" 
              name="theme" 
              value="dark" 
              c-option="2"
              checked={selectedOption === '2'}
              onChange={() => handleChange('2')}
            />
          </label>
          <label className="switcher__option">
            <input 
              className="switcher__input" 
              type="radio" 
              name="theme" 
              value="dim" 
              c-option="3"
              checked={selectedOption === '3'}
              onChange={() => handleChange('3')}
            />
          </label>
        </fieldset>
        <div className="toggle-shadow"></div>
      </div>
    </>
  );
};

export default Toggle;
