import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('United States');
  const [selectedOption, setSelectedOption] = useState('us');
  const selectRef = useRef(null);

  const options = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, option) => {
    e.stopPropagation();
    setSelectedValue(option.label);
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="form-group">
        <label className="label">Choose a country</label>
        <div className="select-wrap">
          <div className={`select-container ${isOpen ? 'open' : ''}`} ref={selectRef}>
            <div className="select-display" onClick={handleToggle}>
              <span>{selectedValue}</span>
              <div className="select-arrow"></div>
            </div>
            <div className="select-dropdown">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`select-option ${selectedOption === option.value ? 'selected' : ''}`}
                  data-value={option.value}
                  onClick={(e) => handleOptionClick(e, option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
          <div className="select-shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Select;
