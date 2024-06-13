// src/Admin/redux/Actions/vehicleActions.js

// Define action types for vehicles
export const FETCH_VEHICLES_REQUEST = 'FETCH_VEHICLES_REQUEST';
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_FAILURE = 'FETCH_VEHICLES_FAILURE';
export const ADD_VEHICLE_REQUEST = 'ADD_VEHICLE_REQUEST';
export const ADD_VEHICLE_SUCCESS = 'ADD_VEHICLE_SUCCESS';
export const ADD_VEHICLE_FAILURE = 'ADD_VEHICLE_FAILURE';

// Define action types for brands
export const FETCH_BRANDS_REQUEST = 'FETCH_BRANDS_REQUEST';
export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_FAILURE = 'FETCH_BRANDS_FAILURE';
export const ADD_BRAND_REQUEST = 'ADD_BRAND_REQUEST';
export const ADD_BRAND_SUCCESS = 'ADD_BRAND_SUCCESS';
export const ADD_BRAND_FAILURE = 'ADD_BRAND_FAILURE';

// Define action types for categories
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

// Action creators for fetching vehicles
export const fetchVehiclesRequest = () => ({
  type: FETCH_VEHICLES_REQUEST
});

export const fetchVehiclesSuccess = (vehicles) => ({
  type: FETCH_VEHICLES_SUCCESS,
  payload: vehicles
});

export const fetchVehiclesFailure = (error) => ({
  type: FETCH_VEHICLES_FAILURE,
  payload: error
});

// Action creators for adding a new vehicle
export const addVehicleRequest = () => ({
  type: ADD_VEHICLE_REQUEST
});

export const addVehicleSuccess = (vehicle) => ({
  type: ADD_VEHICLE_SUCCESS,
  payload: vehicle
});

export const addVehicleFailure = (error) => ({
  type: ADD_VEHICLE_FAILURE,
  payload: error
});

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

// Action creators for adding a new brand
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

// Action creators for fetching categories
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error
});

// Function to fetch vehicles
const getVehicles = () => {
  return fetch("http://localhost:5000/api/vehicles")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      return res.json();
    });
};

// Thunk for fetching vehicles
export const fetchVehicles = () => {
  return async (dispatch) => {
    dispatch(fetchVehiclesRequest());

    try {
      const data = await getVehicles();
      dispatch(fetchVehiclesSuccess(data));
    } catch (error) {
      dispatch(fetchVehiclesFailure(error.message));
    }
  };
};

// Function to fetch brands
const getBrands = () => {
  return fetch("http://localhost:5000/api/brands")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch brands');
      }
      return res.json();
    });
};

// Thunk for fetching brands
export const fetchBrands = () => {
  return async (dispatch) => {
    dispatch(fetchBrandsRequest());

    try {
      const data = await getBrands();
      dispatch(fetchBrandsSuccess(data));
    } catch (error) {
      dispatch(fetchBrandsFailure(error.message));
    }
  };
};

// Function to fetch categories
const getCategories = () => {
  return fetch("http://localhost:5000/api/categories")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      return res.json();
    });
};

// Thunk for fetching categories
export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());

    try {
      const data = await getCategories();
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
};

// Action creator for adding a new vehicle
export const addVehicle = (vehicleData) => {
  return async (dispatch) => {
    dispatch(addVehicleRequest());

    try {
      const { name, imageLink } = vehicleData;
      const payload = { name, image: imageLink };

      const response = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(addVehicleSuccess(data));
    } catch (error) {
      dispatch(addVehicleFailure(error.message));
    }
  };
};

// Action creator for adding a new brand
export const addBrand = (brandData) => {
  return async (dispatch) => {
    dispatch(addBrandRequest());

    try {
      const { name, logoLink } = brandData;
      const payload = { name, logo: logoLink };

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

      const data = await response.json();
      dispatch(addBrandSuccess(data));
    } catch (error) {
      dispatch(addBrandFailure(error.message));
    }
  };
};
