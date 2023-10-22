import React, { useState, useEffect } from 'react';
import './list.css';
import ProfileCard from '../components/profile';
const ListPage = () => {
  const [data, setData] = useState([
    { name: 'Anonymous', percentage: 95 },
    {name: "lmao", percentage:70},
    { name: 'Whale', percentage: 48 },
    { name: 'Boxcfyt', percentage: 20 },
    {name: "idk", percentage:10},
  ]);
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div>
      <div className={`${isLoading ? 'loading' : ''}`}>
        <h1 className="page-heading">Family Connection List</h1>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <ul className="data-list">
            {data.map((item, index) => (
              <ProfileCard key={index} className="list-item" name={item.name} percentage={item.percentage}/>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListPage;
