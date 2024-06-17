import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP } from "../Admin/redux/Actions/otpAction"; // Adjust path as per your file structure

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email (optional)
    if (email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }

    try {
      await dispatch(sendOTP(email)); // Dispatch sendOTP action with email
      navigate(`/Admin/OTP/${email}`); // Navigate to OTP component with email as param
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center min-vh-100 bg-light">
      <div className="container py-6">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="position-relative py-3">
              <div className="position-absolute w-100 h-100 bg-blue shadow-lg skew-box unskew-box rounded-3"></div>
              <div className="position-relative bg-white shadow-lg rounded-3 p-4">
                <div className="mx-auto">
                  <h1 className="h4 font-weight-bold" style={{ color: "#5214ae" }}>
                    Forgot Password
                  </h1>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Enter your Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email address"
                          autoComplete="off"
                          value={email}
                          onChange={handleChange}
                          required
                        />
                      </div><br/>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          style={{ backgroundColor: "#5214ae" }}
                        >
                          Verify Email
                        </button>
                      </div>
                    </form>
                    <center>
                      <div className="form-group">
                        Remembered your password?{" "}
                        <Link
                          className="w-100"
                          style={{ textDecoration: "none", color: "#5214ae" }}
                          to="/Admin/"
                        >
                          Login
                        </Link>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
