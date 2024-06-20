import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import './components/CarColors.css';

const colorNames = {
  red: '#d0161d',
  blue: '#162f5d',
  white: '#eff0f0',
  orange: '#e9473a',
  silver: '#acabab',
  grey: '#737170',
  black: '#000000',
  green: '#00FF00',
  yellow: '#FFFF00',
  brown: '#A52A2A',
  purple: '#800080',
  pink: '#FFC0CB',
};

const CarColors = () => {
  const [carColors, setCarColors] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        if (response.data && response.data.colors) {
          setCarColors(response.data.colors);
          setActiveTab(response.data.colors[0]?._id); // Set initial active tab to the first color ID
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, [id]);

  const openTab = (tabId) => {
    setActiveTab(tabId);
  };

  const getColorCode = (colorName) => {
    const lowerCaseName = colorName.toLowerCase();
    for (let key in colorNames) {
      if (lowerCaseName.includes(key)) {
        return colorNames[key];
      }
    }
    return '#000000'; // Default to black if no matching color found
  };

  return (
    <div className="car-colors" id="color">
      <h3>All Colors</h3>
      <div className="badge-color">
        {carColors.map((color) => (
          <Chip
            key={color._id}
            className={`badge ${activeTab === color._id ? 'active' : ''}`}
            style={{ backgroundColor: getColorCode(color.name), color: 'white' }}
            label=""
            clickable
            onClick={() => openTab(color._id)}
          />
        ))}
      </div>
      {carColors.map((color) => (
        <div
          key={color._id}
          className="box-color"
          id={color._id}
          style={{ display: activeTab === color._id ? 'block' : 'none' }}
        >
          <h4>{color.name}</h4>
          <img src={color.image_url} alt={color.name} />
        </div>
      ))}
    </div>
  );
};

export default CarColors;
