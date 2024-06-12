export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

export const createBrands = async (brandData) => {
  try {
    // Convert brandData to a string
    const formDataString = JSON.stringify(brandData);
    // console.log(formDataString)

    const response = await fetch("http://localhost:5000/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataString,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating brand:", error);
    throw error;
  }
};

export const getVehicles = () => {
  return fetch("http://localhost:5000/api/vehicles").then((res) => res.json());
};

export const getCategories = () => {
  return fetch("http://localhost:5000/api/categories").then((res) => res.json());
};


export const getBrands = () => {
  return fetch("http://localhost:5000/api/brands").then((res) => res.json());
};

export const getBrandsWithCarCounts = async () => {
  try {
    const brandsResponse = await fetch("http://localhost:5000/api/brands");
    if (!brandsResponse.ok) {
      throw new Error(`HTTP error! Status: ${brandsResponse.status}`);
    }
    const brandsData = await brandsResponse.json();

    // Iterate through each brand to fetch the car count
    const brandsWithCarCount = await Promise.all(brandsData.map(async (brand) => {
      const carCountResponse = await fetch(`http://localhost:5000/api/vehicles/brands/${brand._id}/cars`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!carCountResponse.ok) {
        throw new Error(`HTTP error! Status: ${carCountResponse.status}`);
      }

      const carCountData = await carCountResponse.json();
      return { ...brand, cars: carCountData.vehicleCount };
    }));

    return brandsWithCarCount;
  } catch (error) {
    console.error('Error loading brand data:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
