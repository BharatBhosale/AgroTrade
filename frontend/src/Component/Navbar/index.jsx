import React from 'react'
import './style.css'

const Navbar = () => {
  return (
<>
 <nav className="navbar">

      <div className="logo">
        AgroTrade
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Farmers</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="nav-buttons">
        <button className="login">Login</button>
        <button className="register">Register</button>
      </div>

    </nav>
</>
  )
}

export default Navbar;          
