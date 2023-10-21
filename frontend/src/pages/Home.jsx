import React, { useState } from 'react';
import './Home.css';
import { Hellix } from '../components/dna';


const Home = async () => {
    const [account, setAccount] = useState('');

    return (
        <div className='name'>
            DNA Connect
            {/* <div className='page'>
                <Auth account={account} setAccount={setAccount} />
            </div> */}
            <Hellix />
        </div>
    );
};

export default Home;
