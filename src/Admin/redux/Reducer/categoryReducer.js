// src/Admin/redux/Reducers/categoryReducer.js

import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
  } from '../Actions/vehicleActions';
  
  const initialState = {
    categories: [], // Initial state as an empty array
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  