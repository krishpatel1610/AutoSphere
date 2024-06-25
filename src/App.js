import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Route path="/Admin/AddVehicles" element={<AddVehicles/>} />
      <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
