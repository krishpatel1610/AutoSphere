import { Button, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../API";
import AppFooter from "../../Components/AppFooter";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";

function Brand() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography.Title level={4} style={{ marginRight: 20 }}>
              Orders
            </Typography.Title>
            {/* Call the function on click */}
            <Button type="primary" onClick={handleAddBrandClick}>
              Add Brand
            </Button>
          </div>
          <Space size={20} direction="vertical">
            <Table
              loading={loading}
              columns={[
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
                  title: "Discounted Price",
                  dataIndex: "discountedPrice",
                  render: (value) => <span>${value}</span>,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                },
                {
                  title: "Total",
                  dataIndex: "total",
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
