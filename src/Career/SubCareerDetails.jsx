import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/autoplay'; 
import { Autoplay } from 'swiper/modules'; 
import blogData from "../Blog/blogData";
import BlogPost from "../Blog/BlogPost";
import './subCareer.css'; 
import Flowchart from "./flow";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/Footer";

const CareerDetail = () => {
  const { careerName } = useParams();
  const [career, setCareer] = useState(null); 
  const [boxes, setBoxes] = useState([]);
  const [showBlog, setShowBlog] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/careers/${encodeURIComponent(careerName)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCareer(data);
      } catch (error) {
        console.error('Error fetching career data:', error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchCareerData();
  }, [careerName]);
  

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

  if (loading) {
    return <div>Loading...</div>; 
  }

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
        <Flowchart careerName={careerName} />

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
          modules={[Autoplay]} 
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2500, 
            disableOnInteraction: false, 
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
