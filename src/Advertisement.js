import React from 'react';
import './components/Style.css'; // Ensure correct path to your CSS file

const Advertisement = () => {
  return (
    <main className="maincontent" style={{width:"100%"}}>
      
      {/* Header Section */}
      <header className="banner">
        <div className="title">
          <p>We are India's #1 Auto Portal Website for Cars.</p>
          <h3>Thank You For Visit.</h3>
        </div>
      </header>

      {/* Advertisement Section */}
      <div style={{padding:"40px 5%"}}>
      <div className="adv">
        <div className="adv-logo">
          <img src="https://raw.githubusercontent.com/nandpalmohit/carsline/5f3f222fefd289d46bfaf7cd3f86cb4b25536f65/assets/adv1.svg" alt="Advertisement Logo" />
        </div>
        <div className="adv-content">
          <h2>Sell your car at best Price</h2>
          <span>No Charges • Instant Payment • Covid Safety</span>
        </div>
        <div className="adv-info">
          <button type="submit" className="advBtn">Book your appointment</button>
          <h5 className="adv-terms"><i className="fa fa-check-square-o" aria-hidden="true"></i> Terms and Conditions apply</h5>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Advertisement;
