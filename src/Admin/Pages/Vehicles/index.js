// src/Admin/pages/Vehicles.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, fetchCategories, fetchBrands } from '../../redux/Actions'; // Import fetchBrands from Actions
import { Table, Space, Typography, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../Components/AppHeader';
import SideMenu from '../../Components/SideMenu';
import AppFooter from '../../Components/AppFooter';

const { Option } = Select;

function Vehicles() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingVehicles = useSelector((state) => state.vehicle.loading);
  const vehicles = useSelector((state) => state.vehicle.vehicles);
  const loadingCategories = useSelector((state) => state.category.loading);
  const categories = useSelector((state) => state.category.categories);
  const brands = useSelector((state) => state.brand.brands); // Get brands from Redux state

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchCategories());
    dispatch(fetchBrands()); // Fetch brands when component mounts
  }, [dispatch]);

  useEffect(() => {
    let filteredVehicles = [...vehicles];

    if (selectedBrand) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.brand_id === selectedBrand
      );
    }

    if (selectedCategory) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.category_id === selectedCategory
      );
    }

    setDataSource(filteredVehicles);
  }, [vehicles, selectedBrand, selectedCategory]);

  const handleAddVehicle = () => {
    navigate('/Admin/AddVehicles');
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const columns = [
    {
      title: 'Vehicle Image',
      dataIndex: 'images',
      render: (images) => (
        <img src={images[0]} alt="vehicle" style={{ width: '100px' }} />
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand_id',
      render: (brand_id) => {
        const brand = brands.find((brand) => brand._id === brand_id);
        return brand ? brand.name : 'Unknown';
      },
    },
    {
      title: 'Model',
      dataIndex: 'name',
    },
    {
      title: 'Fuel Type',
      dataIndex: 'vehicle_type',
      render: (vehicle_type) => {
        const fuelTypeAbbreviations = {
          P: 'Petrol',
          D: 'Diesel',
          C: 'CNG',
          A: 'Automatic',
          M: 'Manual',
          I: 'IMT',
        };
        return vehicle_type
          .map((type) => fuelTypeAbbreviations[type])
          .join(', ');
      },
    },
    {
      title: 'Transmission',
      dataIndex: 'transmission',
      render: (transmission) => {
        const transmissionAbbreviations = {
          A: 'Automatic',
          M: 'Manual',
          I: 'IMT',
        };
        return transmission
          .map((type) => transmissionAbbreviations[type])
          .join(', ');
      },
    },
    {
      title: 'Price',
      dataIndex: 'variants',
      render: (variants) => variants[0].price, // Assuming price is in the first variant
    },
  ];

  if (loadingVehicles || loadingCategories) {
    return <p>Loading...</p>; // Add loading indicator here
  }

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: 'auto' }}>
          <Space size={20} direction="vertical">
            <Space
              size={20}
              direction="horizontal"
              style={{ alignItems: 'center' }}
            >
              <Typography.Title level={2} style={{ margin: 0 }}>
                Vehicles
              </Typography.Title>
              <Select
                placeholder="Select Brand"
                style={{ width: 200 }}
                onChange={handleBrandChange}
                value={selectedBrand}
              >
                {brands.map((brand) => (
                  <Option key={brand._id} value={brand._id}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Select Category"
                style={{ width: 200 }}
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              <Button type="primary" onClick={handleAddVehicle} style={{backgroundColor:"#5214ae"}}>
                Add Vehicle
              </Button>
            </Space>
            <Table
              loading={loadingVehicles}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                pageSize: 4,
              }}
              rowKey="_id"
            />
          </Space>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Vehicles;
