
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import Dashboard from "../Admin/Pages/Dashbaord";

function App1() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div style={{ margin: "auto" }}>
          <Dashboard />
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
export default App1;