import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Admin/Login';
import Signup from './Admin/Signup';
import App1 from './Admin/App1';
import './App.css';
import Brand from "./Admin/Pages/Brand";
import Vehicles from "./Admin/Pages/Vehicles";
import Customers from "./Admin/Pages/Customers";
import AddBrand from './Admin/Pages/Brand/AddBrand';
import AddVehicles from './Admin/Pages/Vehicles/AddVehicles';
import ForgotPassword from './Admin/ForgotPassword';
import ResetPasswordOTP from './Admin/ResetPasswordOTP';
import Dashboard from './Dashboard';
import CheckOut from './CheckOut';
import ErrorPage from './ErrorPage';

// Wrapper component to handle screen size check for /Admin route
const AdminRouteWrapper = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track small screen

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 756px)');
    
    const handleScreenChange = (e) => {
      setIsSmallScreen(e.matches); // Set isSmallScreen based on media query match
    };

    handleScreenChange(mediaQuery); // Initial check

    mediaQuery.addEventListener('change', handleScreenChange);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  // Render the appropriate component based on screen size
  return isSmallScreen ? <ErrorPage /> : <Navigate to="/Admin" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cars/:id" element={<CheckOut />} />
        <Route path="/a/cars/:id" element={<CheckOut />} />
        <Route path="/Admin" element={<Login />} />
        <Route path="/Admin/signup" element={<Signup />} />
        <Route path="/Admin/forgotpass" element={<ForgotPassword />} />
        <Route path="/Admin/OTP/:email" element={<ResetPasswordOTP />} />
        <Route path="/Admin/dashboard" element={<App1 />} />
        <Route path="/Admin/brand" element={<Brand />} />
        <Route path="/Admin/vehicles" element={<Vehicles />} />
        <Route path="/Admin/customers" element={<Customers />} />
        <Route path="/Admin/AddBrand" element={<AddBrand />} />
        <Route path="/Admin/AddVehicles" element={<AddVehicles />} />
        <Route path="/Admin/*" element={<AdminRouteWrapper />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
