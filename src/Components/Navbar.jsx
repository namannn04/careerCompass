import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between items-center w-full px-4 md:pl-32 md:pr-36 md:pt-10 pt-4 bg-transparent text-white z-50 relative">
      {/* Logo for all views */}
      <div className="text-3xl md:text-4xl font-semibold">
        <Link to="/" className="hover:text-yellow-400 transition">
          careerCompass
        </Link>
      </div>

      {/* Hamburger Icon for Mobile View */}
      <button
        className="block md:hidden text-3xl"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {menuOpen ? "✖" : "☰"} {/* Hamburger changes to cross */}
      </button>

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

      {/* Dropdown Menu for Mobile View */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#222222] text-white transition-transform duration-300 ease-in-out transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } z-40`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo in Mobile Dropdown */}
          <div className="text-3xl font-semibold">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              careerCompass
            </Link>
          </div>

          {/* Close Icon */}
          <button
            className="text-3xl"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            ✖
          </button>
        </div>

        <ul className="flex flex-col items-center space-y-4 pt-4 pb-6">
          <li>
            <HashLink
              smooth
              to="/#about"
              className={`text-xl font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                activeLink === "about" ? "bg-yellow-400 text-gray-900" : "hover:text-yellow-400"
              }`}
              onClick={() => {
                setActiveLink("about");
                toggleMenu();
              }}
            >
              About
            </HashLink>
          </li>
          <li>
            <Link
              to="/Career"
              className={`text-xl font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                activeLink === "career" ? "bg-yellow-400 text-gray-900" : "hover:text-yellow-400"
              }`}
              onClick={() => {
                setActiveLink("career");
                toggleMenu();
              }}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/strategies"
              className={`text-xl font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                activeLink === "strategies" ? "bg-yellow-400 text-gray-900" : "hover:text-yellow-400"
              }`}
              onClick={() => {
                setActiveLink("strategies");
                toggleMenu();
              }}
            >
              Strategies
            </Link>
          </li>
          <li>
            <HashLink
              smooth
              to="/#contact"
              className={`text-xl font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                activeLink === "contact" ? "bg-yellow-400 text-gray-900" : "hover:text-yellow-400"
              }`}
              onClick={() => {
                setActiveLink("contact");
                toggleMenu();
              }}
            >
              Contact
            </HashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
