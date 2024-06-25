import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCompatible, setIsCompatible] = useState(window.innerWidth > 756);

  useEffect(() => {
    const handleResize = () => {
      setIsCompatible(window.innerWidth > 756);
    };

    window.addEventListener('resize', handleResize);

    // Check initial window size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBackToHome = () => {
    const path = location.pathname;
    if (path.startsWith('/Admin')) {
      navigate('/Admin');
    } else {
      navigate('/');
    }
  };

  if (!isCompatible && location.pathname.startsWith('/Admin')) {
    return (
      <div className="error-container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Result
          status="403"
          title="Device Not Compatible"
          subTitle="Sorry, your device is not compatible to access Admin functionality. Please use a larger screen."
          extra={
            <Button variant="contained" color="primary" onClick={handleBackToHome} style={{ textDecoration: 'none' }}>
              Back to Home
            </Button>
          }
        />
      </div>
    );
  }

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
