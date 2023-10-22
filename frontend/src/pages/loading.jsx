import React from 'react';
import { useEffect } from 'react';
import './loading.css';
import axios from 'axios';

const LoadingPage = () => {
  const commitment = localStorage.getItem('commitment');
  const cid = localStorage.getItem('cid');
  const res = axios.get('http://localhost:4000/findComparisions', {
    params: {
      commitment: commitment,
      cid: cid,
    },
  });
  const list = localStorage.getItem('list');
  localStorage.setItem('list', res.data);
  localStorage.setItem('list', list);
  useEffect(() => {
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
