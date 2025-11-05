import React from 'react';
import './Alert.css';

const Alert = () => {
  return (
    <>
      <div className="alert-wrap">
    <div className="alert">
      <div className="alert-content">
        <div className="alert-text">
          <div className="alert-title">Success</div>
          <p className="alert-message">Your changes have been saved successfully.</p>
        </div>
      </div>
    </div>
    <div className="alert-shadow"></div>
  </div>

  <div className="alert-wrap">
    <div className="alert">
      <div className="alert-content">
        <div className="alert-text">
          <div className="alert-title">Warning</div>
          <p className="alert-message">Please review your information before continuing.</p>
        </div>
      </div>
    </div>
    <div className="alert-shadow"></div>
  </div>

  <div className="alert-wrap">
    <div className="alert">
      <div className="alert-content">
        <div className="alert-text">
          <div className="alert-title">Error</div>
          <p className="alert-message">Something went wrong. Please try again.</p>
        </div>
      </div>
    </div>
    <div className="alert-shadow"></div>
  </div>

  <div className="alert-wrap">
    <div className="alert">
      <div className="alert-content">
        <div className="alert-text">
          <div className="alert-title">Information</div>
          <p className="alert-message">This is an informational message for you.</p>
        </div>
      </div>
    </div>
    <div className="alert-shadow"></div>
  </div>
    </>
  );
};

export default Alert;
