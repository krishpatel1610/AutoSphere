import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Advertisement from './Advertisement';
import Panel from './Panel';


const Dashboard = () => {
    return (<>
    <div><Navbar/></div>
    <div>
        <Advertisement />
        <Panel />
    </div>
    <div>
      <Footer />
    </div>
    </>);
}



export default Dashboard;