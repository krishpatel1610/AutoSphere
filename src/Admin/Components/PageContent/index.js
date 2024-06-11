import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Dashbaord";
import Orders from "../../Pages/Orders";
import Inventory from "../../Pages/Inventory";
import Customers from "../../Pages/Customers";

function PageContent() {
  return (
    <div className="PageContent">
      <Routes>
      <Route path="/Admin/dashboard" element={<Dashboard />} />
      <Route path="/Admin/orders" element={<Orders />} />
      <Route path="/Admin/inventory" element={<Inventory />} />
      <Route path="/Admin/customers" element={<Customers />} />
      </Routes>
    </div>
  );
}
export default PageContent;
