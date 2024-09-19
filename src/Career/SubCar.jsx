import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import careerData from "./careerData";
import './subCar.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const SubCareer = () => {
  const { id } = useParams();
  const selectedCategory = careerData.find((category) => category.id === parseInt(id));

  if (!selectedCategory) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="Subcar-subcar">
        {/* <h1 className="carHead-subcar">{selectedCategory.category}</h1> */}
        <h3 className="head-subcar">Careers in {selectedCategory.category}:</h3>
        <div className="SubcareerGrid-subcar">
          {selectedCategory.careers.map((career, index) => (
            <Link 
              to={`/career/${encodeURIComponent(career)}`} 
              key={index} 
              className="careerGridItemLink-subcar"
            >
              <div className="careerGridItem-subcar">{career}</div>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SubCareer;
