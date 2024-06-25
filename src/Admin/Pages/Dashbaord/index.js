import {
  ToolOutlined,
  CarOutlined,
  CarFilled,
} from "@ant-design/icons";
import { Badge,Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [brands, setBrands] = useState([]);
  const [vehicales, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sedanCount, setSedanCount] = useState(0);
  const [suvCount, setSUVCount] = useState(0);
  const [hatchbackCount, setHatchbackCount] = useState(0);
  const [crossoverCount, setCrossoverCount] = useState(0);
  const [convertibleCount, setConvertibleCount] = useState(0);
  const [pickupCount, setPickupCount] = useState(0);
  
  useEffect(() => {
    // Fetch brands from backend API
    fetch("https://autospherebackend.onrender.com/api/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);
  useEffect(() => {
    // Fetch brands from backend API
    fetch("https://autospherebackend.onrender.com/api/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);
  useEffect(() => {
    // Fetch brands from backend API
    fetch("https://autospherebackend.onrender.com/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  useEffect(() => {
    if (categories.length > 0 && vehicales.length > 0) {
      let sc = 0,
        suc = 0,
        hc = 0,
        cc = 0,
        coc = 0,
        pc = 0;

        vehicales.forEach((v) => {
        const matchedCategory = categories.find((category) => category._id === v.category_id);
        console.log(matchedCategory);
        if (matchedCategory) {
          switch (matchedCategory.name.toLowerCase()) {
            case "sedan":
              sc++;
              break;
            case "suv":
              suc++;
              break;
            case "hatchback":
              hc++;
              break;
            case "crossover":
              cc++;
              break;
            case "convertible":
              coc++;
              break;
            case "pickup":
              pc++;
              break;
            default:
              break;
          }
        }
      });

      console.log("Counts:");
      console.log("Sedan Count:", sc);
      console.log("SUV Count:", suc);
      console.log("Hatchback Count:", hc);
      console.log("Crossover Count:", cc);
      console.log("Convertible Count:", coc);
      console.log("Pickup Count:", pc);

      setSedanCount(sc);
      setSUVCount(suc);
      setHatchbackCount(hc);
      setCrossoverCount(cc);
      setConvertibleCount(coc);
      setPickupCount(pc);
    }
  }, [categories, vehicales]);
  

  return (
    <Space size={20} direction="vertical" style={{marginTop:"10px"}}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ToolOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Brands"}
          value={brands.length}
        />
        <DashboardCard
          icon={
            <CarOutlined 
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Vehicles"}
          value={vehicales.length}
        />
        </Space>
        <Typography.Title level={5}>Categories</Typography.Title>
        <Space direction="horizontal">
        <DashboardCard
        icon={
          <CarFilled
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Sedan"}
        value={sedanCount}
      />
      <DashboardCard
        icon={
          <CarFilled
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)", // Changed to green background
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Suv"}
        value={suvCount}
      />
      <DashboardCard
        icon={
          <CarFilled
            style={{
              color: "orange",
              backgroundColor: "rgba(255,165,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Hatchback"}
        value={hatchbackCount}
      />
      <DashboardCard
        icon={
          <CarFilled
            style={{
              color: "darkorchid", // Changed to dark orchid
              backgroundColor: "rgba(153,50,204,0.25)", // Dark orchid background
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Crossover"}
        value={crossoverCount}
      />
      <DashboardCard
        icon={
          <CarFilled
            style={{
              color: "goldenrod", // Changed to goldenrod
              backgroundColor: "rgba(218,165,32,0.25)", // Goldenrod background
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Convertible"}
        value={convertibleCount}
      />
      <DashboardCard
        icon={
          <CarFilled
            style={{
              color: "maroon", // Changed to maroon
              backgroundColor: "rgba(128,0,0,0.25)", // Light maroon background
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Pickup"}
        value={pickupCount}
      />
        </Space>
        
      
      <Space style={{marginBottom:"10px"}}>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://autospherebackend.onrender.com/api/brands")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(async data => {
        // Fetch car count for each brand
        const brandsWithCarCount = await Promise.all(
          data.map(async (brand) => {
            const carCountResponse = await fetch(`https://autospherebackend.onrender.com/api/vehicles/brands/${brand._id}/cars`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (!carCountResponse.ok) {
              throw new Error(`HTTP error! Status: ${carCountResponse.status}`);
            }

            const carCountData = await carCountResponse.json();
            return { ...brand, carCount: carCountData.vehicleCount };
          })
        );

        // Sort brands by car count in descending order
        brandsWithCarCount.sort((a, b) => b.carCount - a.carCount);

        // Take top 3 brands
        const topThreeBrands = brandsWithCarCount.slice(0, 3);

        setBrandData(topThreeBrands);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching brands:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Vehicle Inventory",
      dataIndex: "carCount",
      render: (count) => (
        <Badge count={count} style={{ backgroundColor: '#5214ae' }} />
      ),
    }
  ];

  return (
    <>
      <Typography.Text strong>Top 3 Companies by Car Inventory</Typography.Text>
      <Table
        columns={columns}
        loading={loading}
        dataSource={brandData}
        pagination={false}
        style={{ width: "600px" }}
      />
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchBrandData();
  }, []);

  const fetchBrandData = async () => {
    try {
      const brandsResponse = await fetch("https://autospherebackend.onrender.com/api/brands");
      if (!brandsResponse.ok) {
        throw new Error(`HTTP error! Status: ${brandsResponse.status}`);
      }
      const brandsData = await brandsResponse.json();
      const brandNames = brandsData.map((brand) => brand.name);
      const brandIds = brandsData.map((brand) => brand._id);

      const fetchCarCounts = brandIds.map((brandId) =>
        fetch(`https://autospherebackend.onrender.com/api/vehicles/brands/${brandId}/cars`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((carCountData) => carCountData.vehicleCount)
      );

      const carCounts = await Promise.all(fetchCarCounts);


      const dataSource = {
        labels: brandNames, // Brand names on x-axis
        datasets: [
          {
            label: "Car Count",
            data: carCounts, // Car counts on y-axis
            backgroundColor: "#5214ae", // Adjust the color as needed
          },
        ],
      };

      setRevenueData(dataSource);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Brands Inventory",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Brands',
        },
      },
      y: {
        title: {
          display: true,
          text: "Cars",
        },
        ticks: {
          stepSize: 1, // Minimum distance between ticks is 1
          precision: 0, // Show whole numbers only
          callback: function(value, index, values) {
            return value <= 10 ? value : ''; // Show ticks up to 10, hide others
          },
        },
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar data={revenueData} options={options} />
    </Card>
  );
}

export default Dashboard;
