import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}> {/* Wrapping Space with a div */}
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table
              loading={loading}
              columns={[
                {
                  title: "Photo",
                  dataIndex: "image",
                  render: (link) => {
                    return <Avatar src={link} />;
                  },
                },
                {
                  title: "First Name",
                  dataIndex: "firstName",
                },
                {
                  title: "Last Name",
                  dataIndex: "lastName",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
                {
                  title: "Phone",
                  dataIndex: "phone",
                },
                {
                  title: "Address",
                  dataIndex: "address",
                  render: (address) => {
                    return (
                      <span>
                        {address.address}, {address.city}
                      </span>
                    );
                  },
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

export default Customers;
