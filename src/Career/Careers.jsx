import React from "react";
import mainImage from '/src/Career/main.png';
import careerData from "./careerData";
import './career.css';
const Career = ({}) => {
  const CareerCard = ({ category, image, careers }) => (
    <div className="careerCard">
      <h2 className="careerCategory">{category}</h2>
      <img src={image} alt={category} className="careerImage" />
      <ul className="careerList">
        {careers.map((career, index) => (
          <li key={index}>{career}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="main">
        <h1 className="carHead">Explore Careers</h1>
        <div className="Explore">
          <div className="exploreAbout">
            In the Explore section, your journey to the perfect career starts
            with ease. Discover a world of opportunities as our career cards
            guide you step-by-step on how to excel in your chosen field,
            highlighting the essential skills you'll need along the way. Dive
            deeper with expert insights through blogs that address the most
            common questions students like you face. With clear, actionable
            advice from professionals who’ve been there, our website ensures
            you’re not just exploring careers, but charting a path to success.
            Start your exploration now and find the career that’s right for you!
          </div>
          <div className="explorePhoto">
            <img src={mainImage} alt="img" />
          </div>
        </div>
      </div>
      <div className="byLine">
        One Click to Success: Explore Your Ideal Career Now!
      </div>
      <div className="careerCards">
        {careerData.map((card) => (
          <CareerCard
            key={card.id}
            category={card.category}
            image={card.image}
            careers={card.careers}
          />
        ))}
      </div>
    </>
  );
};

export default Career;
