import React, { useEffect, useState } from 'react';
import './flow.css';
import { db } from '../../../backend/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Flowchart = ({ careerName }) => {
  const [careerInfo, setCareerInfo] = useState(null);

  useEffect(() => {
    const fetchCareerPath = async () => {
      try {
        const careersRef = collection(db, 'careers');
        const q = query(careersRef, where('careerName', '==', careerName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const careerData = querySnapshot.docs[0].data();
          if (careerData.careerPath) {
            setCareerInfo(careerData.careerPath);
          } else {
            throw new Error('Career path not found for this career');
          }
        } else {
          throw new Error('Career not found');
        }
      } catch (error) {
        console.error('Error fetching career path:', error);
      }
    };

    fetchCareerPath();
  }, [careerName]);

  if (!careerInfo) {
    return <div className="loading">Loading career path...</div>;
  }

  return (
    <div className="flowchart">
      <h2 className="main-heading">Career Path</h2>
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
    </div>
  );
};

export default Flowchart;