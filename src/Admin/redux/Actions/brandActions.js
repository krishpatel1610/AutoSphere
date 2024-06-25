// actions/index.js

// Define action types
export const FETCH_BRANDS_REQUEST = 'FETCH_BRANDS_REQUEST';
export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_FAILURE = 'FETCH_BRANDS_FAILURE';
export const ADD_BRAND_REQUEST = 'ADD_BRAND_REQUEST';
export const ADD_BRAND_SUCCESS = 'ADD_BRAND_SUCCESS';
export const ADD_BRAND_FAILURE = 'ADD_BRAND_FAILURE';
export const DELETE_BRAND_REQUEST = 'DELETE_BRAND_REQUEST';
export const DELETE_BRAND_SUCCESS = 'DELETE_BRAND_SUCCESS';
export const DELETE_BRAND_FAILURE = 'DELETE_BRAND_FAILURE';


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

export const deleteBrandRequest = () => ({
  type: DELETE_BRAND_REQUEST
});

export const deleteBrandSuccess = (brandId) => ({
  type: DELETE_BRAND_SUCCESS,
  payload: brandId
});

export const deleteBrandFailure = (error) => ({
  type: DELETE_BRAND_FAILURE,
  payload: error
});

// Action creator for fetching brands with car count
export const fetchBrands = () => {
  return async (dispatch) => {
    dispatch(fetchBrandsRequest()); // Dispatch the request action

    try {
      const response = await fetch("https://autospherebackend.onrender.com/api/brands");
      const data = await response.json(); // Parse the response data

      // Fetch car count for each brand
      const brandsWithCarCount = await Promise.all(data.map(async (brand) => {
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
  
        const response = await fetch("https://autospherebackend.onrender.com/api/brands", {
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
  
  // Action creator for deleting a brand
export const deleteBrand = (brandId) => {
  return async (dispatch) => {
    dispatch(deleteBrandRequest()); // Dispatch the request action

    try {
      const response = await fetch(`https://autospherebackend.onrender.com/api/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Dispatch the success action with the deleted brandId
      dispatch(deleteBrandSuccess(brandId));
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch(deleteBrandFailure(error.message));
    }
  };
};
