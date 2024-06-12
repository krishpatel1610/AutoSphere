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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Admin" element={<Login />} />
        <Route path="/Admin/signup" element={<Signup />} />
        <Route path="/Admin/dashboard" element={<App1 />} />
      <Route path="/Admin/brand" element={<Brand />} />
      <Route path="/Admin/vehicles" element={<Vehicles />} />
      <Route path="/Admin/customers" element={<Customers />} />
      <Route path="/Admin/AddBrand" element={<AddBrand />} />
      <Route path="/Admin/AddVehicles" element={<AddVehicles/>} />
      </Routes>
    </Router>
  );
}

export default App;
