import React from 'react';
import confusedStudent from '../assets/logo-avatars/about1.png';
import './about.css';

const About = () => {
  return (
    <div className="about-section-about1" id='about'>
      <div className="box-about1 top-left-about1">
        <p>Students are confused about which career path to follow.</p>
      </div>
      <div className="box-about1 top-right-about1">
        <p>The pressure to choose the right career often leads to stress.</p>
      </div>
      <div className="box-about1 bottom-left-about1">
        <p>Understanding strengths and weaknesses is crucial for career success.</p>
      </div>
      <div className="box-about1 bottom-right-about1">
        <p>Many students don't know where to start when choosing a career.</p>
      </div>
      <img src={confusedStudent} alt="Confused Student" className="center-image-about1" />
    </div>
  );
};

export default About;