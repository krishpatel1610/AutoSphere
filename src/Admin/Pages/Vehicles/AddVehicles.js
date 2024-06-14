/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { addVehicle } from "../../redux/Actions/vehicleActions"; // Import addVehicle action creator
// import { fetchCategories } from '../../redux/Actions/vehicleActions';

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
];

const transmissions = [
  { value: "A", label: "Automatic" },
  { value: "M", label: "Manual" },
  { value: "I", label: "Intelligent Manual Transmission (IMT)" },
];

// const categories = [
//   { value: "Sedan", label: "Sedan" },
//   { value: "SUV", label: "SUV" },
//   { value: "Hatchback", label: "Hatchback" },
//   { value: "Compact Sedan", label: "Compact Sedan" },
//   { value: "Compact SUV", label: "Compact SUV" },
//   { value: "Convertible", label: "Convertible" },
// ];

const cities = ["Ahmedabad", "Mumbai", "Delhi"]; // List of cities

const AddVehicles = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [overview, setOverview] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([{ name: "", image_url: "" }]);
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([
    { name: "", engineSize: "", transmissionType: "", price: "" },
  ]);
  const [cityPrices, setCityPrices] = useState([{ city: "", price: "" }]);
  const dispatch = useDispatch();


  useEffect(() => {
    // Fetch categories from backend API
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);


  useEffect(() => {
    // Fetch brands from backend API
    fetch("http://localhost:5000/api/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);
  

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

  const handleColorChange = (index, key, value) => {
    const updatedColors = [...colors];
    updatedColors[index][key] = value;
    setColors(updatedColors);
  };

  const addColor = () => {
    setColors([...colors, { name: "", image_url: "" }]);
  };

  const removeColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Format data according to the required structure
    const formData = {
      category_id: category,
      brand_id: brand,
      name: name,
      images: images, // images should already be an array of objects with `url` key
      vehicle_type: vehicleType, // Ensuring vehicleType is directly passed as a string
      transmission: [transmission], // Ensure transmission is an array
      engine_size: engineSize,
      overview: overview,
      variants: variants.map(variant => ({
        name: variant.name,
        engine_size: variant.engineSize,
        transmission_type: [variant.transmissionType], // Ensure transmission_type is an array
        price: variant.price
      })),
      city_price: cityPrices.map(cityPrice => ({
        name: cityPrice.city,
        price: cityPrice.price
      })),
      colors: colors.map(color => ({
        name: color.name,
        image_url: color.image_url
      }))
    };
    console.log(formData);
    // Now you can dispatch this formData to your database
    dispatch(addVehicle(formData));
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
  {/* Brand */}
  <Grid item xs={6}>
    <TextField
      label="Brand"
      select
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      fullWidth
      required
    >
      {brands.map((brand) => (
        <MenuItem key={brand._id} value={brand._id}>
          {brand.name}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
  
  {/* Category */}
  <Grid item xs={6} style={{ marginBottom: "16px" }}>
  <TextField
    label="Category"
    select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    fullWidth
    required
  >
    {categories.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>

</Grid>


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
                  <Typography variant="h6">Color Options</Typography>
                  {colors.map((color, index) => (
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
                        label="Color Name"
                        value={color.name}
                        onChange={(e) =>
                          handleColorChange(index, "name", e.target.value)
                        }
                        fullWidth
                        required
                      />
                      <TextField
                        label="Image URL"
                        value={color.image_url}
                        onChange={(e) =>
                          handleColorChange(index, "image_url", e.target.value)
                        }
                        fullWidth
                        required
                      />
                      <IconButton onClick={() => removeColor(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    onClick={addColor}
                    startIcon={<AddIcon />}
                    style={{ marginTop: "10px" }}
                  >
                    Add Color Option
                  </Button>
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
