import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import { createBrands } from "../../API"; // Import the createBrands function from your API file
import { useNavigate } from "react-router-dom";

function AddBrand() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null); // State to store error message
  let navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create an object to hold all form data
    const formData = {
      name,
      image: imageUrl || "", // Use imageUrl if present, otherwise use an empty string
    };
  
    console.log(formData);
    try {
      await createBrands(formData); // Pass formData to createBrands function
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
