import {React,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Include this if you have any custom CSS, e.g., for gradient and skew styles.
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
    const onChange = (event) => {
        setCredantials({ ...credantials, [event.target.name]: event.target.value })
    }
    const [credantials, setCredantials] = useState({ name:"",email: "", password: "",cpassword:"" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // synthetic event read once
        if(credantials.password === credantials.cpassword){
        const response = await fetch("http://localhost:5000/api/createAdmin", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({ name: credantials.name, email: credantials.email, password: credantials.password ,cpassword: credantials.cpassword })
        });
      
        const json = await response.json();
        console.log(json);
        if(response.status === 400)
        {
          alert("Email already exists try different.");
        }
        else if (!json.success) {
            alert("Enter valid data!!");
        }
        if (json.success) {
            alert("Registered!!");
            navigate("/Admin");
        }}
        else{
          alert("Password and Confirm Password should be same!!");
        }
    }

  return (
    <div className="d-flex flex-column justify-content-center min-vh-100 bg-light">
      <div className="container py-6">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="position-relative py-3">
              <div className="position-absolute w-100 h-100 bg-blue shadow-lg skew-box unskew-box rounded-3"></div>
              <div className="position-relative bg-white shadow-lg rounded-3 p-4">
                <div className="mx-auto">
                  <h1 className="h4 font-weight-bold">Registration</h1>
                  <div className="mt-4">
                  <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder="Name" autoComplete="off" value={credantials.name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input type="text" className="form-control" id="email" name="email" placeholder="Email address" autoComplete="off" value={credantials.email} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="off" value={credantials.password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpassword" className="form-label">Re-Enter Password</label>
                      <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Re-Enter Password" autoComplete="off" value={credantials.cpassword} onChange={onChange} />
                    </div><br/>
                    <div className="form-group">
                      <button className="btn btn-primary w-100" onClick={handleSubmit}>Register</button>
                    </div><br/>
                    <center><div className="form-group text-align-center">
                      Already have an account? <Link className="w-100" style={{textDecoration: "none"}} to="/Admin">Login</Link>
                    </div></center>
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

export default Signup;
