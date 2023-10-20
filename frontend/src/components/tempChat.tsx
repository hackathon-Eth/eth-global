import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTextarea } from "@ionic/react";
import React from "react";
import './tempChat.css';
import Web3 from 'web3';
import { Client } from '@xmtp/xmtp-js'
import { Wallet, ethers } from 'ethers'
import { useEffect, useState } from "react";

interface ChatProps {
    address: string;
}

const TempChat: React.FC<ChatProps> = ({address}) => {
    const [message, setMessage] = useState("");
    const [connectToMetaMask, setConnectToMetaMask] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
    const [walletConnected, setWalletConnected] = useState(false);

    const getAddress = async (signer: ethers.providers.JsonRpcSigner) => {
        try {
            return await signer?.getAddress();
        } catch (e) {
            console.log(e);
        }
    };
    const disconnectWallet = () => {
        localStorage.removeItem("walletConnected");
        localStorage.removeItem("signerAddress");
        setSigner(null);
        setWalletConnected(false);
      };
    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setSigner(signer);
                setWalletConnected(true);
                let address = await getAddress(signer);
                localStorage.setItem("walletConnected", JSON.stringify(true)); // Save connection status in local storage
                localStorage.setItem("signerAddress", JSON.stringify(address)); // Save signer address in local storage

            } catch (error) {
                console.error("User rejected request", error);
            }
        } else {
            console.error("Metamask not found");
        }
    };

    const handleSend = () => {
        // handle sending message logic here
        let messageToSend = message;
        setMessage("");

        if (!connectToMetaMask) {
            connectWallet();
            setConnectToMetaMask(true);
        }

    }

    return (
        <IonContent>
            <IonGrid>
            <IonRow>
                <IonCol size="3">
                    <IonHeader>Active Chats with</IonHeader>
                    <IonText>{address}</IonText>
                    <IonButton onClick={() => walletConnected ? disconnectWallet() : connectWallet()}>{walletConnected ? "Diconnect MetaMask" : "Connect to Metamask"}</IonButton>
                </IonCol>
                <IonCol size="3">
                    <IonHeader>Send</IonHeader>
                    <IonTextarea value={message} onIonChange={(e) => setMessage(e.detail.value!)} />
                    <IonButton onClick={handleSend}>Send</IonButton>
                </IonCol>
                <IonCol size="3">
                    <IonHeader>List of Sent</IonHeader>
                </IonCol>
                <IonCol size="3">
                    <IonHeader>List of Recieved</IonHeader>
                </IonCol>
            </IonRow>
            </IonGrid>
        </IonContent>
    );
}

export default TempChat;