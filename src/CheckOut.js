import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb } from "antd";
import Navbar from "./components/Navbar"; // Corrected import path
import FooterComponent from "./components/Footer";
import "./components/Checkout.css"; // Import the external CSS file
import CarIntro from "./CarInto";
import CarColors from "./CarColors";
import VarientTable from "./VarientTable";
import SwiftSpecificationTable from "./SpecificationTable";
import { Link, useParams } from "react-router-dom";

const { Content, Footer } = Layout;

const imageLinks = [
  "https://th.bing.com/th/id/R.93754d1bc168446ad1af06dd746b30e6?rik=gLmHk%2fZx5hbXfg&riu=http%3a%2f%2fimages.dealersites.cardekho.com%2f1973%2fuploads%2f18749901.jpg&ehk=XIu0jmFoJ%2bLMo8NZTu9j4CWEKDodiJXxx44CWhZ7xfQ%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/R.c08d62e7186bfc3f0e941c7a0d9cf9a8?rik=s11h8eZftVfVBw&riu=http%3a%2f%2fimages.dealersites.cardekho.com%2f2223%2fbanner%2ftigorzi-17401.jpg&ehk=50964OdIAEd%2b9YfHqjyNLLhu7jMYXoBOdLNj%2bfi6AWw%3d&risl=&pid=ImgRaw&r=0",
  "https://s3-ap-southeast-1.amazonaws.com/assetsin.izmocars.com/b_images/verna-16393-8351.jpg",
  "https://nandpalmohit.github.io/carsline/assets/adv/i20hr.jpg"
];

const CheckOut = () => {
  // Default values for theme tokens (replace with actual values if using theme)
  const colorBgContainer = "#ffffff"; // Default background color
  const borderRadiusLG = "8px"; // Default border radius

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [vehicleName, setVehicleName] = useState('');
  const { id } = useParams(); // Get vehicleId from URL params
  const vehicleId = id;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
        setFade(false);
      }, 1000); // 1 second for fade-out effect
    }, 7000); // 5000 ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`https://autospherebackend.onrender.com/api/vehicles/${vehicleId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Vehicle Data:', data.name); // Debugging: Log vehicle data
        setVehicleName(data.name);
        // fetchBrandName(data.brand_id); // Fetch brand name once vehicle data is fetched
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  return (
    <Layout>
      <div style={{ backgroundColor: "transparent", padding: 0 }}>
        <Navbar />
      </div>

      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: '16px 0', textAlign: 'center' }}>
          <Breadcrumb.Item>
            <Link to="/" style={{textDecoration:"none"}}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <Link to="/#cars" style={{textDecoration:"none"}}>All Car</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{vehicleName}</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span>
            <a href="#overview" className="link">
              Overview
            </a>
          </span>
          <span>
            <a href="#variant" className="link">
              Variant
            </a>
          </span>
          <span>
            <a href="#specs" className="link">
              Specification
            </a>
          </span>
          <span>
            <a href="#color" className="link">
              Colors
            </a>
          </span>
        </div>
      </Content>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Example shadow
        }}
      >
        <CarIntro />
      </div>
      <SwiftSpecificationTable />
      <div className="adv-cars" style={{ marginTop: 30, padding: '0px 5%' }}>
        <img 
          src={imageLinks[currentImageIndex]} 
          width="100%" 
          alt="Car Advertisement" 
          className={fade ? "fade-out" : ""} 
        />
      </div>
      <VarientTable />
      <CarColors />
      <Footer style={{ textAlign: "center" }}>
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default CheckOut;
