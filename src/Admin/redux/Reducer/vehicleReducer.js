// src/Admin/redux/Reducer/vehicleReducer.js

import {
  FETCH_VEHICLES_REQUEST,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_FAILURE,
  ADD_VEHICLE_REQUEST,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILURE,
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from '../Actions/vehicleActions';

const initialState = {
  loading: false,
  vehicles: [],
  brands: [],
  categories: [],
  error: ''
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VEHICLES_REQUEST:
    case FETCH_BRANDS_REQUEST:
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_VEHICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicles: action.payload,
        error: ''
      };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        error: ''
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: ''
      };
    case FETCH_VEHICLES_FAILURE:
    case FETCH_BRANDS_FAILURE:
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        vehicles: [],
        brands: [],
        categories: [],
        error: action.payload
      };
    case ADD_VEHICLE_REQUEST:
    case ADD_BRAND_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicles: [...state.vehicles, action.payload],
        error: ''
      };
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: [...state.brands, action.payload],
        error: ''
      };
    case ADD_VEHICLE_FAILURE:
    case ADD_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default vehicleReducer;
