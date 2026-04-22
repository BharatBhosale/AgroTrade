import React from "react";
import "./style.css";

const Navbar = ({ navSelection, setNavSelection, setSidebarOpen }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>

        <div className="logo" onClick={() => setNavSelection("Home")}>
          🌾 AgroTrade
        </div>
      </div>

      <div className="nav-links">

        <button
          className={navSelection === "Home" ? "active" : ""}
          onClick={() => setNavSelection("Home")}
        >
          Home
        </button>

        <button
          className={navSelection === "About" ? "active" : ""}
          onClick={() => setNavSelection("About")}
        >
          About Us
        </button>

        <button
          className={navSelection === "Contact" ? "active" : ""}
          onClick={() => setNavSelection("Contact")}
        >
          Contact
        </button>

      </div>
    </nav>
  );
};

export default Navbar;