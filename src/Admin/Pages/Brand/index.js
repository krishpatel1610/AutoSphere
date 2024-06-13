import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/Actions/brandActions';
import { Button, Space, Table, Typography } from "antd";
import AppFooter from "../../Components/AppFooter";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";

function Brand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector(state => state.brand);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Log brands data before rendering the table
  console.log("Brands data from Redux:", brands);

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
              dataSource={brands}
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
