// src/store/actions/otpActions.js

import axios from 'axios';
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_OTP_FAILURE';

export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

const API_BASE_URL = 'https://autospherebackend.onrender.com/api/'; // Replace with your actual backend URL

export const sendOTPRequest = () => ({
  type: SEND_OTP_REQUEST,
});

export const sendOTPSuccess = () => ({
  type: SEND_OTP_SUCCESS,
});

export const sendOTPFailure = (error) => ({
  type: SEND_OTP_FAILURE,
  error,
});

export const verifyOTPRequest = () => ({
  type: VERIFY_OTP_REQUEST,
});

export const verifyOTPSuccess = () => ({
  type: VERIFY_OTP_SUCCESS,
});

export const verifyOTPFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  error,
});

export const sendOTP = (email) => async (dispatch) => {
  dispatch(sendOTPRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/sendOTP`, { email });
    dispatch(sendOTPSuccess());
    return response.data; // Return data if needed in the component
  } catch (error) {
    dispatch(sendOTPFailure(error.message));
    throw error;
  }
};

export const verifyOTP = (email, OTP) => async (dispatch) => {
  dispatch(verifyOTPRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/verifyOTP`, { email, OTP });
    dispatch(verifyOTPSuccess());
    return response.data; // Return data if needed in the component
  } catch (error) {
    dispatch(verifyOTPFailure(error.message));
    throw error;
  }
};
