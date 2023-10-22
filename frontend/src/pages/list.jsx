import React, { useState, useEffect } from 'react';
import './list.css';
import ProfileCard from '../components/profile';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
const ListPage = () => {
  const [data, setData] = useState([
    { name: 'Anonymous', percentage: 95 },
    {name: "lmao", percentage:70},
    { name: 'Whale', percentage: 48 },
    { name: 'Boxcfyt', percentage: 20 },
    {name: "idk", percentage:10},
  ]);
  
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
