import React, { useState, useEffect } from 'react';
import './list.css';

const ListPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data after 2 seconds
    setTimeout(() => {
      setData([
        { name: 'Anonymous', percentage: '75%' },
        { name: 'Whale', percentage: '88%' },
        { name: 'Bot', percentage: '92%' },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="list-page">
      <div className="dna-background"></div>
      <div className={`list-container ${isLoading ? 'loading' : ''}`}>
        <h1 className="page-heading">Family Connection List</h1>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <ul className="data-list">
            {data.map((item, index) => (
              <li key={index} className="list-item">
                <span className="name">{item.name}</span>
                <span className="percentage">{item.percentage}</span>
                <button className="nudge-button">Nudge To Contact</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListPage;
