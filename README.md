# AutoGuide
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
    git clone https://github.com/adityakhachar/Indian-Car-Portal.git
    
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

- **Frontend**:  React, React Router DOM, Redux (for state management), Axios (for HTTP requests), Ant Design (antd) or Material-UI (for UI components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt (for password hashing)


## Screenshots

### Dashboard
![Dashboard](./screenshots/dash1.png)

### Dashboard (Top Brands) 
![Dashboard](./screenshots/dash2.png)

### Dashboard (Latest cars) 
![Employee Dashboard](./screenshots/dash3.png)

### Dashboard (All cars) 
![Employee Dashboard](./screenshots/dash4.png)

### Dashboard (Car data) 
![Employee Dashboard](./screenshots/dash5.png)

### Dashboard (Overview and specification) 
![Employee Dashboard](./screenshots/dash6.png)

### Dashboard (varients) 
![Employee Dashboard](./screenshots/dash7.png)

### Dashboard (colors) 
![Employee Dashboard](./screenshots/dash8.png)

### Admin Dashboard (login)
![Company Dashboard](./screenshots/admin1.png)

### Admin Dashboard (register)
![Employee Login](./screenshots/admin2.png)

### Admin Dashboard (forgot password)
![Company Login](./screenshots/admin3.png)

### Admin Dashboard (Analysis)
![List of Companies 1](./screenshots/admin4.png)

### Admin Dashboard (Brands)
![List of Companies 2](./screenshots/admin5.png)

### Admin Dashboard (Add Brand)
![List of Employees 1](./screenshots/admin6.png)

### Admin Dashboard (Cars)
![List of Employees 2](./screenshots/admin7.png)

### Error Page
![Employee Dashboard](./screenshots/admin8.png)

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
