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
import { db } from '../../backend/firestore'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

const CareerDetail = () => {
  const { careerName } = useParams();
  const [career, setCareer] = useState(null); 
  const [boxes, setBoxes] = useState([]); 
  const [showBlog, setShowBlog] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        console.log('Fetching career data for:', careerName);
        
        // Create a query to find the document where careerName matches
        const careersRef = collection(db, 'careers');
        const q = query(careersRef, where('careerName', '==', careerName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the first matching document
          const doc = querySnapshot.docs[0];
          console.log('Career data found:', doc.data());
          setCareer(doc.data());
        } else {
          console.error('Career not found in Firestore');
          setError(`Career "${careerName}" not found. Please check the URL and try again.`);
        }
      } catch (error) {
        console.error('Error fetching career data:', error);
        setError('An error occurred while fetching the career data. Please try again later.');
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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!career) {
    return <div>Career not found. Please check the URL and try again.</div>;
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
            {career.resources?.online?.map((resource, index) => (
              <div key={index} className="resource-card">
                {resource}
              </div>
            ))}
          </div>
          
          <div className="resources-column offline-resources">
            <h3 className="head">Offline Resources</h3>
            {career.resources?.offline?.map((resource, index) => (
              <div key={index} className="resource-card">
                {resource}
              </div>
            ))}
          </div>
        </div>

        <h2 className="headRes">Skills Required</h2>
        {career.skillsRequired && career.skillsRequired.length > 0 ? (
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
        ) : (
          <div>No skills data available.</div>
        )}

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

