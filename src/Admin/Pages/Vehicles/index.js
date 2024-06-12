import { Avatar, Rate, Space, Table, Typography, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInventory } from "../../API";
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";

const { Option } = Select;

function Vehicles() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setBrands(res.brands || []); // Ensure brands is initialized with an empty array if not provided
      setLoading(false);
    });
  }, []);

  const handleAddVehicle = () => {
    navigate("/Admin/AddVehicles");
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <Space size={20} direction="vertical">
            <Space size={20} direction="horizontal" style={{ alignItems: 'center' }}>
              <Typography.Title level={2} style={{ margin: 0 }}>Vehicles</Typography.Title>
              <Typography.Text>&nbsp;</Typography.Text> {/* Adding space */}
              <Typography.Text>&nbsp;</Typography.Text> {/* Adding space */}
              <Typography.Text>&nbsp;</Typography.Text> {/* Adding space */}
              <Typography.Text>&nbsp;</Typography.Text> {/* Adding space */}
              <Select
                placeholder="Select Brand"
                style={{ width: 200 }}
                onChange={handleBrandChange}
                value={selectedBrand}
              >
                {brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Select Category"
                style={{ width: 200 }}
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <Option value="Sedan">Sedan</Option>
                <Option value="SUV">SUV</Option>
                <Option value="Hatchback">Hatchback</Option>
                <Option value="Compact Sedan">Compact Sedan</Option>
                <Option value="Compact SUV">Compact SUV</Option>
                <Option value="Convertible">Convertible</Option>
              </Select>
              <Button type="primary" onClick={handleAddVehicle}>
                Add Vehicle
              </Button>
            </Space>
            <Table
              loading={loading}
              columns={[
                {
                  title: "Thumbnail",
                  dataIndex: "thumbnail",
                  render: (link) => {
                    return <Avatar src={link} />;
                  },
                },
                {
                  title: "Title",
                  dataIndex: "title",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  render: (value) => <span>${value}</span>,
                },
                {
                  title: "Rating",
                  dataIndex: "rating",
                  render: (rating) => {
                    return <Rate value={rating} allowHalf disabled />;
                  },
                },
                {
                  title: "Stock",
                  dataIndex: "stock",
                },
                {
                  title: "Brand",
                  dataIndex: "brand",
                },
                {
                  title: "Category",
                  dataIndex: "category",
                },
              ]}
              dataSource={dataSource}
              pagination={{
                pageSize: 5,
              }}
            />
          </Space>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Vehicles;
