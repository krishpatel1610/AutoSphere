import { Space, Table, Typography, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicles, getBrands, getCategories } from "../../API"; // Import necessary APIs
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";

const { Option } = Select;

function Vehicles() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Fetch vehicles data
    getVehicles().then((vehicles) => {
      let filteredVehicles = [...vehicles];

      if (selectedBrand) {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.brand_id === selectedBrand);
      }

      if (selectedCategory) {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.category_id === selectedCategory);
      }

      setDataSource(filteredVehicles);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    });

    // Fetch brands data when the component mounts
    getBrands()
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    // Fetch categories data (Assuming there's a getCategories API)
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [selectedBrand, selectedCategory]);

  const handleAddVehicle = () => {
    navigate("/Admin/AddVehicles");
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const columns = [
    {
      title: "Vehicle Image",
      dataIndex: "images",
      render: (images) => <img src={images[0]} alt="vehicle" style={{ width: "100px" }} />,
    },
    {
      title: "Brand",
      dataIndex: "brand_id",
      render: (brand_id) => {
        const brand = brands.find((brand) => brand._id === brand_id);
        return brand ? brand.name : "Unknown";
      },
    },
    {
      title: "Model",
      dataIndex: "name",
    },
    {
      title: "Fuel Type",
      dataIndex: "vehicle_type",
      render: (vehicle_type) => {
        const fuelTypeAbbreviations = {
          P: "Petrol",
          D: "Diesel",
          C: "CNG",
          A: "Automatic",
          M: "Manual",
          I: "IMT",
        };
        return vehicle_type.map((type) => fuelTypeAbbreviations[type]).join(", ");
      },
    },
    {
      title: "Transmission",
      dataIndex: "transmission",
      render: (transmission) => {
        const transmissionAbbreviations = {
          A: "Automatic",
          M: "Manual",
          I: "IMT",
        };
        return transmission.map((type) => transmissionAbbreviations[type]).join(", ");
      },
    },
    {
      title: "Price",
      dataIndex: "variants",
      render: (variants) => variants[0].price, // Assuming price is in the first variant
    },
  ];

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <Space size={20} direction="vertical">
            <Space size={20} direction="horizontal" style={{ alignItems: "center" }}>
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
              <Button type="primary" onClick={handleAddVehicle}>
                Add Vehicle
              </Button>
            </Space>
            <Table
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                pageSize: 5,
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
