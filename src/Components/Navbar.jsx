import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { auth, onAuthStateChanged, signOut } from "../../backend/firestore";
import { authStateListener, getUserProfile } from "../../backend/authService";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = authStateListener(async (currentUser) => {
      if (currentUser) {
        try {
          const profile = await getUserProfile();
          setDisplayName(profile.displayName || "");
        } catch (error) {
          console.error("Error fetching profile data:", error.message);
        }
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("Auth state changed: ", authUser);
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  // Sync active link with the current path
  useEffect(() => {
    setActiveLink(location.pathname + location.hash);
  }, [location]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".group")) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center w-full px-4 md:pl-32 md:pr-36 md:pt-10 pt-4 bg-transparent text-white z-50 relative">
      <div className="text-3xl md:text-4xl font-semibold">
        <Link to="/" className="hover:text-[#fcb326] transition">
          careerCompass
        </Link>
      </div>

      <button
        className="block md:hidden text-3xl"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Desktop View */}
      <ul className="hidden md:flex space-x-10">
        <li className="group pt-2 relative">
          <HashLink
            smooth
            to="/#about"
            className={`relative text-xl font-semibold hover:text-[#fcb326] transition duration-300 ease-out pb-1 ${
              activeLink === "/#about" ? "text-[#fcb326]" : ""
            }`}
            // style={{
            //   fontFamily: "'Sevillana', cursive",
            // }}
            onClick={() => handleLinkClick("/#about")}
          >
            About
            <span
              className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#fcb326] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${
                activeLink === "/#about" ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </HashLink>
        </li>
        <li className="group pt-2 relative">
          <Link
            to="/Career"
            className={`relative text-xl font-semibold hover:text-[#fcb326] transition duration-300 ease-out pb-1 ${
              activeLink === "/Career" ? "text-[#fcb326]" : ""
            }`}
            // style={{
            //   fontFamily: "'Sevillana', cursive",
            // }}
            onClick={() => handleLinkClick("/Career")}
          >
            Explore
            <span
              className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#fcb326] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${
                activeLink === "/Career" ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
        </li>
        <li className="group pt-2 relative">
          <Link
            to="/strategies"
            className={`relative text-xl font-semibold hover:text-[#fcb326] transition duration-300 ease-out pb-1 ${
              activeLink === "/strategies" ? "text-[#fcb326]" : ""
            }`}
            // style={{
            //   fontFamily: "'Sevillana', cursive",
            // }}
            onClick={() => handleLinkClick("/strategies")}
          >
            Strategies
            <span
              className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#fcb326]  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${
                activeLink === "/strategies" ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
        </li>
        <li className="group pt-2 relative">
          <HashLink
            smooth
            to="/#contact"
            className={`relative text-xl font-semibold hover:text-[#fcb326] transition duration-300 ease-out pb-1 ${
              activeLink === "/#contact" ? "text-[#fcb326]" : ""
            }`}
            // style={{
            //   fontFamily: "'Sevillana', cursive",
            // }}
            onClick={() => handleLinkClick("/#contact")}
          >
            Contact
            <span
              className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#fcb326] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${
                activeLink === "/#contact" ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </HashLink>
        </li>
        <li className="relative group">
          <button
            className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden focus:outline-none shadow-lg hover:scale-105 transition-transform"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <span className="text-white text-lg font-bold">
              {displayName ? displayName[0].toUpperCase() : "P"}
            </span>
          </button>

          {profileDropdownOpen && (
  <div
    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden"
    style={{ zIndex: 50 }}
  >
    {/* Header Section */}
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
      <p className="text-sm font-semibold text-gray-800 truncate">
        {user?.email || "Not logged in"}
      </p>
      <button
        className="text-gray-400 hover:text-gray-800 transition-transform transform hover:scale-110 duration-200"
        onClick={() => setProfileDropdownOpen(false)}
        title="Close"
      >
        ✕
      </button>
    </div>

    {/* Options Section */}
    <div className="divide-y divide-gray-200">
      {/* Profile Option */}
      <div className="group">
        <Link
          to="/profile"
          className="flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-gray-100"
          onClick={() => {
            setProfileDropdownOpen(false);
            handleLinkClick("/profile");
          }}
        >
          <div className="flex items-center justify-center bg-gray-100 rounded-lg w-10 h-10 text-gray-600 group-hover:bg-gray-200">
            🧑‍💼
          </div>
          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
            Profile
          </span>
        </Link>
      </div>

      {/* LogOut or LogIn */}
      <div className="group">
        {user ? (
          <button
            onClick={() => {
              setProfileDropdownOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-4 px-6 py-4 w-full text-left transition-all duration-200 hover:bg-gray-100"
          >
            <div className="flex items-center justify-center bg-gray-100 rounded-lg w-10 h-10 text-gray-600 group-hover:bg-gray-200">
              🚪
            </div>
            <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
              LogOut
            </span>
          </button>
        ) : (
          <Link
            to="/authentication"
            className="flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-gray-100"
            onClick={() => setProfileDropdownOpen(false)}
          >
            <div className="flex items-center justify-center bg-gray-100 rounded-lg w-10 h-10 text-gray-600 group-hover:bg-gray-200">
              🔑
            </div>
            <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                LogIn
            </span>
          </Link>
        )}
      </div>
    </div>

    {/* Footer Section */}
    <div className="px-6 py-3 bg-gray-50 text-center border-t">
      <p className="text-xs text-gray-500">
        Need help? Visit our{" "}
        <Link
          to="/support"
          className="text-gray-800 font-medium hover:underline hover:text-gray-900"
          onClick={() => setProfileDropdownOpen(false)}
        >
          Support
        </Link>
      </p>
    </div>
  </div>
)}

        </li>
      </ul>

      {/* Mobile View */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#222222] text-white transition-transform duration-300 ease-in-out transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } z-40`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <div className="text-3xl font-semibold">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              careerCompass
            </Link>
          </div>

          <button
            className="text-3xl"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            ✖
          </button>
        </div>

        <div className="flex items-center justify-center px-6 py-4">
          <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
            <span className="text-white text-lg font-bold">
              {displayName ? displayName[0].toUpperCase() : "P"}
            </span>
          </div>
          <Link
            to="/profile"
            className="ml-4 text-lg font-semibold hover:text-[#fcb326] transition"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
        </div>

        <ul className="flex flex-col items-center space-y-6 pt-6 pb-8">
          <li>
            <HashLink
              smooth
              to="/#about"
              className={`text-lg font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out ${
                activeLink === "/#about"
                  ? "bg-[#fcb326] text-gray-900"
                  : "hover:text-[#fcb326]"
              }`}
              onClick={() => handleLinkClick("/#about")}
            >
              About
            </HashLink>
          </li>
          <li>
            <Link
              to="/Career"
              className={`text-lg font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out ${
                activeLink === "/Career"
                  ? "bg-[#fcb326] text-gray-900"
                  : "hover:text-[#fcb326]"
              }`}
              onClick={() => handleLinkClick("/Career")}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/strategies"
              className={`text-lg font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out ${
                activeLink === "/strategies"
                  ? "bg-[#fcb326] text-gray-900"
                  : "hover:text-[#fcb326]"
              }`}
              onClick={() => handleLinkClick("/strategies")}
            >
              Strategies
            </Link>
          </li>
          <li>
            <HashLink
              smooth
              to="/#contact"
              className={`text-lg font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out ${
                activeLink === "/#contact"
                  ? "bg-[#fcb326] text-gray-900"
                  : "hover:text-[#fcb326]"
              }`}
              onClick={() => handleLinkClick("/#contact")}
            >
              Contact
            </HashLink>
          </li>

          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-lg font-semibold px-6 py-3 transition duration-300 ease-in-out"
              >
                🚪 LogOut
              </button>
            ) : (
              <Link
                to="/authentication"
                className="text-lg font-semibold px-6 py-3 transition duration-300 ease-in-out"
              >
                🔑 LogIn
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
