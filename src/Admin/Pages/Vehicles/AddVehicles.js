import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import AppFooter from "../../Components/AppFooter";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";

const vehicleTypes = [
  { value: "P", label: "Petrol" },
  { value: "D", label: "Diesel" },
  { value: "C", label: "CNG" },
  { value: "E", label: "Electric" },
  { value: "ED", label: "Electric + Diesel" },
  { value: "EP", label: "Electric + Petrol" },
];

const transmissions = [
  { value: "A", label: "Automatic" },
  { value: "M", label: "Manual" },
  { value: "I", label: "Intelligent Manual Transmission (IMT)" },
];

const cities = ["Ahmedabad", "Mumbai", "Delhi"]; // List of cities

const AddVehicles = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [overview, setOverview] = useState("");
  const [variants, setVariants] = useState([
    { name: "", engineSize: "", transmissionType: "", price: "" },
  ]);
  const [cityPrices, setCityPrices] = useState([{ city: "", price: "" }]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push({ url: e.target.result });
        if (i === files.length - 1) {
          setImages(newImages);
        }
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImagePreview = () => {
    if (imageUrl.trim() !== "") {
      setImages([...images, { url: imageUrl.trim() }]);
      setImageUrl("");
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { name: "", engineSize: "", transmissionType: "", price: "" },
    ]);
  };

  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleCityPriceChange = (index, field, value) => {
    const updatedCityPrices = [...cityPrices];
    updatedCityPrices[index][field] = value;
    setCityPrices(updatedCityPrices);
  };

  const addCityPrice = () => {
    if (cityPrices.length < 3) {
      setCityPrices([...cityPrices, { city: "", price: "" }]);
    }
  };

  const removeCityPrice = (index) => {
    if (cityPrices.length > 1) {
      const updatedCityPrices = [...cityPrices];
      updatedCityPrices.splice(index, 1);
      setCityPrices(updatedCityPrices);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const vehicleData = {
      name,
      images,
      imageUrl,
      vehicleType,
      transmission,
      engineSize,
      overview,
      variants,
      cityPrices,
    };
    console.log(vehicleData);
    // You can now send `vehicleData` to your backend API
  };

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ margin: "auto" }}>
          <Box
            sx={{
              width: "600px",
              margin: "0 auto",
              overflowY: "auto",
              maxHeight: "80vh",
              padding: "20px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Add Vehicle
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image URL"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="contained"
                      onClick={handleImagePreview}
                      disabled={!imageUrl.trim()}
                      fullWidth
                    >
                      Add Url Image
                    </Button>
                    <Button variant="contained" component="label" fullWidth>
                      Upload from Device
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {images.map((image, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img
                        src={image.url ? image.url : URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
                      <IconButton
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Vehicle Type"
                    select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    fullWidth
                    required
                  >
                    {vehicleTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Transmission"
                    select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    fullWidth
                    required
                  >
                    {transmissions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Engine Size"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Overview"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                {variants.map((variant, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            Variant {index + 1}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Name"
                            value={variant.name}
                            onChange={(e) =>
                              handleVariantChange(index, "name", e.target.value)
                            }
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Engine Size"
                            value={variant.engineSize}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "engineSize",
                                e.target.value
                              )
                            }
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Transmission Type"
                            select
                            value={variant.transmissionType}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "transmissionType",
                                e.target.value
                              )
                            }
                            fullWidth
                            required
                          >
                            {transmissions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Price"
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton onClick={() => removeVariant(index)}>
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={addVariant}
                    startIcon={<AddIcon />}
                  >
                    Add Variant
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">City Prices</Typography>
                  {cityPrices.map((cityPrice, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        select
                        label="City"
                        value={cityPrice.city}
                        onChange={(e) =>
                          handleCityPriceChange(index, "city", e.target.value)
                        }
                        fullWidth
                        required
                      >
                        {cities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        label="Price"
                        type="number"
                        value={cityPrice.price}
                        onChange={(e) =>
                          handleCityPriceChange(index, "price", e.target.value)
                        }
                        fullWidth
                        required
                      />
                      <IconButton onClick={() => removeCityPrice(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </div>
                  ))}
                  {cityPrices.length < 3 && (
                    <Button
                      variant="contained"
                      onClick={addCityPrice}
                      startIcon={<AddIcon />}
                      style={{ marginTop: "10px" }}
                    >
                      Add City Price
                    </Button>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Vehicle
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default AddVehicles;
