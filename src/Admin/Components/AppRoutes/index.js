import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Dashbaord";
import Orders from "../../Pages/Orders";
import Inventory from "../../Pages/Inventory";
import Customers from "../../Pages/Customers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/inventory" element={<Inventory />} />
      <Route path="/admin/customers" element={<Customers />} />
    </Routes>
  );
}

export default AppRoutes;
