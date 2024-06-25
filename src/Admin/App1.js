import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import Dashboard from "../Admin/Pages/Dashbaord";

function App1() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isCompatible, setIsCompatible] = useState(window.innerWidth > 576);

  useEffect(() => {
    const handleResize = () => {
      setIsCompatible(window.innerWidth > 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      console.log("Unauthorized access detected.");
    }
  }, []);

  if (!isCompatible) {
    return (
      <div className="error-container">
        <Result
          status="403"
          title="Device Not Compatible"
          subTitle="Sorry, your device is not compatible to access Admin functionality. Please use a PC."
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      {authToken ? (
        <div className="App">
          <AppHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="dashboard-container" style={{ margin: "auto" }}>
              <Dashboard />
            </div>
          </div>
          <AppFooter />
        </div>
      ) : (
        <div className="error-container">
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button type="primary" href="/Admin" style={{ textDecoration: "none" }}>
                Back to Login
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

export default App1;
