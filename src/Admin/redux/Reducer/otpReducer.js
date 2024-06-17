// src/store/reducers/otpReducer.js

import { SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from '../Actions/otpAction';

const initialState = {
  sending: false,
  sendingError: null,
  verifying: false,
  verifyingError: null,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return {
        ...state,
        sending: true,
        sendingError: null,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        sending: false,
      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        sending: false,
        sendingError: action.error,
      };
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        verifying: true,
        verifyingError: null,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifying: false,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifying: false,
        verifyingError: action.error,
      };
    default:
      return state;
  }
};

export default otpReducer;
