// Footer.js

import React from 'react';
import '../components/Checkout.css'; // Import your external CSS file for styling

const Footer = () => {
  return (
    <footer className="content">
      <div className="data">
        <h3  style={{color:'#5214ae'}} >AutoSphere</h3>
        <p>India's /1 and largest portal of auto car vehicle. We give you the <br /> best reviews and rates for your cars.We believe brand interaction <br /> is key in communication. Real innovations and a positive <br /> customer experience are the heart of successful communication.</p>
      </div>
      <div className="link">
        <h3>Links</h3>
        <a href="/" title="">Home</a>
        <a href="/" title="">About Us</a>
        <a href="/" title="">Cars</a>
        <a href="/" title="">Contact Us</a>
        <a href="/" title="">News</a>
      </div>
      <div className="service">
        <h3>Services</h3>
        <a href="/" title="">Brands</a>
        <a href="/" title="">Compare Cars</a>
        <a href="/" title="">Top Selling Cars</a>
        <a href="/" title="">Top Luxury Cars</a>
      </div>
      <div className="detail">
        <h3>Contact Us</h3>
        <a href="mailto:emailid@gmail.com" title="">emailid@gmail.com</a>
        <a href="tel:+919876543210" title="">+91 9876543210</a>
        <a href="https://carsline.com" title="">Carsline.com</a>
      </div>
    </footer>
  );
};

export default Footer;
