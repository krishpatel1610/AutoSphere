import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './components/Checkout.css';
import { ArrowRightOutlined } from '@ant-design/icons'; // Import ArrowRightOutlined from Ant Design

const SpecificationTable = () => {
  const { id } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alternativeCars, setAlternativeCars] = useState([]);
  const [brandName, setBrandName] = useState(""); // State to store brand name
  const staticCategoryId = '6668257973cd6403d5f164ac'; // Define the static category ID here

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`https://autospherebackend.onrender.com/api/vehicles/${id}`);
        if (response.data) {
          setVehicleData(response.data);
          setLoading(false);
          fetchAlternativeCars(response.data.category_id, id);
          fetchBrandName(response.data.brand_id); // Fetch brand name based on brand_id
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  const fetchAlternativeCars = async (categoryId, currentVehicleId) => {
    try {
      const response = await axios.get(`https://autospherebackend.onrender.com/api/vehicles/byCategory/${categoryId}?limit=4`);
      if (response.data) {
        const filteredCars = response.data.filter(car => car._id !== currentVehicleId);
        const carsWithBrandNames = await Promise.all(filteredCars.map(async (car) => {
          const brand = await fetchBrandName(car.brand_id);
          return {
            ...car,
            brandName: brand
          };
        }));
        setAlternativeCars(carsWithBrandNames);
      }
    } catch (error) {
      console.error('Error fetching alternative cars:', error);
    }
  };

  const fetchBrandName = async (brandId) => {
    try {
      const response = await axios.get(`https://autospherebackend.onrender.com/api/brands/${brandId}`);
      if (response.data) {
        return response.data.name; // Return brand name
      }
    } catch (error) {
      console.error('Error fetching brand name:', error);
      return 'Unknown Brand'; // Default value if fetching fails
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vehicleData) {
    return <p>Failed to fetch vehicle data.</p>;
  }

  const renderTransmissionTypes = () => {
    if (!vehicleData.variants || vehicleData.variants.length === 0) return null;

    const transmissionTypeMap = {
      A: 'Automatic',
      M: 'Manual',
      AMT: 'Automated Manual Transmission',
      CVT: 'Continuously Variable Transmission',
      DCT: 'Dual-Clutch Transmission'
    };

    const transmissionTypes = [...new Set(vehicleData.variants.flatMap(variant => variant.transmission_type))];
    const transmissionNames = transmissionTypes.map(type => transmissionTypeMap[type] || 'Unknown').join(' / ');

    return transmissionNames;
  };

  const renderEngineSize = () => {
    if (!vehicleData || !vehicleData.variants || vehicleData.variants.length === 0) return null;

    const engineSizes = vehicleData.variants.map(variant => variant.engine_size);
    const minEngineSize = Math.min(...engineSizes);
    const maxEngineSize = Math.max(...engineSizes);

    return minEngineSize === maxEngineSize ? `${minEngineSize} cc` : `${minEngineSize} - ${maxEngineSize} cc`;
  };

  const vehicleTypeMap = {
    P: 'Petrol',
    D: 'Diesel',
    E: 'Electric'
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  const VehicleInfoTable = ({ vehicleData }) => {
    const prices = vehicleData.variants.map(variant => variant.price);
    const priceRange = prices[0] === prices[prices.length - 1]
      ? `${formatPrice(prices[0])}`
      : `${formatPrice(prices[0])} - ${formatPrice(prices[prices.length - 1])}`;

    return (
      <TableRow title="Ex-Showroom Price (Delhi)" data={priceRange} />
    );
  };

  return (
    <section className="table-section" id="specs">
      <table>
        <caption>{vehicleData.name} Specification</caption>
        <tbody>
          <VehicleInfoTable vehicleData={vehicleData} />
          <TableRow title="Fuel Type" data={vehicleTypeMap[vehicleData.vehicle_type]} />
          <TableRow title="Transmission Type" data={renderTransmissionTypes()} />
          <TableRow title="Engine Size" data={renderEngineSize()} />
          <TableRow title="Power" data="83 bhp @ 6000 RPM - 74 bhp @ 4000 RPM" />
          <TableRow title="Torque" data="115 Nm @ 4000 RPM - 190 Nm @ 2000 RPM" />
          <TableRow title="Mileage (ARAI)" data="20.4 kmpl - 25.2 kmpl" />
          <TableRow title="Alternate Fuel" data="Not Applicable" />
          <TableRow title="No of gears" data="5 Gears" />
          <TableRow title="Engine Type" data="K Series VVT Engine - DDiS Diesel Engine" />
          <TableRow
            title="Engine Description"
            data="1.2-litre 83.11bhp 16V K Series VVT Engine <br />1.3-litre 74bhp 16V DDiS Diesel Engine"
          />
          <TableRow title="No. of Cylinders" data="4" />
          <TableRow title="Top Speed" data="155 kmph -165 kmph" />
          <TableRow title="Length" data="3850 mm" />
          <TableRow title="Width" data="1695 mm" />
          <TableRow title="Height" data="1530 mm" />
          <TableRow title="Ground Clearance" data="170 mm" />
          <TableRow title="Wheel Size" data="14 Inch" />
          <TableRow title="Acceleration (0-100 kmph)" data="12.6 Seconds" />
          <TableRow title="Seating Capacity" data="5" />
          <TableRow title="Fuel Tank Capacity" data="42 litres" />
          <TableRow title="Central Locking" data="Yes" />
          <TableRow title="Child Safety Lock" data="Yes" />
          <TableRow title="Anti-Lock Braking System (ABS)" data="No" />
          <TableRow title="Airbags" data="1 (Driver Only) <br />2 (Driver &amp; Co-Driver)" />
        </tbody>
      </table>
    <table style={{backgroundColor: "transparent"}}>
      
      {alternativeCars.length > 0 && (
        <>
        <caption >Alternative Cars</caption>
        <div style={{ marginTop: '5px' }}>
          {alternativeCars.map((car, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #f0f0f0', borderRadius: '5px', textAlign: 'center', padding: '20px', backgroundColor: '#F8F9F9', cursor: 'pointer' }}>
              <div style={{ height: '60px', width: 'auto' }}>
                <img src={car.images[0]} alt={`${car.brandName} ${car.name}`} style={{ height: '100%', borderRadius: '10px', filter: 'none' }} />
              </div>
              <div style={{ backgroundColor: 'transparent', padding: '10px' }}>
                <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{car.brandName} {car.name}</div>
                <div style={{ fontSize: '14px', color: '#757575' }}>
                  <span><i className="fa fa-inr" aria-hidden="true"></i> {`${formatPrice(car.variants[0].price)}*`}</span>
                </div>
                <a className='links' href={`/a/cars/${car._id}`} >Check Out More <ArrowRightOutlined /></a>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
      </table>
    </section>
  );
};

const TableRow = ({ title, data }) => (
  <tr>
    <td className="title">{title}</td>
    <td className="data" dangerouslySetInnerHTML={{ __html: data }} />
  </tr>
);

export default SpecificationTable;
