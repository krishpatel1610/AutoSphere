import { Button, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrandsWithCarCounts } from "../../API"; // Import the getBrandsWithCarCounts function
import AppFooter from "../../Components/AppFooter";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";

function Brand() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    getBrandsWithCarCounts().then((brands) => { // Fetch brands with car counts using getBrandsWithCarCounts function
      setDataSource(brands); // Set brands data
      setLoading(false);
    }).catch(error => {
      console.error('Error loading brand data:', error);
      setLoading(false);
      // Handle error appropriately, such as setting an error state or displaying a message to the user
    });
  }, []);

  // Function to handle the click event and navigate to "/Admin/AddBrand"
  const handleAddBrandClick = () => {
    navigate("/Admin/AddBrand"); // Use navigate function
  };

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <Space size={20} direction="vertical">
            <Space size={20} direction="horizontal" style={{ alignItems: 'center' }}>
              <Typography.Title level={4} style={{ margin: 0 }}>Brand</Typography.Title>
              {/* Add spacing to push button to the right */}
              <span style={{ marginLeft: '600px' }}>
                {/* Call the function on click */}
                <Button type="primary" onClick={handleAddBrandClick}>
                  Add Brand
                </Button>
              </span>
            </Space>
            <Table
              loading={loading}
              columns={[
                {
                  title: "Brand Image",
                  dataIndex: "image",
                  render: (image) => <img src={image} alt="Brand" style={{ width: '50px', borderRadius: '50%' }} />
                },
                {
                  title: "Brand Name", // Assuming the brand name is stored under 'name' in the data
                  dataIndex: "name",
                },
                {
                  title: "Number of Cars", // Display the number of cars for each brand
                  dataIndex: "cars",
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

export default Brand;
