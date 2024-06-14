import { BellFilled, MailOutlined,PoweroffOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { Button, Flex } from 'antd';
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  let navigate = useNavigate();
  // console.log(userData);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const handleLogout = (index) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
    navigate('/Admin');
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    handleLogout(index);
  };

  return (
    <div className="AppHeader" style={{ height: '60px' }}>
      <Image
        width={100}
        src="https://www.veroke.com/wp-content/uploads/2023/06/partner_autosphere_logo.png"
      ></Image>
      <Typography.Title style={{ margin: "auto", fontSize: '30px' }}>{userData.user.user.name}'s Dashboard</Typography.Title>
      <Space>
        <Badge count={comments.length} style={{backgroundColor:'#5214ae'}} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length} style={{backgroundColor:'#5214ae'}}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
          style={{marginLeft:"10px",backgroundColor:"#5214ae"}}
        >
          Logout!!
        </Button>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;
