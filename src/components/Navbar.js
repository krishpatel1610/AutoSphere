import React, { useState } from 'react';
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import './Style.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const history = useNavigate(); // Use useHistory hook here

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigateTo('/#cars');
    localStorage.setItem('searchQuery', searchQuery);
    console.log(localStorage.getItem('searchQuery'));
    window.location.reload();
  };

  const navigateTo = (path) => {
    history(path);
  };

  return (
    <div>
      <nav className="navbar-container">
        <h3 onClick={() => navigateTo('/')} style={{ color:'#5214ae' }}>AutoSphere</h3>
        <div className="search-container" style={{marginTop:"auto",marginBottom:"auto"}}>
          <input
            type="search"
            name="searchCars"
            placeholder="Search Your Cars"
            className="searchInp"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button 
            type="button" 
            className="searchBtn" 
            style={{ backgroundColor:'#5214ae' }}
            onClick={handleSearchSubmit}
          >
            <SearchOutlined style={{ fontSize: "18px", color: "white" }} />
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
