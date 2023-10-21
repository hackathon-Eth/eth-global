import React, { useState } from 'react';
import './Home.css';
import { Hellix } from '../components/dna';
import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = async () => {
    window.location.href = "http://localhost:3000/";
}
const Home = async () => {
    const [account, setAccount] = useState('');
    const auth = useAuth();
    if(auth.isLoggedIn){
        window.location.href = "http://localhost:3000/";
    }
    return (
        <div className='name'>
            DNA Connect
            <div>
            {auth.loading ? (
                "Loading"
            ) : auth.isLoggedIn ? (
                <p>Logged In</p>
            ) : (
                <div>
                    <Auth externalWallet={true} theme={"dark"} onLogin={onLogin} />
                </div>
            )}
            </div>
            <Hellix />
        </div>
    );
};

export default Home;
