import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const Web3AuthButton = () => {
    const [web3auth, setWeb3auth] = useState(null);
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [chainId, setChainId] = useState("");
    const [userData, setUserData] = useState({});

    const clientId = "BEMcxTB9tqdm7Mf6s2fkyQFMuFdojmyGBkpOhGr34mND0wTNvPSQ__1MwXrZH09qofJmqlq9sOTV4vGu3iBNhs0";

    useEffect(() => {
        const init = async () => {
          try {
            const web3auth = new Web3Auth({
              clientId,
              chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x13881",
                rpcTarget: "https://rpc-mumbai.maticvigil.com/",
              },
            });
    
            setWeb3auth(web3auth);
            await web3auth.initModal();
            setProvider(web3auth.provider);
          } catch (error) {
            // Handle the error
            console.log(error);
          }
        };
    
        init();
    }, []);


      const login = async () => {
        if (!web3auth) {
          return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
      };

      const logout = async () => {
        if (!web3auth) {
          console.log("web3auth not initialized yet");
          return;
        }
        const web3authProvider = await web3auth.logout();
        setProvider(web3authProvider);
        setBalance("");
        setAddress("");
        setUserData({});
        setChainId("");
      };

      const getUserInfo = async () => {
        if (!web3auth) {
          console.log("web3auth not initialized yet");
          return;
        }
        const user = await web3auth.getUserInfo();
        setUserData(user);
        console.log(user);
      };

    return (
        <div>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={getUserInfo}>Get User Info</button>
            <p>Address: {userData.address}</p>
            <p>Balance: {userData.balance}</p>
            <p>ChainId: {userData.chainId}</p>
        </div>
    );
}

export default Web3AuthButton;
