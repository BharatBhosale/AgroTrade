import React from "react";
import "./style.css";

const Navbar = ({
  navSelection,
  setNavSelection,
  setSidebarOpen,
  user,
  handleLogout,
}) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>

        <div
          className="logo"
          onClick={() =>
            user ? setNavSelection("Dashboard") : setNavSelection("Home")
          }
        >
          🌾 AgroTrade
        </div>
      </div>

      {user ? (
        
        <div className="nav-user-info">
          <span className="user-name">{user.full_name || "User"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        
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
          <button
            className={navSelection === "Login" ? "active" : ""}
            onClick={() => setNavSelection("Login")}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
