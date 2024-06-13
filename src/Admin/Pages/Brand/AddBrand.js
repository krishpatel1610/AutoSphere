// Import necessary dependencies
import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
// Import the addBrand action creator
import { addBrand } from "../../redux/Actions";
// Import the useDispatch hook from react-redux
import { useDispatch } from "react-redux";
// Import the useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";

function AddBrand() {
  // Initialize state variables
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Initialize useDispatch hook
  const dispatch = useDispatch();
  // Initialize useNavigate hook
  let navigate = useNavigate();

  // Event handler for name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Event handler for image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object to hold all form data
    const formData = {
      name,
      image: imageUrl || "", // Use imageUrl if present, otherwise use an empty string
    };

    try {
      // Dispatch the addBrand action creator with formData
      await dispatch(addBrand(formData));
      console.log("Brand added successfully!");
      alert("Brand added successfully!");
      navigate('/Admin/brand');
      // Redirect to the brand page or perform any other action upon successful brand creation
    } catch (error) {
      console.error("Error adding brand:", error);
      setError("Failed to add brand. Please try again."); // Set error message
    }
  };

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <div>
            <Typography variant="h5">Add Brand</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Brand Name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Image URL"
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
                margin="normal"
              />
              <div>
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    color="default"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                </label>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Brand Logo"
                  style={{ maxWidth: 200, marginTop: 10 }}
                />
              )}
              {error && (
                <Typography variant="body1" style={{ color: "red", marginTop: 10 }}>
                  {error}
                </Typography>
              )}
              <br/><br/>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: 20 }}
              >
                Add Brand
              </Button>
            </form>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default AddBrand;
