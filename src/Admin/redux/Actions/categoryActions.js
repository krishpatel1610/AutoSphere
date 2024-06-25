// src/Admin/redux/Actions/vehicleActions.js

// Define action types for categories
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

// Action creators for fetching categories
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Function to fetch categories
const getCategories = () => {
  return fetch('https://autospherebackend.onrender.com/api/categories')
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
