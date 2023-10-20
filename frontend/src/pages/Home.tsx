import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonInput, IonText } from '@ionic/react';
import './Home.css';
import React, { useState } from 'react';
import Web3 from 'web3';
import TempChat from '../components/tempChat';

declare global {
  interface Window { ethereum: any; web3: any; }
}

window.ethereum = window.ethereum || {};
window.web3 = window.web3 || {};


const Home: React.FC = () => {
  const initialUsers = Array.from({ length: 10 }, (_, i) => `User-${i + 1}`);
  const [users, setUsers] = useState(initialUsers);
  const [accept, setAccept] = useState(false);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
    }
  }

  const sendMessage = async (toAddress: string, message: string) => {
    const fromAddress = (await window.web3.eth.getAccounts())[0];
    
    // This is a simple transaction, replace it with your logic
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', 
      gas: '0x0710',
      to: toAddress, 
      from: fromAddress, 
      value: '0x00', 
      data: window.web3.utils.toHex(message)
    };
  
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      console.log('Transaction sent:', txHash);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  }

  const handleCardClick = (index: number) => {
    console.log(`Card ${users[index]} clicked`);
    // connectToMetaMask();
    // sendMessage('0x50e6A61Ad6DB24C192C0C5A727443A39cF3C8AC9', 'Hello World!');
    setAccept(!accept);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {accept ? <TempChat address='0x50e6A61Ad6DB24C192C0C5A727443A39cF3C8AC9'/> : <IonText>NO Active Chat</IonText>}
      </IonContent>

      <IonContent>
        {users.map((user, index) => (
          <IonCard key={index} onClick={() => handleCardClick(index)}>
            <IonCardHeader>
              <IonCardTitle>{user}</IonCardTitle>
            </IonCardHeader>
            <IonInput readonly></IonInput>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
