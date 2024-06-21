// Admin/ErrorPage.jsx

import React from 'react';
import { Button } from '@mui/material';
import { Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackToHome = () => {
    const path = location.pathname;
    if (path.startsWith('/Admin')) {
      navigate('/Admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="error-container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button variant="contained" color="primary" onClick={handleBackToHome} style={{ textDecoration: 'none' }}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
