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
    const [conversations, setConversations] = useState<any>([]);

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
        if(signer != null) {
            let address = await getAddress(signer);
        }
        let keys = loadKeys(address);
        const clientOptions = { env:"dev"};
        if (!keys) {
            keys = await Client.getKeys(signer, {
              env: "dev",
              // we don't need to publish the contact here since it
              // will happen when we create the client later
              skipContactPublishing: true,
              // we can skip persistence on the keystore for this short-lived
              // instance
              persistConversations: false,
            });
            storeKeys(address, keys);
        }
        const xmtp = await Client.create(null, {
            env:"dev",
            privateKeyOverride: keys,
        });
        setIsOnNetwork(!!xmtp.address);
        setXmtpClient(xmtp);
    }

    const handleSend = () => {
        // handle sending message logic here
        let messageToSend = message;
        setMessage("");

    }

    // useEffect(() => {
    //     const storedWalletConnected = localStorage.getItem("walletConnected");
    //     const storedSignerAddress = localStorage.getItem("signerAddress");
    //     if (storedWalletConnected && storedSignerAddress) {
    //         setWalletConnected(JSON.parse(storedWalletConnected));
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const signer = provider.getSigner();
    //         setSigner(signer);
    //     }
    // }, []);

    const fetchAndStreamConversations = async () => {
        // Fetch the conversations
        const allConversations = await xmtpClient.conversations.list();

        const sortedConversations = allConversations.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setConversations(sortedConversations);

        // Start the stream
        stream = await xmtpClient.conversations.stream();
        for await (const conversation of stream) {
            console.log(
                `New conversation started with ${conversation.peerAddress}`,
            );
            setConversations((prevConversations: any) => {
                const newConversations = [...prevConversations, conversation];
                return newConversations.sort(
                    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                );
            });
            break;
        }
      };

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
                    {conversations.length > 0 ? conversations.map((conversation: any) => (
                            <IonText>{conversation.peerAddress}</IonText>
                        )) : <IonText>No conversations yet</IonText>
                    }
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