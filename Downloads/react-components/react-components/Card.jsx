import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <>
      <div className="card-wrap">
    <div className="card">
      <div className="card-content">
        <h2>Glassmorphic Design</h2>
        <p>This card component maintains all the intricate design details from the original button, including the sophisticated glassmorphic effects, animated gradients, and dynamic shadows.</p>
        <p>The multi-layered approach creates depth through careful use of backdrop filters, inset shadows, and conic gradient borders that animate smoothly on hover.</p>
      </div>
    </div>
    <div className="card-shadow"></div>
  </div>
    </>
  );
};

export default Card;
