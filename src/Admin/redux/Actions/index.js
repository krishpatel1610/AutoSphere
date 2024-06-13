// src/Admin/redux/Actions/index.js

// Importing action types and action creators from brandActions.js
import {
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  addBrandRequest,
  addBrandSuccess,
  addBrandFailure
} from './brandActions';

// Importing action types and action creators from vehicleActions.js
import {
  FETCH_VEHICLES_REQUEST,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_FAILURE,
  ADD_VEHICLE_REQUEST,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILURE,
  fetchVehiclesRequest,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
  addVehicleRequest,
  addVehicleSuccess,
  addVehicleFailure
} from './vehicleActions';

// Exporting action types from both brandActions.js and vehicleActions.js
export {
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  FETCH_VEHICLES_REQUEST,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_FAILURE,
  ADD_VEHICLE_REQUEST,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILURE
};

// Exporting action creators from both brandActions.js and vehicleActions.js
export {
  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  addBrandRequest,
  addBrandSuccess,
  addBrandFailure,
  fetchVehiclesRequest,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
  addVehicleRequest,
  addVehicleSuccess,
  addVehicleFailure
};

// src/Admin/redux/Actions/index.js

export * from './vehicleActions'; // Assuming all actions related to vehicles are in vehicleActions.js

