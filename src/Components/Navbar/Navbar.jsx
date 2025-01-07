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
    <nav className="flex justify-between items-center w-full pl-12 pr-36 pt-10 bg-transparent text-white z-50">
      {/* Logo for all views */}
      <div className="web_name text-3xl font-semibold">
        <Link to="/" className="hover:text-yellow-400 transition">
          careerCompass
        </Link>
      </div>

      {/* Hamburger menu for mobile */}
      <div
        className="menu-icon text-3xl mr-4 cursor-pointer md:hidden"
        onClick={toggleMenu}
      >
        &#9776; {/* Hamburger Icon */}
      </div>

      {/* Normal Links for Desktop View */}
      <ul className="hidden md:flex space-x-10">
        <li className="group relative">
          <HashLink
            smooth
            to="/#about"
            className="relative text-xl font-semibold hover:text-yellow-400 transition duration-300 ease-out pb-1"
            style={{
              fontFamily: "'Sevillana', cursive",
            }}
          >
            About
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
          </HashLink>
        </li>
        <li className="group relative">
          <Link
            to="/Career"
            className="relative text-xl font-semibold hover:text-yellow-400 transition duration-300 ease-out pb-1"
            style={{
              fontFamily: "'Sevillana', cursive",
            }}
          >
            Explore
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
          </Link>
        </li>
        <li className="group relative">
          <Link
            to="/strategies"
            className="relative text-xl font-semibold hover:text-yellow-400 transition duration-300 ease-out pb-1"
            style={{
              fontFamily: "'Sevillana', cursive",
            }}
          >
            Strategies
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
          </Link>
        </li>
        <li className="group relative">
          <HashLink
            smooth
            to="/#contact"
            className="relative text-xl font-semibold hover:text-yellow-400 transition duration-300 ease-out pb-1"
            style={{
              fontFamily: "'Sevillana', cursive",
            }}
          >
            Contact
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
          </HashLink>
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
            <Link to="/strategies" onClick={toggleMenu}>Strategies</Link>
          </li>
          <li>
            <a href="#contact" onClick={toggleMenu}>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
