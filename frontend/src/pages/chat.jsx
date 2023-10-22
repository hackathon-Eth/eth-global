import React, { useState, useEffect } from 'react';
import './chat.css';

const ethers = require("ethers")
const Client = 'sds';
const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [nudges, setNudges] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [signer, setSigner] = useState(null);
  const [xmtpInstance, setXmtpInstance] = useState(null);
  const [destAddress, setDestAddress] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // Simulate loading the chats

      const timeoutId = setTimeout(() => {
        let streamChat2 = {}
      setChats(streamChat2);
      console.log(streamChat2);
      setIsLoading(false);
    }, 2000);
  }, []);

  // write a function connectWallet to connect to metamask wallet and store the wallet in state
  const connectWallet = async () => {
    if (window.ethereum === undefined) {
      alert("Metamask not installed");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
    }
    catch(err) {
      console.log(err);
      alert("Error connecting to metamask : ", err);
    }
  }

  const connectXmtp = async () => {
    if(signer === null) {
      alert("Please connect wallet first");
      return;
    }
    try {
      const xmtp = await Client.create(signer);
      setXmtpInstance(xmtp);
      const conv = await xmtp.conversations.newConversation(destAddress);
      setConversation(conv);

    } catch(err) {
      alert("Error connecting to xmtp");
    }
  };

  const handleChatClick = async (chatId) => {
    connectWallet();
    if(xmtpInstance === null) {
      connectXmtp();
    }
    setActiveChat(chatId);
  };

  const handleSendMessage = async () => {

    let updatedChats = [...chats];
    let newMsg = streamChat1[0].messages[idx];
    setIdx(idx+1);
    console.log(newMsg);
    updatedChats[0].messages.push(newMsg);

    await conversation.sendMessage(newMsg.text);

    setChats(updatedChats);
    setMessage('');
  };

  const handleAcceptNudge = () => {
    chats[activeChat-1].isNudge = false
  }
  return (
    <div className="chat-app">
      <div className="chat-list" style={{padding:"2rem"}}>
        <div className='chats-heading'> Active Conversations</div>
        {isLoading ? (
  <p>Loading chats...</p>
) : (
  chats.map((chat, index) => (
    !chat.isNudge ? (
      <div
        key={chat.id}
        className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
        onClick={() => handleChatClick(chat.id)}
        style={{
          animationDelay: `${index * 0.2}s`,
          overflow: 'hidden',       // Hide overflowing text
          whiteSpace: 'nowrap',    // Prevent text from wrapping
          textOverflow: 'ellipsis' // Display an ellipsis (...) when the text overflows
        }}
      >
        {chat.walletAddress}
      </div>
    ) : null
  ))
)}

        <div className='chats-heading'> Contact Nudges! </div>
        {isLoading ? (
  <p>Loading chats...</p>
) : (
  chats.map((chat, index) => (
    chat.isNudge ? (
     <div
        key={chat.id}
        className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
        onClick={() => handleChatClick(chat.id)}
        style={{
          animationDelay: `${index * 0.2}s`,
          overflow: 'hidden',       // Hide overflowing text
          whiteSpace: 'nowrap',    // Prevent text from wrapping
          textOverflow: 'ellipsis' // Display an ellipsis (...) when the text overflows
        }}
      >
        {chat.walletAddress}
      </div>
    ) : null
  ))
)}


      </div>
      <div className="chat-container">
        <h1 className="chat-heading">DNA-Connections</h1>
        <div className="chat-header">
          {activeChat !== null && <span className="wallet-address"> You are talking with {chats[activeChat - 1].walletAddress}!</span>}
        </div>
        <div className="chat-messages">
  {activeChat !== null && !chats[activeChat - 1].isNudge && (
    chats[activeChat - 1].messages.map((msg, index) => (
      <div key={index} className={`message ${msg.isUser ? 'user' : 'other'}`}>
        {msg.text}
      </div>
    ))
  )}
</div>

{activeChat !== null && !chats[activeChat - 1].isNudge && (
  <div className="chat-input">
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button onClick={handleSendMessage} style={{ margin: "0", width: "5rem", height: "2.5rem" }}>
      Send
    </button>
  </div>
)}

{activeChat !== null && chats[activeChat - 1].isNudge && (
    <button onClick={handleAcceptNudge} style={{ margin: "0", width: "100%", height: "2.5rem",justifyContent:"center",marginBottom:"1rem"}}>
    Accept Nudge
  </button>
)}

      </div>
    </div>
  );
};

export default ChatApp;
