import React, { useState, useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import './components/Panel.css'; // Import your CSS file
import { useLocation } from 'react-router-dom';

const imageLinks = [
  "https://tuningwerk.de/wp-content/uploads/2017/01/Slider_Tuningwerk_Firstclass_ENG.jpg",
  "https://pictures.dealer.com/r/ramseyvolvovcna/1461/5af08d866527751113d6e7ef0aee5691x.jpg?impolicy=resize_crop&w=1600&h=514",
  "https://pictures.dealer.com/g/gunthervolvocarsdaytonabeachvcna/1770/e08d716bbc7ea7bc34246de68ae48cb6x.jpg?impolicy=resize_crop&w=1600&h=514",
  "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1892,h_481/https://www.policarobmw.ca/wp-content/uploads/2023/07/PBMW-1892x481-2023-Landing-Page-Banner-M-Option-2.jpg",
];
const imageLinks2 = [
  "https://th.bing.com/th/id/R.93754d1bc168446ad1af06dd746b30e6?rik=gLmHk%2fZx5hbXfg&riu=http%3a%2f%2fimages.dealersites.cardekho.com%2f1973%2fuploads%2f18749901.jpg&ehk=XIu0jmFoJ%2bLMo8NZTu9j4CWEKDodiJXxx44CWhZ7xfQ%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/R.c08d62e7186bfc3f0e941c7a0d9cf9a8?rik=s11h8eZftVfVBw&riu=http%3a%2f%2fimages.dealersites.cardekho.com%2f2223%2fbanner%2ftigorzi-17401.jpg&ehk=50964OdIAEd%2b9YfHqjyNLLhu7jMYXoBOdLNj%2bfi6AWw%3d&risl=&pid=ImgRaw&r=0",
  "https://s3-ap-southeast-1.amazonaws.com/assetsin.izmocars.com/b_images/verna-16393-8351.jpg",
  "https://github.com/nandpalmohit/carsline/blob/main/assets/adv/aura.jpg?raw=true"
];

const Panel = () => {
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab
  const [categories, setCategories] = useState([]); // State to store categories
  const [vehicles, setVehicles] = useState([]);
  const [newvehicles, setNewvehicles] = useState([]); // State to store vehicles based on activeTab
  const [brands, setBrands] = useState([]); // State to store brands
  const [showMoreBrands, setShowMoreBrands] = useState(false); // State to manage showing more brands
  const [currentCategoryName, setCurrentCategoryName] = useState(''); // State to store current category name
  const [currentMonth, setCurrentMonth] = useState(''); // State to store current month
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [count,setCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search query
  const [searchTimer, setSearchTimer] = useState(0); // Timer in seconds
  

  useEffect(() => {
    // Fetch initial data (categories, brands, vehicles)
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('https://autospherebackend.onrender.com/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const brandsResponse = await fetch('https://autospherebackend.onrender.com/api/brands');
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

  useEffect(() => {
    // Fetch new vehicles
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://autospherebackend.onrender.com/api/vehicles');
        const vehiclesData = await response.json();

        // Get the last 4 cars and reverse them to get in descending order
        const lastFourVehicles = vehiclesData.slice(-4).reverse();

        setNewvehicles(lastFourVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    // Handle scrolling to section based on hash in URL
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200); // Add a slight delay
    }
  }, [location]);

  useEffect(() => {
    // Function to get current month name
    const getCurrentMonth = () => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const now = new Date();
      return months[now.getMonth()];
    };

    setCurrentMonth(getCurrentMonth());
  }, []);

  useEffect(() => {
    // Interval for changing advertisement images
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
        setFade(false);
      }, 1000); // 1 second for fade-out effect
    }, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const searchQuery = localStorage.getItem('searchQuery') || '';
    if(searchQuery !== '')
      {    // Function to fetch vehicles based on searchQuery
    const fetchData = async () => {
      try {
        // Fetch all vehicles (replace with your actual API endpoint)
        const response = await fetch('https://autospherebackend.onrender.com/api/vehicles');
        const vehiclesData = await response.json();

        // Get searchQuery from localStorage
        const searchQuery = localStorage.getItem('searchQuery') || '';

        // Filter vehicles based on searchQuery (if searchQuery exists)
        let filteredVehicles = vehiclesData;
        if (searchQuery) {
          const lowercaseSearchQuery = searchQuery.toLowerCase();
          filteredVehicles = vehiclesData.filter(vehicle =>
            vehicle.name.toLowerCase().includes(lowercaseSearchQuery) ||
            brands.find(brand => brand._id === vehicle.brand_id)?.name.toLowerCase().includes(lowercaseSearchQuery)
          );
        }

        // Update vehicles state with filtered results
        setVehicles(filteredVehicles);

        if (searchQuery) {
          setSearchTimer(15); // Set timer to 15 seconds

          const interval = setInterval(() => {
            setSearchTimer(prevTimer => prevTimer - 0.5);

          }, 1000); // Decrease timer every second

          // Clear timer and searchQuery from localStorage after 15 seconds
          setTimeout(() => {
            clearInterval(interval);
            localStorage.removeItem('searchQuery');
            setSearchTimer(0); // Reset timer
            window.location.reload(); // Reload the page
          }, 15000); // 15 seconds in milliseconds
        }

      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    // Fetch data initially
    fetchData();
  }

  }, [brands]); // Dependency array includes brands, ensure fetchData runs when brands change



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

  const fetchVehiclesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`https://autospherebackend.onrender.com/api/vehicles/byCategory/${categoryId}`);
      const vehiclesData = await response.json();

      // Sort vehicles by launch date in descending order
      vehiclesData.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate));

      setVehicles(vehiclesData);
    } catch (error) {
      console.error(`Error fetching vehicles for category ${currentCategoryName}:`, error);
    }
  };

  return (
    <div style={{ padding: "0px 5%" }}>
      <div className="panel">
        <div className="panel" id="brands">
          <h3>Top Brands</h3>
          <div className="brandcontent">
            {brands.slice(0, showMoreBrands ? brands.length : 12).map(brand => (
              <div className="brand_cards" key={brand._id}>
                <img src={brand.image} alt={brand.name} />
              </div>
            ))}
          </div><br/>
          {brands.length > 12 && (
            <div className="show-more-brands">
              <button className='links' onClick={() => setShowMoreBrands(!showMoreBrands)}>
                {showMoreBrands ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </div><br/>
        <h3 id="newCars">New Cars Of {currentYear}</h3>
        <div className="tabcontent">
          {newvehicles.length > 0 ? (
            newvehicles.map(vehicle => (
              <div key={vehicle._id} className="cards">
                <h5 className="badge">Just Launched</h5>
                <img src={vehicle.images[0]} alt="" width="100%" style={{objectFit: "contain"}}/>
                <div className="card-data">
                  <a href={`cars/${vehicle._id}`}>{vehicle.name}</a>
                  <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.city_price[0].price)} <span>onwards</span></h4>
                  <span className="card-para">*Ex-showroom price in {vehicle.city_price[0].name}</span>
                  <a href={`cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found for {currentCategoryName}</p>
          )}
        </div>
        <br/><br/>
        <div className="adv-cars" style={{ marginTop: 30 }}>
          <img 
            src={imageLinks[currentImageIndex]} 
            width="100%" 
            alt="Car Advertisement" 
            className={fade ? "fade-out" : "fade-in"} 
          />
        </div><br/><br/>
        <div className="panel" style={{ borderRadius: "10px", backgroundColor: "#fff", width: "100%", position: "relative", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }} id="cars">
        <h3>All Cars</h3>
        {searchTimer > 0 && (
          <p>Search results will clear in {searchTimer} seconds...</p>
        )}
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
                <h5 className="badge">{vehicle.engine_size} cc </h5>
                <img src={vehicle.images[0]} alt={vehicle.name} style={{ objectFit: "contain" }} />
                <div className="card-data">
                  <a href={`/cars/${vehicle._id}`}>{brands.find(brand => brand._id === vehicle.brand_id)?.name} {vehicle.name}</a>
                  <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.city_price[0].price)} <span>onwards</span></h4>
                  <span className="card-para">*Ex-showroom price in {vehicle.city_price[0].name}</span>
                  <a href={`/cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found</p>
          )}
        </div>
      </div>
      <br /><br />
        <div className="adv-cars" style={{ marginTop: 30 }}>
          <img 
            src={imageLinks2[currentImageIndex]} 
            width="100%" 
            alt="Car Advertisement" 
            className={fade ? "fade-out" : "fade-in"} 
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;
