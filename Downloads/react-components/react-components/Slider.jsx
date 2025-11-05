import React, { useState } from 'react';
import './Slider.css';

const Slider = () => {
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(45);
  const [temperature, setTemperature] = useState(22);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const calculatePercent = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <>
      <div className="slider-group">
        <div className="slider-label">
          <span>Volume</span>
          <span>{volume}</span>
        </div>
        <div className="slider-wrap">
          <div className="slider-container">
            <div className="slider-track" style={{width: `${volume}%`}}></div>
            <input 
              type="range" 
              className="slider" 
              min="0" 
              max="100" 
              value={volume}
              onChange={handleVolumeChange}
            />
            <div className="slider-thumb-wrap" style={{left: `${volume}%`}}>
              <div className="slider-thumb"></div>
            </div>
          </div>
          <div className="slider-shadow"></div>
        </div>
      </div>

      <div className="slider-group">
        <div className="slider-label">
          <span>Brightness</span>
          <span>{brightness}</span>
        </div>
        <div className="slider-wrap">
          <div className="slider-container">
            <div className="slider-track" style={{width: `${brightness}%`}}></div>
            <input 
              type="range" 
              className="slider" 
              min="0" 
              max="100" 
              value={brightness}
              onChange={handleBrightnessChange}
            />
            <div className="slider-thumb-wrap" style={{left: `${brightness}%`}}>
              <div className="slider-thumb"></div>
            </div>
          </div>
          <div className="slider-shadow"></div>
        </div>
      </div>

      <div className="slider-group">
        <div className="slider-label">
          <span>Temperature</span>
          <span>{temperature}°C</span>
        </div>
        <div className="slider-wrap">
          <div className="slider-container">
            <div className="slider-track" style={{width: `${calculatePercent(temperature, 15, 30)}%`}}></div>
            <input 
              type="range" 
              className="slider" 
              min="15" 
              max="30" 
              value={temperature}
              onChange={handleTemperatureChange}
            />
            <div className="slider-thumb-wrap" style={{left: `${calculatePercent(temperature, 15, 30)}%`}}>
              <div className="slider-thumb"></div>
            </div>
          </div>
          <div className="slider-shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Slider;
