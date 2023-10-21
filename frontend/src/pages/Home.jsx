import React, { useEffect, useState } from 'react';
// import meta from "../img/meta.svg";
// import { Web3AuthButton } from '../components/web3auth';

import './Home.css';
import { Hellix } from '../components/dna';


const Home = async () => {
    const [account, setAccount] = useState('');

    return (
        <div className='name'>
            DNA Connect
            <div className='page'>
                {/* <button ><img src="" alt="" />Connect with MetaMask</button> */}
                {/* <Web3AuthButton account={account} setAccount={setAccount} /> */}
            </div>
            <Hellix />
        </div>
    );
};

export default Home;
