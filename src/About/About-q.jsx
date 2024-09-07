import avatar2 from "../assets/logo-avatars/avatar2.png";
import "./About-q.css";
export default function About_q() {
  return (
    <div className="about-bg" id="about">
      <div className="about-container">
        <div className="about-q">
          <p>
          Unsure about the right career? <br></br>Discover new paths with our guidance and find where you truly belong
          </p>
        </div>
        <div className="avatar2">
          <img src={avatar2} alt="Avatar" />
        </div>
      </div>
    </div>
  );
}
