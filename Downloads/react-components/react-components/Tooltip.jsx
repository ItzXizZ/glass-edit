import React from 'react';
import './Tooltip.css';

const Tooltip = () => {
  return (
    <>
      <div className="tooltip-container">
    <div className="tooltip-trigger">Hover me (Top)</div>
    <div className="tooltip-wrap tooltip-wrap--top">
      <div className="tooltip">
        <div className="tooltip-content">This is a top tooltip</div>
      </div>
      <div className="tooltip-shadow"></div>
    </div>
  </div>

  <div className="tooltip-container">
    <div className="tooltip-trigger">Hover me (Bottom)</div>
    <div className="tooltip-wrap tooltip-wrap--bottom">
      <div className="tooltip">
        <div className="tooltip-content">This is a bottom tooltip</div>
      </div>
      <div className="tooltip-shadow"></div>
    </div>
  </div>

  <div className="tooltip-container">
    <div className="tooltip-trigger">Hover me (Left)</div>
    <div className="tooltip-wrap tooltip-wrap--left">
      <div className="tooltip">
        <div className="tooltip-content">Left tooltip</div>
      </div>
      <div className="tooltip-shadow"></div>
    </div>
  </div>

  <div className="tooltip-container">
    <div className="tooltip-trigger">Hover me (Right)</div>
    <div className="tooltip-wrap tooltip-wrap--right">
      <div className="tooltip">
        <div className="tooltip-content">Right tooltip</div>
      </div>
      <div className="tooltip-shadow"></div>
    </div>
  </div>
    </>
  );
};

export default Tooltip;
