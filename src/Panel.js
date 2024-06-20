import React, { useState, useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import './components/Panel.css'; // Import your CSS file
import { WrapText } from '@material-ui/icons';

const Panel = () => {
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab
  const [categories, setCategories] = useState([]); // State to store categories
  const [vehicles, setVehicles] = useState([]); // State to store vehicles based on activeTab
  const [brands, setBrands] = useState([]); // State to store brands
  const [currentCategoryName, setCurrentCategoryName] = useState(''); // State to store current category name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const brandsResponse = await fetch('http://localhost:5000/api/brands');
        const brandsData = await brandsResponse.json();
        setBrands(brandsData);

        // Set the first category as activeTab on initial load
        if (categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          setActiveTab(firstCategory._id);
          setCurrentCategoryName(firstCategory.name);
          fetchVehiclesByCategory(firstCategory._id); // Fetch vehicles initially for the first category
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchVehiclesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/byCategory/${categoryId}`);
      const vehiclesData = await response.json();

      // Sort vehicles by launch date in descending order
      vehiclesData.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate));

      setVehicles(vehiclesData);
    } catch (error) {
      console.error(`Error fetching vehicles for category ${currentCategoryName}:`, error);
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  const handleTabClick = async (categoryId, categoryName) => {
    setActiveTab(categoryId);
    setCurrentCategoryName(categoryName);
    await fetchVehiclesByCategory(categoryId);
  };

  return (
    <div style={{ padding: "0px 5%" }}>
      <div className="panel">
      <div className="panel">
          <h3>Top Brands</h3>
          <div className="brandcontent" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", marginTop: "20px" }}>
            {brands.map(brand => (
              <div className="brand_cards" key={brand._id}>
                <img src={brand.image} alt={brand.name} />
              </div>
            ))}
          </div>
        </div>
        <h3>New Cars Of 2020</h3>
        <div className="tabcontent" id="topSellCars">
          {vehicles.length > 0 ? (
            vehicles.map(vehicle => (
              <div key={vehicle._id} className="cards">
                <h5 className="badge">Just Launched</h5>
                <img src={vehicle.image} alt="" width="100%" />
                <div className="card-data">
                  <a href={`cars/${vehicle._id}`}>{vehicle.name}</a>
                  <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.price)} <span>onwards</span></h4>
                  <span className="card-para">*Ex-showroom price in {vehicle.city}</span>
                  <a href={`cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found for {currentCategoryName}</p>
          )}
        </div>
        <br/><br/>
        <div class="adv-cars" style={{ marginTop: 30, padding: '0px 5%' }}>
        <img src="https://nandpalmohit.github.io/carsline/assets/adv/i20hr.jpg" width="100%" />
        </div><br/><br/>
        <div className="tabs">
          {categories.map(category => (
            <button
              key={category._id}
              className={`tablink ${activeTab === category._id ? 'active' : ''}`}
              onClick={() => handleTabClick(category._id, category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="tabcontent">
          {vehicles.length > 0 ? (
            vehicles.map(vehicle => (
              <div key={vehicle._id} className="cards">
                <h5 className="badge">99</h5>
                <img src={vehicle.images[0]} alt={vehicle.name} />
                <div className="card-data">
                  <a href={`/cars/${vehicle._id}`}>{brands[vehicle.brand_id]} {vehicle.name}</a>
                  <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.city_price[0].price)} <span>onwards</span></h4>
                  <span className="card-para">*Ex-showroom price in {vehicle.city_price[0].name}</span>
                  <a href={`/cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found for {currentCategoryName}</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Panel;
