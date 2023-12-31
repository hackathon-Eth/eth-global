import React, { useState, useEffect } from 'react';
import './list.css';
import ProfileCard from '../components/profile';
import { Link, json } from 'react-router-dom'; // Import Link from react-router-dom
const ListPage = () => {
  const list = localStorage.getItem('list');
  
  const [data, setData] = useState(JSON.parse(list) || []);
  const [isLoading, setIsLoading] = useState(false);
  const func= ()=>{
    console.log("lmao")
  }

  return (
    <div>
      <div className={`${isLoading ? 'loading' : ''}`} style={{padding:"2rem"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 className="page-heading">Family Connection List</h1>
        <Link to="/chat"> {/* Use the Link component to navigate to /chat */}
            <button style={{ width: "8rem", height: "3rem" }}>Go to Chats</button>
          </Link>

        </div>
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
