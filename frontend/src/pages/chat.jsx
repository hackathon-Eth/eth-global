import React, { useState, useEffect } from 'react';
import './chat.css';

const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the chats
    setTimeout(() => {
      setChats([
        {
          id: 1,
          walletAddress: '0x1234',
          messages: [
            { text: 'Hi there!', isUser: false },
            { text: 'Hello!', isUser: true },
          ],
        },
        {
          id: 2,
          walletAddress: '0x2323214',
          messages: [
            { text: 'Hey!', isUser: false },
          ],
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        chat.messages.push({ text: message, isUser: true });
      }
      return chat;
    });

    setChats(updatedChats);
    setMessage('');
  };

  return (
    <div className="chat-app">
      <div className="chat-list">
        {isLoading ? (
          <p>Loading chats...</p>
        ) : (
          chats.map((chat, index) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => handleChatClick(chat.id)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {chat.walletAddress}
            </div>
          ))
        )}
      </div>
      <div className="chat-container">
        <h1 className="chat-heading">DNA-Connections</h1>
        <div className="chat-header">
          {activeChat !== null && <span className="wallet-address"> You are talking with {chats[activeChat - 1].walletAddress}!</span>}
        </div>
        <div className="chat-messages">
          {activeChat !== null &&
            chats[activeChat - 1].messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isUser ? 'user' : 'other'}`}>
                {msg.text}
              </div>
            ))}
        </div>
        {activeChat !== null && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} style={{margin:"0", width:"5rem", height:"2.5rem"}}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
