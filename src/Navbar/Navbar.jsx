import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { HashLink } from 'react-router-hash-link'; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="web_name">
        <Link to="/">careerCompass</Link>
      </div>

      {/* Menu icon for mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Normal links for larger screens */}
      <ul className="nav-links">
        <li>
        <HashLink smooth to="/#about">About</HashLink>
        </li>
        <li>
          <Link to="/Career">Explore</Link>
        </li>
        <li>
          <Link to ="/Strategies">Strategies</Link>
        </li>
        <li>
          <a href="#counseling">Contact</a>
        </li>
      </ul>

      {/* Side menu for mobile */}
      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>
          &times; {/* Close icon */}
        </div>
        <ul className="side_menu_list">
          <li>
            <a href="#about" onClick={toggleMenu}>About</a>
          </li>
          <li>
            <Link to="/Career" onClick={toggleMenu}>Explore</Link>
          </li>
          <li>
            <a href="/Strategies" onClick={toggleMenu}>Strategies</a>
          </li>
          <li>
            <a href="#counseling" onClick={toggleMenu}>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
