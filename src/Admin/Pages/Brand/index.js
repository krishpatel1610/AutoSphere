import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchBrands } from '../../redux/Actions'; // Import fetchBrands action creator
import { Button, Space, Table, Typography } from "antd";
import AppFooter from "../../Components/AppFooter";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";

function Brand() {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector(state => state.brand); // Get brands and loading state from Redux store

  useEffect(() => {
    // Dispatch fetchBrands action on component mount
    dispatch(fetchBrands());
  }, [dispatch]);

  // Function to handle the click event and navigate to "/Admin/AddBrand"
  const handleAddBrandClick = () => {
    navigate("/Admin/AddBrand");
  };

  const columns = [
    {
      title: 'Brand Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Brand" style={{ width: '50px', borderRadius: '50%' }} />
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of Cars',
      dataIndex: 'carCount',
      key: 'carCount',
    },
  ];

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <Space size={20} direction="vertical">
            <Space size={20} direction="horizontal" style={{ alignItems: 'center' }}>
              <Typography.Title level={4} style={{ margin: 0 }}>Brand</Typography.Title>
              <Button type="primary" onClick={handleAddBrandClick}>
                Add Brand
              </Button>
            </Space>
            <Table
              loading={loading}
              columns={columns}
              dataSource={brands} // Use brands data from Redux store
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
