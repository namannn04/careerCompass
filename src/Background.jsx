import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#1b1b1b] z-[-1]">
      <div className="checkered-pattern"></div>
    </div>
  );
};

export default Background;

