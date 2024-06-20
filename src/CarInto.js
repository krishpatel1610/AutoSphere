import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './components/Style.css';

const CarIntro = () => {
  const [vehicle, setVehicle] = useState(null);
  const [brandName, setBrandName] = useState("");
  const { id } = useParams();
  const vehicleId = id;
  console.log(id);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/vehicles/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Vehicle Data:', data);
        setVehicle(data);
        fetchBrandName(data.brand_id);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  const fetchBrandName = async (brandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/brands/${brandId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Brand Data:', data);
      setBrandName(data.name);
    } catch (error) {
      console.error('Error fetching brand name:', error);
      setBrandName('Unknown Brand');
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  const renderSliderOrImage = () => {
    if (!vehicle) {
      return <div>Loading...</div>;
    }

    const { images } = vehicle;

    const settings = {
      dots: false,
      infinite: images.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className="car-show">
        {images.length > 1 ? (
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Car image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={images[0]} alt="Car image" />
        )}
      </div>
    );
  };

  const renderTransmissionTypes = () => {
    if (!vehicle || !vehicle.variants || vehicle.variants.length === 0) return null;

    const transmissionTypeMap = {
      A: 'Automatic',
      M: 'Manual',
      AMT: 'Automated Manual Transmission',
      CVT: 'Continuously Variable Transmission',
      DCT: 'Dual-Clutch Transmission'
    };

    const transmissionTypes = [...new Set(vehicle.variants.flatMap(variant => variant.transmission_type))];
    const transmissionNames = transmissionTypes.map(type => transmissionTypeMap[type] || 'Unknown').join(' / ');

    return (
      <div className="feature-box">
        <img src="https://img.icons8.com/bubbles/60/000000/automatic-gearbox-warning.png" alt="feature icon" />
        <h4>{transmissionNames}</h4>
      </div>
    );
  };

  const renderEngineSize = () => {
    if (!vehicle || !vehicle.variants || vehicle.variants.length === 0) return null;

    const engineSizes = vehicle.variants.map(variant => variant.engine_size);
    const minEngineSize = Math.min(...engineSizes);
    const maxEngineSize = Math.max(...engineSizes);

    return (
      <h4>
        {minEngineSize === maxEngineSize ? `${minEngineSize} cc` : `${minEngineSize} - ${maxEngineSize} cc`}
      </h4>
    );
  };

  const vehicleTypeMap = {
    P: 'Petrol',
    D: 'Diesel',
    E: 'Electric'
  };

  return (
    <section className="car-banner" id="overview">
      <div className="car-intro">
        {renderSliderOrImage()}
        {vehicle && (
          <div className="car-body">
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{`${brandName} ${vehicle.name}`}</h1>
            <div className="rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <a href="#" title="200 reviews | 78 Ratings">200 reviews | 78 Ratings</a>
            </div>
            <h2 className="car-price"><i className="fa fa-inr" aria-hidden="true"></i> <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>₹ {`${formatPrice(vehicle.variants[0].price)} - ${formatPrice(vehicle.variants[vehicle.variants.length - 1].price)}*`}</span></h2>
            <span className="car-span">*Ex-Showroom price in Ahmedabad</span>
            <button className="offerBtn" fdprocessedid="hh7t5i">View More Offers</button>
            <span className="selling"><i className="fa fa-superpowers" aria-hidden="true"></i> 18498 Selling in November.</span>
          </div>
        )}
        <div className="car-box">
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/top-hat.png" alt="feature icon" />
            <h4>1st Selling</h4>
          </div>
          {renderTransmissionTypes()}
          <div className="feature-box">
            <img src="https://img.icons8.com/clouds/60/000000/dashboard.png" alt="feature icon" />
            {renderEngineSize()}
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/gas-station.png" alt="feature icon" />
            <h4>{vehicle && vehicleTypeMap[vehicle.vehicle_type]}</h4>
          </div>
        </div>
      </div>
      <hr />
      <div className="car-review">
        {vehicle && (
          <>
            <h3 className="title">{vehicle.name} Overview</h3>
            <p>{vehicle.overview}</p>
            <h3 className="title">Swift Specification</h3>
            <p>India’s favourite hatchback gets a fresh design language that is youthful as well as upmarket. The interiors have been designed with a host of advanced features including a new cockpit design and a sporty steering wheel with cruise and audio controls and a seven-inch Smartplay Studio.</p>
          </>
        )}
      </div>
    </section>
  );
};

const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 2 }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 2 }}
      onClick={onClick}
    />
  );
};

export default CarIntro;