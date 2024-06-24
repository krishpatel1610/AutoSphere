# AutoSphere
A comprehensive Team Management System where employees and companies can register, view each other's details, and get in touch. This responsive web application ensures seamless interaction between job seekers and employers, accessible across various devices including mobile.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- React
- React Router DOM
- Ant Design
- Material-UI
- Mongo DB
- Node
- Express

## Installation
1. installation command for each of the mentioned libraries and frameworks:
    React:
        bash
        npm install react react-dom
        
    React Router DOM:
        bash
        npm install react-router-dom
    Ant Design:
        bash
        npm install antd
    Material-UI (Now known as MUI):
        bash
        npm install @mui/material @emotion/react @emotion/styled
    MongoDB (For interacting with MongoDB, you typically use the mongodb package):
        bash
        npm install mongodb
    Express:
        bash
        npm install express
    
1. Clone the repository
    bash
    https://github.com/krishpatel1610/AutoSphere.git
    
2. Navigate to the project directory
    bash
    cd backend
    
3. Install dependencies
    bash
    npm install
    

## Features

### Redux Use
- **State Management**:  Utilized Redux for centralized state management across components, handling actions like fetching, adding, and deleting entities such as brands and vehicles. 
- **Async Actions**:  Implemented Redux Thunks for asynchronous operations, integrating with React Router for seamless navigation upon successful actions.


### Admin Authentication
- **Forgot Password**: Admin can reset the password  by getting reset link via registered email id. 
- **Login**: Secure login for Admin.

### Admin Functionality
- **Analysis**: Admin can analysis of cars with their brand.
- **Brand creation**: Admin can create new Brand or Delte the brand and View.
- **Vehicle creation**: Can also create new vehicle with their respective brand and also can delete.

### User Functionality
- **Car Browsing**: User can browse the car based on Brands or Vehicle category.
- **Searching**: User can search car by its brand name or specific model name.
- **Suggestions**: User getting Alternative car suggestion based on their category of selected car.
- **Color Options**: User can see list of available color in car and also change the color of vehicle.
- **Price**: User can see Citywise price of vehicle.

### Security
- **Token-Based Authentication**: Secure token-based authentication for user sessions.
- **Data Privacy**: Ensuring data privacy and security for all user information.

## Technologies Used

- **Frontend**:  React, React Router DOM, Redux (for state management), Ant Design (antd) or Material-UI (for UI components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt (for password hashing)


## Screenshots

### Dashboard (Client)
![Dashboard](./screen_shorts/dashboard.png)

![Dashboard](./screen_shorts/dashboard_navbar.png)

### Dashboard (Top Brands) 
![Dashboard](./screen_shorts/Top_brands.png)

### Dashboard (Latest cars) 
![Dashboard](./screen_shorts/Latest_cars.png)

### Dashboard (All cars) 
![Dashboard](./screen_shorts/All_cars.png)
![Dashboard](./screen_shorts/all_cars_footer.png)

### Dashboard (Search Car by Brand or Car Name) 
![Dashboard](./screen_shorts/car_searching.png)

### Car details (Car data and Overview) 
![Car Details](./screen_shorts/car_details.png)

### Car details (Specification) 
![Car Details](./screen_shorts/car_specification.png)

### Car details (variants) 
![Car Details](./screen_shorts/car_variants.png)

### Car details (colors) 
![Car Details](./screen_shorts/car_colors.png)


### Error Page (Client)
![Dashboard](./screen_shorts/error_page.png)

### Admin Dashboard (login)
![Company Dashboard](./screen_shorts/Admin_login.png)

### Admin Dashboard (register)
![Employee Login](./screen_shorts/Admin_Signup.png)

### Admin Dashboard (forgot password)
![Forgot Password](./screen_shorts/fp1.png)

![Forgot Password](./screen_shorts/fp2.png)

![Forgot Password](./screen_shorts/fp3.png)

![Forgot Password](./screen_shorts/fp4.png)

![Forgot Password](./screen_shorts/fp5.png)

![Forgot Password](./screen_shorts/fp6.png)

### Admin Dashboard (Analysis)
![Admin Dashboard](./screen_shorts/Admin_dashboard.png)

### Admin Dashboard (Brands)
![Admin Brands](./screen_shorts/Admin_brands1.png)


### Admin Dashboard (Add Brand)

![Admin Brands](./screen_shorts/Admin_brands2.png)

![Admin Brands](./screen_shorts/Admin_brands3.png)

![Admin Brands](./screen_shorts/Admin_brands4.png)

### Admin Dashboard (Vehicle Data)

![Admin Vehicles Data](./screen_shorts/Admin_Vehicles1.png)

### Admin Dashboard (Add New Vehicle)

![Admin Vehicles Data](./screen_shorts/Admin_Vehicles2.png)

![Admin Vehicles Data](./screen_shorts/Admin_Vehicles3.png)

![Admin Vehicles Data](./screen_shorts/Admin_Vehicles4.png)

### Admin Dashboard (Search Vehicle by Brand name)

![Admin Vehicles Search](./screen_shorts/s1.png)

![Admin Vehicles Search](./screen_shorts/s3.png)

### Admin Dashboard (Search Vehicle by Category name)

![Admin Vehicles Search](./screen_shorts/s4.png)

![Admin Vehicles Search](./screen_shorts/s5.png)

### Admin Dashboard (Search Vehicle by Brand and Category)

![Admin Vehicles Search](./screen_shorts/s2.png)


### Error Page (Admin)

![Employee Error Page](./screen_shorts/Admin_error_page1.png)

![Employee Error Page](./screen_shorts/Admin_error_page2.png)

## Usage

To get the project up and running, follow these steps:

### Starting the Frontend


1. Install the necessary dependencies:
    bash
    npm install
    

2. Start the frontend development server:
    bash
    npm start
    
    This will launch the frontend on `http://localhost:3000`.

### Starting the Backend

1. Navigate to the backend directory (if it's in a different folder, adjust the path accordingly):
    bash
    cd backend
    

2. Install the necessary backend dependencies:
    bash
    npm install
    

3. Start the backend server:
    bash
    node index.js
    
    This will launch the backend server on `http://localhost:5000`.

### Accessing the Application

Once both the frontend and backend servers are running, you can access the application by navigating to `http://localhost:3000` in your web browser.

### Additional Notes

- Ensure that you have https://nodejs.org/ installed on your machine.
- The backend server must be running for the frontend application to communicate with it.
- If you encounter any issues, check the console for error messages and ensure all dependencies are correctly installed.


## Contributing
...
