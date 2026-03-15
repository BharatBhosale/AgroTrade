import React from "react";
import "./style.css";

const Sidebar = ({ open, setSidebarOpen, navSelection, setNavSelection }) => {

  const handleClick = (page) => {
    setNavSelection(page);
    setSidebarOpen(false);
  };

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>

      <button
        className="close-btn"
        onClick={() => setSidebarOpen(false)}
      >
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

    </div>
  );
};

export default Sidebar;