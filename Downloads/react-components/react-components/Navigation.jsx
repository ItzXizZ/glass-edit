import React, { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="nav-wrap">
        <nav className="nav" data-active={activeIndex} style={{'--Item-0Width': "5.5em", '--Item-1Width': "7em", '--Item-2Width': "5em", '--Item-3Width': "6.5em"}}>
          <button className={`nav-item ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleSetActive(0)}>Home</button>
          <button className={`nav-item ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleSetActive(1)}>Products</button>
          <button className={`nav-item ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleSetActive(2)}>About</button>
          <button className={`nav-item ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleSetActive(3)}>Contact</button>
        </nav>
        <div className="nav-shadow"></div>
      </div>
    </>
  );
};

export default Navigation;
