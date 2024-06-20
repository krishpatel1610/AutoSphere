import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './components/Checkout.css';

const SwiftSpecificationTable = () => {
  const { id } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alternativeCars, setAlternativeCars] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        if (response.data) {
          setVehicleData(response.data);
          setLoading(false);
          fetchAlternativeCars(response.data.category); // Fetch alternative cars after main car data is fetched
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  const fetchAlternativeCars = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehicles?category=${category}&limit=4`);
      
      if (response.data) {
        setAlternativeCars(response.data);
      }
    } catch (error) {
      console.error('Error fetching alternative cars:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vehicleData) {
    return <p>Failed to fetch vehicle data.</p>;
  }

  // Function to render transmission types
  const renderTransmissionTypes = () => {
    if (!vehicleData.variants || vehicleData.variants.length === 0) return null;

    // Map transmission codes to full names
    const transmissionTypeMap = {
      A: 'Automatic',
      M: 'Manual',
      AMT: 'Automated Manual Transmission',
      CVT: 'Continuously Variable Transmission',
      DCT: 'Dual-Clutch Transmission'
      // Add more mappings as needed
    };

    // Get unique transmission types from all variants
    const transmissionTypes = [...new Set(vehicleData.variants.flatMap(variant => variant.transmission_type))];
    
    // Map transmission types to their full names
    const transmissionNames = transmissionTypes.map(type => transmissionTypeMap[type] || 'Unknown').join(' / ');

    return transmissionNames;
  };

  // Function to render engine sizes
  const renderEngineSize = () => {
    if (!vehicleData || !vehicleData.variants || vehicleData.variants.length === 0) return null;

    // Get all engine sizes from the variants
    const engineSizes = vehicleData.variants.map(variant => variant.engine_size);
    
    // Determine the minimum and maximum engine sizes
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
    // Add more mappings as needed
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      // If price is 1 crore or more
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      // If price is less than 1 crore
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  return (
    <section className="table-section" id="specs">
      <table>
        <caption>{vehicleData.name} Specification</caption>
        <tbody>
          <TableRow title="Ex-Showroom Price (Delhi)" data={`${formatPrice(vehicleData.variants[0].price)} - ${formatPrice(vehicleData.variants[vehicleData.variants.length - 1].price)}`} />
          <TableRow title="Fuel Type" data={vehicleData && vehicleTypeMap[vehicleData.vehicle_type]} />
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
      <table className="alternative-cars">
        <caption>Alternatives to {vehicleData.name}</caption>
        <tbody>
          {alternativeCars.map((car, index) => (
            <AlternativeCarRow
              key={index}
              imgSrc={`/carsline/assets/cars/${car.image}`}
              carName={car.name}
              price={`${formatPrice(car.price)}*`}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

const TableRow = ({ title, data }) => {
  return (
    <tr>
      <td className="title">{title}</td>
      <td className="data" dangerouslySetInnerHTML={{ __html: data }} />
    </tr>
  );
};

const AlternativeCarRow = ({ imgSrc, carName, price }) => {
  return (
    <tr>
      <td><img src={imgSrc} width="120px" alt={carName} /></td>
      <td>
        {carName}
        <br />
        <span>
          <i className="fa fa-inr" aria-hidden="true"></i> {price}
        </span>
      </td>
    </tr>
  );
};

export default SwiftSpecificationTable;
