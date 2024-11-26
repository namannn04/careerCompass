import React from "react";
import mainImage from "./main.png";
import careerData from "./careerData";
import { Link } from "react-router-dom";
import './career.css';
import './subCar.css'
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Career = () => {
  const CareerCard = ({ id, category, image, careers }) => (
    <div className="careerCard">
      <img src={image} alt={category} className="careerImage" />
      <h2 className="careerCategory">{category}</h2>
      <div className="careerGrid">
        {careers.slice(0, 3).map((career, index) => (
          <div key={index} className="careerItem">
            {career}
          </div>
        ))}
      </div>
      <Link to={`/category/${id}`}>
        <button className="exploreButton">
          Explore {category} Careers
        </button>
      </Link>
    </div>
  );

  return (
    <>
      <Navbar/>
      <div className="main">
        <h1 className="carHead">Explore Careers</h1>
        <div className="Explore">
          <div className="exploreAbout">
            Your journey to the perfect career starts
            with ease. Discover a world of opportunities as our career cards
            guide you step-by-step on how to excel in your chosen field. Dive
            deeper with expert insights through blogs that address the most
            common questions students face.<br/><br/><br/><br/>
            <div className="exploreStart">Start your exploration now and find the career that’s right for you!    <i class="fa-solid fa-arrow-right"></i></div>
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
            id={card.id}
            image={card.image}
            category={card.category}
            careers={card.careers}
          />
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default Career;
