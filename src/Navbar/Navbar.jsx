import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-avatars/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about">About</a>
        </li>
        <li className="navopt">
        <Link to="/Career/Careers">Explore</Link>
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
