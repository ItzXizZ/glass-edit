import React from 'react';
import './Progress.css';

const Progress = () => {
  return (
    <>
      <div className="progress-container">
    <div className="progress-label">
      <span>Loading...</span>
      <span>75%</span>
    </div>
    <div className="progress-wrap">
      <div className="progress">
        <div className="progress-bar" style={{width: "75%"}}></div>
      </div>
      <div className="progress-shadow"></div>
    </div>
  </div>

  <div className="progress-container">
    <div className="progress-label">
      <span>Upload Progress</span>
      <span>100%</span>
    </div>
    <div className="progress-wrap">
      <div className="progress">
        <div className="progress-bar" style={{width: "100%"}}></div>
      </div>
      <div className="progress-shadow"></div>
    </div>
  </div>

  <div className="progress-container">
    <div className="progress-label">
      <span>Storage Used</span>
      <span>45%</span>
    </div>
    <div className="progress-wrap">
      <div className="progress">
        <div className="progress-bar" style={{width: "45%"}}></div>
      </div>
      <div className="progress-shadow"></div>
    </div>
  </div>
    </>
  );
};

export default Progress;
