import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThunderboltOutlined, SettingOutlined } from '@ant-design/icons';


const VarientsTable = () => {
  const [vehicleVariants, setVehicleVariants] = useState([]);
  const [vehicleName, setVehicleName] = useState('');
  const [priceCity, setPriceCity] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`https://autospherebackend.onrender.com/api/vehicles/${id}`);
        if (response.data) {
          setVehicleName(response.data.name);
          setPriceCity(response.data.city_price);
          setVehicleVariants(response.data.variants);
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchVehicleData();
  }, [id]);

  const renderEngineSize = () => {
    if (!vehicleVariants || vehicleVariants.length === 0) return null;

    const engineSizes = vehicleVariants.map(variant => variant.engine_size);
    if (engineSizes.length === 0) return null;

    const minEngineSize = Math.min(...engineSizes);
    const maxEngineSize = Math.max(...engineSizes);

    return (
      <h6>
        <ThunderboltOutlined />{minEngineSize === maxEngineSize ? `${minEngineSize} cc` : `${minEngineSize} - ${maxEngineSize} cc`}
      </h6>
    );
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Crore`;
    } else {
      return `${(price / 100000).toFixed(2)} Lakh`;
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <section className="table-section" id="variant">
      <table>
        <caption>{vehicleName} Variants</caption>
        <tbody>
          {vehicleVariants.map((variant, index) => (
            <tr key={index}>
              <td className="title">{variant.name}</td>
              <td className="title">
                {renderEngineSize()}
              </td>
              <td className="title">
                <SettingOutlined /> {variant.transmission_type[0] === 'A' ? 'Auto' : 'Manual'}
              </td>
              <td className="data">₹ {formatPrice(variant.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <caption>Price in Popular Cities</caption>
        <tbody>
          {priceCity.map((cityData, index) => (
            <tr key={index}>
              <td className="title">{cityData.name}</td>
              <td className="data">₹ {formatPrice(cityData.price)} - ₹ {formatPrice(cityData.price + 140000)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default VarientsTable;
