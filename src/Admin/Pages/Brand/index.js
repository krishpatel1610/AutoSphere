import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, deleteBrand } from "../../redux/Actions/brandActions";
import { Button, Space, Table, Typography } from "antd";
import { Snackbar, Alert } from "@mui/material";
import AppFooter from "../../Components/AppFooter";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";

function Brand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector((state) => state.brand);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deletedBrandName, setDeletedBrandName] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleAddBrandClick = () => {
    navigate("/Admin/AddBrand");
  };

  const handleDeleteBrandClick = (brandId, brandName) => {
    if (window.confirm(`Are you sure you want to delete ${brandName}?`)) {
      dispatch(deleteBrand(brandId));
      setDeletedBrandName(brandName);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const columns = [
    {
      title: "Brand Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Brand"
          style={{ width: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Car's Inventory",
      dataIndex: "carCount",
      key: "carCount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteBrandClick(record._id, record.name)}
        >
          Remove Brand
        </Button>
      ),
    },
  ];

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <Space size={20} direction="vertical">
            <Space
              size={20}
              direction="horizontal"
              style={{ alignItems: "center" }}
            >
              <Typography.Title level={4} style={{ margin: 0 }}>
                Brand
              </Typography.Title>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <span dangerouslySetInnerHTML={{ __html: " " }}></span>
              <Button
                type="primary"
                onClick={handleAddBrandClick}
                style={{ backgroundColor: "#5214ae" }}
              >
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
              style={{ width: "805px" }}
            />
          </Space>
        </div>
      </div>
      <AppFooter />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`Brand "${deletedBrandName}" removed successfully!`}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Brand;
