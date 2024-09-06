import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo-avatars/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="#home"><img src={logo} alt="Logo" className="logo"/></a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about">About</a>
        </li>
        <li className="navopt">
          <a href="#careers">Explore</a>
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
