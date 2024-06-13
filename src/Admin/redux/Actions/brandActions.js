// actions/index.js

// Define action types
export const FETCH_BRANDS_REQUEST = 'FETCH_BRANDS_REQUEST';
export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_FAILURE = 'FETCH_BRANDS_FAILURE';
export const ADD_BRAND_REQUEST = 'ADD_BRAND_REQUEST';
export const ADD_BRAND_SUCCESS = 'ADD_BRAND_SUCCESS';
export const ADD_BRAND_FAILURE = 'ADD_BRAND_FAILURE';

// Action creators for fetching brands
export const fetchBrandsRequest = () => ({
  type: FETCH_BRANDS_REQUEST
});

export const fetchBrandsSuccess = (brands) => ({
  type: FETCH_BRANDS_SUCCESS,
  payload: brands
});

export const fetchBrandsFailure = (error) => ({
  type: FETCH_BRANDS_FAILURE,
  payload: error
});

export const addBrandRequest = () => ({
  type: ADD_BRAND_REQUEST
});

export const addBrandSuccess = (brand) => ({
  type: ADD_BRAND_SUCCESS,
  payload: brand
});

export const addBrandFailure = (error) => ({
  type: ADD_BRAND_FAILURE,
  payload: error
});

// Action creator for fetching brands with car count
export const fetchBrands = () => {
  return async (dispatch) => {
    dispatch(fetchBrandsRequest()); // Dispatch the request action

    try {
      const response = await fetch("http://localhost:5000/api/brands");
      const data = await response.json(); // Parse the response data

      // Fetch car count for each brand
      const brandsWithCarCount = await Promise.all(data.map(async (brand) => {
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
        return { ...brand, carCount: carCountData.vehicleCount };
      }));

      // Dispatch the success action with the received data
      dispatch(fetchBrandsSuccess(brandsWithCarCount));
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch(fetchBrandsFailure(error.message));
    }
  };
};

// Action creator for adding a new brand
export const addBrand = (brandData) => {
    return async (dispatch) => {
      dispatch(addBrandRequest()); // Dispatch the request action
  
      try {
        const { name, image } = brandData; // Destructure name and image from brandData
        console.log(brandData);
        const payload = { name, image }; // Ensure payload contains name and image
  
        const response = await fetch("http://localhost:5000/api/brands", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json(); // Parse the response data
  
        // Dispatch the success action with the received data
        dispatch(addBrandSuccess(data));
      } catch (error) {
        // Dispatch the failure action with the error message
        dispatch(addBrandFailure(error.message));
      }
    };
  };
  