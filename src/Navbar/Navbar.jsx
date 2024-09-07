import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-avatars/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="web_name">
        <a href="#home">careerCompass</a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about">About</a>
        </li>
        <li className="navopt">
        <Link to="/Career">Explore</Link>
        </li>
        <li>
          <a href="#study-techniques">Strategies</a>
        </li>
        <li>
          <a href="#counseling">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
