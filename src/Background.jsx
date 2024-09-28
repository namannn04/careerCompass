import React from 'react';
import './Background.css';  // Link to your CSS

const Background = () => {
  return (
    <div className="background">
      {/* This div creates the checkered effect */}
      <div className="checkered-pattern"></div>
    </div>
  );
};

export default Background;

