import {
  AppstoreOutlined,
  ToolOutlined,
  UserOutlined,
  CarOutlined, 
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/Admin/dashbord");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/Admin/dashboard",
          },
          {
            label: "Brands",
            key: "/Admin/brand",
            icon: <ToolOutlined />,
          },
          {
            label: "Vehicles",
            key: "/Admin/vehicles",
            icon: <CarOutlined />,
          },
          {
            label: "Customers",
            key: "/Admin/customers",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
