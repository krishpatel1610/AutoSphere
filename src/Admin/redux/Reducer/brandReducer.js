import {
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE
} from '../Actions/brandActions';

const initialState = {
  loading: false,
  brands: [],
  error: ''
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS_REQUEST:
    case ADD_BRAND_REQUEST:
    case DELETE_BRAND_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        error: ''
      };
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: [...state.brands, action.payload],
        error: ''
      };
    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: state.brands.filter(brand => brand._id !== action.payload),
        error: ''
      };
    case FETCH_BRANDS_FAILURE:
    case ADD_BRAND_FAILURE:
    case DELETE_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default brandReducer;