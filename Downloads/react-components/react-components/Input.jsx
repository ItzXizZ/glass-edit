import React from 'react';
import './Input.css';

const Input = () => {
  return (
    <>
      <div className="form-group">
    <label className="label" htmlFor="email">Email Address</label>
    <div className="input-wrap">
      <input type="email" id="email" placeholder="your@email.com" />
      <div className="input-shadow"></div>
    </div>
  </div>

  <div className="form-group">
    <label className="label" htmlFor="password">Password</label>
    <div className="input-wrap">
      <input type="password" id="password" placeholder="Enter your password" />
      <div className="input-shadow"></div>
    </div>
  </div>

  <div className="form-group">
    <label className="label" htmlFor="username">Username</label>
    <div className="input-wrap">
      <input type="text" id="username" placeholder="Enter username" />
      <div className="input-shadow"></div>
    </div>
  </div>
    </>
  );
};

export default Input;
