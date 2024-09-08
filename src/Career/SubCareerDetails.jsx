import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper core styles
import 'swiper/css/autoplay'; // Swiper autoplay styles
import { Autoplay } from 'swiper/modules'; // Corrected Autoplay import
import careerDetails from "./careerDetails";
import blogData from "../Blog/blogData";
import BlogPost from "../Blog/BlogPost";
import './subCareer.css'; 
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CareerDetail = () => {
  const { careerName } = useParams();
  const career = careerDetails[decodeURIComponent(careerName)];
  const [boxes, setBoxes] = useState([]);
  const [showBlog, setShowBlog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxes(document.querySelectorAll('.box'));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (boxes.length > 0) {
      boxes.forEach((box, index) => {
        setTimeout(() => {
          box.classList.add('active');
        }, index * 800);
      });
    }
  }, [boxes]);

  if (!career) {
    return <div>Career not found</div>;
  }

  const handleReadBlogClick = () => {
    setShowBlog(!showBlog);
  };

  return (
    <>
    <Navbar/>
    <div className="careerDetail">
      
      <h1 className="carHead">{careerName}</h1>

      {/* Education Path with Animations */}
      <h2 className="head">Education Path</h2>
      <div className="timeline">
        <div className="line"></div>
        {career.educationPath.map((step, index) => (
          <div 
            key={index} 
            className={`box ${index % 2 === 0 ? 'left' : 'right'}`} 
            style={{ top: `${(index * 30) + 10}%` }} 
          >
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h2 className="headRes">Resources</h2>
      <div className="resources-container">
        <div className="resources-column online-resources">
          <h3 className="head">Online Resources</h3>
          {career.resources.online.map((resource, index) => (
            <div key={index} className="resource-card">
              {resource}
            </div>
          ))}
        </div>
        
        <div className="resources-column offline-resources">
          <h3 className="head">Offline Resources</h3>
          {career.resources.offline.map((resource, index) => (
            <div key={index} className="resource-card">
              {resource}
            </div>
          ))}
        </div>
      </div>

      <h2 className="headRes">Skills Required</h2>
      {/* Automatic Skills Slider */}
      <Swiper
        modules={[Autoplay]} // Add autoplay module
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500, // Time in milliseconds before moving to the next slide
          disableOnInteraction: false, // Keeps autoplay running even after user interaction
        }}
        grabCursor={true}
      >
        {career.skillsRequired.map((skill, index) => (
          <SwiperSlide key={index}>
            <div className="skill-card">
              {skill}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button onClick={handleReadBlogClick} className="exploreButton">
        {showBlog ? "Hide Blog" : "Read the Blog"}
      </button>

      {showBlog && (
        <BlogPost
          title={blogData.title}
          author={blogData.author}
          career={careerName}
          data={blogData.data}
          content={blogData.content}
          quote={blogData.quote}
          quoteAuth={blogData.quoteAuth}
        />
      )}
    </div>
    <Footer/>
    </>
  );
};

export default CareerDetail;
