import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/Actions/brandActions';
import { Button, Space, Table, Typography } from "antd";
import AppFooter from "../../Components/AppFooter";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import React from "react";

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
      render: (image) => <img src={image} alt="Brand" style={{ width: '50px', borderRadius: '50%' }} />,
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
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }}></span>
              <Button type="primary" onClick={handleAddBrandClick} style={{backgroundColor:"#5214ae"}}>
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
              style={{width:"805px"}}
              
            />
          </Space>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Brand;
