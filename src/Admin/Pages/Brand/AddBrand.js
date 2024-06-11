import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";

function AddBrand() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

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
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("image", file);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      await axios.post("/api/brands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Brand added successfully!");
    } catch (error) {
      console.error("Error adding brand:", error);
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
        )}<br/><br/>
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
