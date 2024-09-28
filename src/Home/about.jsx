import React from 'react';
import confusedStudent from '../assets/logo-avatars/about1.png'; // Ensure this path is correct
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <div className="box top-left">
          <p>Choose your career wisely.</p>
        </div>
        <div className="box top-right">
          <p>Explore your strengths.</p>
        </div>
        <div className="box bottom-left">
          <p>Don't rush your decision.</p>
        </div>
        <div className="box bottom-right">
          <p>Seek guidance from mentors.</p>
        </div>
        <img src={confusedStudent} alt="Confused Student" className="center-image" />
      </div>
    </div>
  );
};

export default About;
