import React, { useEffect, useState } from 'react';
import './flow.css';
const Flowchart = ({ careerName }) => {
  const [careerInfo, setCareerInfo] = useState(null);

  useEffect(() => {
    const fetchCareerPath = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/careers/${encodeURIComponent(careerName)}/path`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCareerInfo(data);
      } catch (error) {
        console.error('Error fetching career path:', error);
      }
    };

    fetchCareerPath();
  }, [careerName]);

  if (!careerInfo) {
    return <div>Loading career path...</div>;
  }

  return (
    <>
      <div className="main-heading">Career Path</div>
      <div className="flowchart-container">
        {careerInfo.map((step, index) => (
          <div key={index} className="flowchart-level">
            <div className="flowchart-head">{step.level}</div>
            <div className="flowchart-line"></div>
            <div className="flowchart-branches">
              {step.options.map((option, i) => (
                <div key={i} className="flowchart-box">{option}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Flowchart;
