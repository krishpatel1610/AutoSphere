import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import Dashboard from "../Admin/Pages/Dashbaord";
import { Button, Result } from "antd";

function App1() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      // Handle unauthorized access here, for example navigate to /Admin/login or display an error message
      console.log("Unauthorized access detected.");
      // Example: Navigate to /Admin/login
      // navigate("/Admin/login"); // Ensure to import navigate from react-router-dom
    }
  }, []);

  return (
    <div className="app-container">
      {authToken ? (
        <div className="App">
          <AppHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="dashboard-container" style={{margin:"auto"}}>
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
              <Button type="primary" href="/Admin" style={{textDecoration:"none"}}>
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
