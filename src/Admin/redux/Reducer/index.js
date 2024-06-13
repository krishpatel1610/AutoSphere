// redux/Reducer/index.js
import { combineReducers } from 'redux';
import brandReducer from './brandReducer';
import vehicleReducer from './vehicleReducer';
import categoryReducer from './categoryReducer';


const rootReducer = combineReducers({
  brand: brandReducer,
  vehicle: vehicleReducer,
  category: categoryReducer
});

export default rootReducer;
