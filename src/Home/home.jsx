import avatar1 from "../assets/logo-avatars/avatar1.png";
import "./home.css";

export default function Home() {
  return (
    <div className="homepage-container">
      <div className="left-section">
        <h1 className="tagline_home">Discover Paths,</h1>
        <h1 className="tagline2_home">Shape Future</h1>
        <p className="tagpara_home">
          Chart your course to success with us! We're excited to make your
          career journey as vibrant and smooth as possible
        </p>
        <div className="slider-container">
          <div className="feature-container">
            <div className="feature-box">Career Guidance</div>
            <div className="feature-box">Structured Roadmaps</div>
            <div className="feature-box">Community Support</div>
            <div className="feature-box">AI Coach</div>
            <div className="feature-box">Blogs</div>
            <div className="feature-box">Strategic Learning</div>
            <div className="feature-box">Recommendation</div>
            <div className="feature-box">Career Guidance</div>
            <div className="feature-box">Structured Roadmaps</div>
            <div className="feature-box">Community Support</div>
            <div className="feature-box">AI Coach</div>
            <div className="feature-box">Blogs</div>
            <div className="feature-box">Strategic Learning</div>
            <div className="feature-box">Recommendation</div>
          </div>
          
        </div>
      </div>
      <div className="right-section">
        <img src={avatar1} alt="Avatar" className="right-image" />
      </div>

    </div>
  );
}
