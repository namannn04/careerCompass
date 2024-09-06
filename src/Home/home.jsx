import avatar1 from "../assets/logo-avatars/avatar1.png";
import "./home.css";

export default function Home() {
  return (
    <div className="homepage-container"  id="home">
      <div className="left-section">
        <div className="content">
          <div className="website-name">careerCompass</div>
          <div className="tagline">
            Navigating the Complexities of Career Choices with Precision and
            Insight
          </div>
        </div>
      </div>
      <div className="right-section">
        <img src={avatar1} alt="Avatar" className="avatar1" />
      </div>
    </div>
  );
}
