import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPasswordOTP = () => {
  const { email } = useParams(); // Fetch email from URL params (passed from ForgotPassword component)
  const [otp, setOTP] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const otpBoxes = useRef([]); // Ref for OTP input boxes
  const navigate = useNavigate();

  // Function to mask email
  const maskEmail = (email) => {
    const parts = email.split("@");
    const maskedEmail =
      parts[0].charAt(0) + "*".repeat(parts[0].length - 2) + parts[0].slice(-1) + "@" + parts[1];
    return maskedEmail;
  };

  // Handle change in OTP input
  const handleChange = (index, event) => {
    const value = event.target.value.replace(/\D/, ""); // Allow only digits
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus next input box if value is entered
      if (value.length === 1 && index < 5) {
        otpBoxes.current[index + 1].focus();
      }
    }
  };

  // Handle OTP verification submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://autospherebackend.onrender.com/api/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, OTP: otp.join('') })
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        alert("OTP verified successfully. Proceed to reset your password.");
        handleForgot(); // Proceed to reset password
        alert("Password reset link has been sent to your email.");
        navigate('/Admin');
      } else {
        alert(data.error || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleForgot = async () => {
    try {
      const response = await fetch('https://autospherebackend.onrender.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        alert("Password reset link has been sent to your email."); // Show alert for success
        console.log(data, "Password reset initiated successfully");
        // Additional logic if needed after successful password reset initiation
      } else {
        alert(data.message || "Failed to initiate password reset.");
      }
    } catch (error) {
      console.error("Error initiating password reset:", error);
      alert("No such Admin found please check email once.");
    }
  };

  // Reset all OTP boxes
  const handleReset = () => {
    setOTP(["", "", "", "", "", ""]);
    otpBoxes.current[0].focus(); // Focus on the first OTP input box
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
                  <h1 className="h4 font-weight-bold" style={{ color: "#5214ae", marginBottom: "20px" }}>
                    Verify Email
                  </h1>
                  <p className="text-center">Enter the verification code we sent to {maskEmail(email)}</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group d-flex justify-content-center mb-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          className="form-control otp-input mx-2"
                          maxLength="1"
                          autoComplete="off"
                          value={digit}
                          onChange={(e) => handleChange(index, e)}
                          ref={(el) => (otpBoxes.current[index] = el)} // Ref for each OTP input box
                          autoFocus={index === 0} // Auto focus on the first input box
                        />
                      ))}
                    </div>
                    <div className="form-group mb-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        style={{ backgroundColor: "#5214ae" }}
                      >
                        Verify OTP
                      </button>
                    </div>
                  </form>
                  <div className="d-flex flex-column align-items-center">
                    <div className="form-group mb-2">
                      Didn't receive OTP?{" "}
                      <Link
                        className="text-decoration-none"
                        style={{ color: "#5214ae" }}
                        to={`/Admin/ForgotPassword/${email}`}
                      >
                        Resend OTP
                      </Link>
                    </div>
                    <div className="form-group">
                      Remembered your password?{" "}
                      <Link
                        className="text-decoration-none"
                        style={{ color: "#5214ae" }}
                        to="/Admin/Login"
                      >
                        Login
                      </Link>
                    </div>
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

export default ResetPasswordOTP;
