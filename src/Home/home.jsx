import avatar1 from "../assets/logo-avatars/avatar1.png";
import Feature from "./Feature";
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
        <div className="feature-box">Feature 1</div>
        <div className="feature-box">Feature 2</div>
        <div className="feature-box">Feature 3</div>
        <div className="feature-box">Feature 4</div>
        <div className="feature-box">Feature 5</div>
        <div className="feature-box">Feature 6</div>
        <div className="feature-box">Feature 7</div>
        {/* Duplicate boxes to create a seamless loop */}
        <div className="feature-box">Feature 1</div>
        <div className="feature-box">Feature 2</div>
        <div className="feature-box">Feature 3</div>
        <div className="feature-box">Feature 4</div>
        <div className="feature-box">Feature 5</div>
        <div className="feature-box">Feature 6</div>
        <div className="feature-box">Feature 7</div>
      </div>
    </div>
      </div>
      <div className="right-section">
        <img src={avatar1} alt="Avatar" className="right-image" />
      </div>
    </div>
  );
}
