import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  ToolOutlined,
  CarOutlined,
} from "@ant-design/icons";

function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/Admin/dashboard");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    navigate(item.key);
  };

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={handleMenuClick}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item
          key="/Admin/dashboard"
          icon={<AppstoreOutlined />}
          style={selectedKeys === "/Admin/dashboard" ? { color: "#5214ae" } : null}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/Admin/brand"
          icon={<ToolOutlined />}
          style={selectedKeys === "/Admin/brand" ? { color: "#5214ae" } : null}
        >
          Brands
        </Menu.Item>
        <Menu.Item
          key="/Admin/vehicles"
          icon={<CarOutlined />}
          style={selectedKeys === "/Admin/vehicles" ? { color: "#5214ae" } : null}
        >
          Vehicles
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideMenu;
