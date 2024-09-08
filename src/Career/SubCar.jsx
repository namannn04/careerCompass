import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import careerData from "./careerData";
import './subCar.css';
import Navbar from "../Navbar/Navbar";
const SubCareer = () => {
  const { id } = useParams();
  const selectedCategory = careerData.find((category) => category.id === parseInt(id));

  if (!selectedCategory) {
    return <div>Category not found</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="Subcar">
      
      <h1 className="carHead">{selectedCategory.category}</h1>
      <h3 className="head">Careers in {selectedCategory.category}:</h3>
      <div className="SubcareerGrid">
        {selectedCategory.careers.map((career, index) => (
          <Link 
            to={`/career/${encodeURIComponent(career)}`} 
            key={index} 
            className="careerGridItemLink"
          >
            <div className="careerGridItem">{career}</div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default SubCareer;
