import React, { useState } from 'react';
import {
  MenuOutlined, 
  SearchOutlined
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink and useLocation from React Router
import './Style.css'; // Import the external CSS file

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation(); // Get the current location using useLocation()

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <nav className="navbar-container">
        <h3 onClick={() => window.location.href = '/'} style={{ color:'#5214ae' }}>AutoSphere</h3>
        <div className="search-container" style={{marginTop:"auto",marginBottom:"auto"}}>
          <input
            type="search"
            name="searchCars"
            placeholder="Search Your Cars"
            className="searchInp"
          />
          <button type="button" className="searchBtn" style={{ backgroundColor:'#5214ae' }}>
            <SearchOutlined style={{ fontSize: "18px", color: "black" }} />
          </button>
        </div>
        <button type="button" className="menu-button" onClick={toggleMenu}>
          <MenuOutlined style={{ fontSize: '18px', color: 'black' }} />
        </button>
      </nav>
      <nav className={`menu-container ${menuActive ? 'active' : ''}`}>
        <NavLink exact to="/" style={{ color: location.pathname === '/' ? '#5214ae' : 'black' }}>Home</NavLink>
        <a href="#newCars" style={{ color: location.pathname === '/contact' ? '#5214ae' : 'black' }}>New Arrivals</a>
        <a href="#brands" style={{ color: location.pathname === '/about' ? '#5214ae' : 'black' }}>Brands</a>
        <a href="#cars" style={{ color: location.pathname === '/cars' ? '#5214ae' : 'black' }}>Cars</a>
        <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
      </nav>
    </div>
  );
};

export default Navbar;
