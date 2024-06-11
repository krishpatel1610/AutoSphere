import Login from './Admin/Login';
import Signup from './Admin/Signup';
import './App.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/Admin" element={<Login/>}/> 
        <Route path="/Admin/Signup" element={<Signup/>}/> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
