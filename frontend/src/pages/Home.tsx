import { IonPage } from '@ionic/react';
import './Home.css';
import {Hellix} from '../components/dna';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import GoogleLogin from 'react-google-login';
import meta from "../img/meta.svg"

const Home: React.FC = () => {
  const [account, setAccount] = useState('');

  const startApp = async (provider) => {
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    const web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    setAccount(accounts[0]);
    ethereum.on('accountsChanged', function (accounts) {
      setAccount(accounts[0]);
    });
  }

  const handleLogin = async (googleData) => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // handle response
  }

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        startApp(provider);
      } else {
        console.log('Please install MetaMask!');
      }
    }
    init();
  }, []);

  return (
    <IonPage>
      <div className='name'>
        DNA Connect
      </div>
      <div className='page'>
      <button onClick={startApp}><img src={meta} alt="" />Connect with MetaMask</button>
        <GoogleLogin
          clientId="3423" // replace with your client ID
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Hellix />

    </IonPage>
  );
};

export default Home;
