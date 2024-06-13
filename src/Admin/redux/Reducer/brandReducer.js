// redux/Reducer/brandReducer.js
import { FETCH_BRANDS_REQUEST, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_FAILURE } from '../Actions/';

const initialState = {
  brands: [],
  loading: false,
  error: null
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        error: null
      };
    case FETCH_BRANDS_FAILURE:
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
