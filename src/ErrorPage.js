import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';


const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track small screen

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 756px)');
    const handleScreenChange = (e) => {
      setIsSmallScreen(e.matches); // Set isSmallScreen based on media query match
    };

    handleScreenChange(mediaQuery); // Initial check

    mediaQuery.addEventListener('change', handleScreenChange);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
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
    <div className="error-container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button variant="contained" color="primary" onClick={handleBackToHome} className="back-to-home-button">
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
            <Button variant="contained" color="primary" href="/" className="back-to-home-button">
              Back to Home
            </Button>
          }
        />
      )}
    </div>
  );
};

export default ErrorPage;
