import React from 'react';
import { useEffect } from 'react';
import './loading.css';

const LoadingPage = () => {
  useEffect(() => {
    // After 3 seconds, redirect to "xyz.com"
    const redirectTimeout = setTimeout(() => {
      window.location.href = 'http://localhost:3000/list';
    }, 3000);

    // Cleanup the timeout to prevent memory leaks
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <h2 className="loading-text">Loading...</h2>
    </div>
  );
}

export default LoadingPage;
