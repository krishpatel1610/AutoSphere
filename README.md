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

## Installation
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
![Company Dashboard](./screen_shorts/dashboard_navbar.png)

### Admin Dashboard (register)
![Employee Login](./screen_shorts/dashboard_navbar.png)

### Admin Dashboard (forgot password)
![Company Login](./screen_shorts/dashboard_navbar.png)

### Admin Dashboard (Analysis)
![List of Companies 1](./screen_shorts/dashboard_navbar.png)

### Admin Dashboard (Brands)
![List of Companies 2](./screen_shorts/dashboard_navbar.png)

### Admin Dashboard (Add Brand)
![List of Employees 1](./screen_shorts/dashboard_navbar.png)

### Admin Dashboard (Cars)
![List of Employees 2](./screen_shorts/dashboard_navbar.png)

### Error Page
![Employee Dashboard](./screen_shorts/dashboard_navbar.png)

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
