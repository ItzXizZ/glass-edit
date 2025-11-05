import React from 'react';
import './Badge.css';

const Badge = () => {
  return (
    <>
      <div className="badge-wrap">
    <div className="badge">
      <span>New</span>
    </div>
    <div className="badge-shadow"></div>
  </div>

  <div className="badge-wrap">
    <div className="badge badge--success">
      <span>Success</span>
    </div>
    <div className="badge-shadow"></div>
  </div>

  <div className="badge-wrap">
    <div className="badge badge--warning">
      <span>Warning</span>
    </div>
    <div className="badge-shadow"></div>
  </div>

  <div className="badge-wrap">
    <div className="badge badge--error">
      <span>Error</span>
    </div>
    <div className="badge-shadow"></div>
  </div>

  <div className="badge-wrap">
    <div className="badge badge--info">
      <span>Info</span>
    </div>
    <div className="badge-shadow"></div>
  </div>

  <div className="badge-wrap">
    <div className="badge">
      <span>Premium</span>
    </div>
    <div className="badge-shadow"></div>
  </div>
    </>
  );
};

export default Badge;
