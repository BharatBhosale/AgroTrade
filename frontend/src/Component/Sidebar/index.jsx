import React from "react";
import "./style.css";

const Sidebar = ({
  open,
  setSidebarOpen,
  navSelection,
  setNavSelection,
  user,
  handleLogout,
}) => {
  const handleClick = (page) => {
    setNavSelection(page);
    setSidebarOpen(false);
  };

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setSidebarOpen(false)}>
        ✕
      </button>

      <button
        className={navSelection === "About" ? "active" : ""}
        onClick={() => handleClick("About")}
      >
        About Us
      </button>

      <button
        className={navSelection === "Contact" ? "active" : ""}
        onClick={() => handleClick("Contact")}
      >
        Contact
      </button>
      <button
        className={navSelection === "Home" ? "active" : ""}
        onClick={() => handleClick("Home")}
      >
        Home
      </button>
      {user ? (
        <button
          onClick={() => {
            handleLogout();
            setSidebarOpen(false);
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className={navSelection === "Login" ? "active" : ""}
          onClick={() => handleClick("Login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
