import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTextarea } from "@ionic/react";
import React from "react";
import './tempChat.css';
import Web3 from 'web3';
import { Client } from '@xmtp/xmtp-js'
import { Wallet, ethers } from 'ethers'
import { useEffect, useState } from "react";
import { loadKeys, getEnv, storeKeys } from "../utils/helper";

interface ChatProps {
    address: string;
}

const TempChat: React.FC<ChatProps> = ({address}) => {

    const initialIsOnNetwork =
    localStorage.getItem("isOnNetwork") === "true" || false;

    let stream: any;
    
    const [message, setMessage] = useState("");
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>();
    const [walletConnected, setWalletConnected] = useState(false);
    const [isOnNetwork, setIsOnNetwork] = useState(initialIsOnNetwork);
    const [xmtpClient, setXmtpClient] = useState<any>();
    const [conversation, setConversation] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);

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

    const setUpChat = async () => {
        let xmtp: any;
        if (window.ethereum) {
            // Request access to the user's MetaMask wallet
            window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts :any) => {
            const wallet = new ethers.Wallet(accounts[0]);
        
            // Create the client with the user's MetaMask wallet
            xmtp = Client.create(wallet, { env: "dev" });
        
            // Now you can use the xmtp client with the user's MetaMask wallet
            })
            .catch((error:any) => {
            console.error("Failed to connect to MetaMask:", error);
            });
        } else {
            console.error("MetaMask is not installed or not available.");
        }
        const conv = await xmtp.conversations.newConversation(address);
        setConversation(conv);
    }

    const handleSend = async () => {
        // handle sending message logic here
        let messageToSend = message;
        setMessage("");
        await conversation.sendMessage(messageToSend);
    }

    const fetchMessages = async () => {
        const messagesTemp = await conversation.messages();
        setMessages(messagesTemp);
    }

    return (
        <IonContent>
            <IonGrid>
            <IonRow>
                <IonCol size="3">
                    <IonHeader>Active Chats with</IonHeader>
                    <IonText>{address}</IonText>
                    <IonButton onClick={() => walletConnected ? disconnectWallet() : connectWallet()}>{walletConnected ? "Diconnect MetaMask" : "Connect to Metamask"}</IonButton>
                    <IonButton onClick={() => setUpChat()}>Connect to XMTP</IonButton>
                </IonCol>
                <IonCol size="3">
                    <IonHeader>Send</IonHeader>
                    <IonTextarea value={message} onIonChange={(e) => setMessage(e.detail.value!)} />
                    <IonButton onClick={handleSend}>Send</IonButton>
                </IonCol>
                <IonCol size="3">
                    <IonHeader>Stream</IonHeader>
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