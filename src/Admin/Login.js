import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Include this if you have any custom CSS, e.g., for gradient and skew styles.
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const onChange = (event) => {
    setCredantials({ ...credantials, [event.target.name]: event.target.value });
  };
  const [credantials, setCredantials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // synthetic event read once
    const response = await fetch("https://autospherebackend.onrender.com/api/loginAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credantials.email,
        password: credantials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid data!!");
    }
    if (json.success) {
      // localStorage.setItem("authToken", json.authToken); // storing generated authToken to localStorage
      // console.log(localStorage.getItem("authToken"));
      localStorage.setItem("authToken", json.authToken); // Store the generated authToken to localStorage
      console.log("Stored authToken:", localStorage.getItem("authToken"));

      // Call the handleVerify function
      await handleVerify();
    }
  };

  const handleVerify = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log("Using authToken:", authToken);

      const response = await fetch(
        "https://autospherebackend.onrender.com/api/Admin/auth/protected-route",
        {
          method: "GET",
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify");
      }

      const json = await response.json();
      console.log("Verification response:", json);

      if (!json.success) {
        alert("Data is not verified!!");
        return;
      }

      alert("Login successful!!");
      localStorage.setItem("userData", JSON.stringify(json));
      console.log(localStorage.getItem("userData"));
      navigate("/Admin/dashboard");

      // Optionally update the authToken if the response contains a new one
      if (json.authToken) {
        localStorage.setItem("authToken", json.authToken);
        console.log("Updated authToken:", localStorage.getItem("authToken"));
      }
    } catch (error) {
      alert("An error occurred during verification.");
      console.error("Error during verification:", error);
      
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
                  <h1 className="h4 font-weight-bold" style={{color:"#5214ae"}}>Login</h1>
                  <div className="mt-4">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email address"
                        autoComplete="off"
                        value={credantials.email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={credantials.password}
                        onChange={onChange}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                        style={{backgroundColor:"#5214ae"}}
                      >
                        Login
                      </button>
                    </div>
                    <br />
                    <center>
                    <div className="form-group">
                        Forgot password?{" "}
                        <Link
                          className="w-100"
                          style={{ textDecoration: "none",color:"#5214ae" }}
                          to="/Admin/forgotpass"
                        >
                          Reset
                        </Link>
                      </div>
                      <div className="form-group">
                        Don't have any account?{" "}
                        <Link
                          className="w-100"
                          style={{ textDecoration: "none",color:"#5214ae" }}
                          to="/Admin/Signup"
                        >
                          Register
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

export default Login;
