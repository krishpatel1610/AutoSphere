import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track small screen

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 756); // Set isSmallScreen based on window width
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBackToHome = () => {
    const path = location.pathname;
    if (path.startsWith('/Admin')) {
      if (isSmallScreen) {
        navigate('/');
      } else {
        navigate('/Admin');
      }
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
      {isSmallScreen && location.pathname.startsWith('/Admin') && (
        <Result
          status="403"
          title="Device Not Compatible"
          subTitle="Sorry, your device is not compatible to access Admin functionality. Please use a larger screen."
          extra={
            <Button type="primary" href="/" style={{ textDecoration: 'none' }}>
              Back to Home
            </Button>
          }
        />
      )}
    </div>
  );
};

export default ErrorPage;
