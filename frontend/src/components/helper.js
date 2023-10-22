import { useEffect } from "react";

const connecttoXmtp = () => {
    console.log("connecttoXmtp");
    console.log("user found");
}
const streamChat1 = 
    [{
      "id": 1,
      "walletAddress": "0x50e6A61Ad6DB24C192C0C5A727443A39cF3C8AC9",
      "messages": [
        { "text": "Hi there!", "isUser": false },
        { "text": "Hello!", "isUser": true },
        { "text": "How are you?", "isUser": false },
        { "text": "I'm doing well, thanks!", "isUser": true },
        { "text": "What's new?", "isUser": false }
      ]
    },
    {
      "id": 2,
      "walletAddress": "0x41bDA64AA4e3ACe830d331bbcF3749E0983243CE",
      "messages": [
        { "text": "Good morning!", "isUser": false },
        { "text": "Good morning to you too!", "isUser": true },
        { "text": "How's your day going?", "isUser": false }
      ]
    }
  ]
const streamChat2 =    [{
      "id": 1,
      "walletAddress": "0x41bDA64AA4e3ACe830d331bbcF3749E0983243CE",
      "messages": [
      ]
    },
    {
      "id": 2,
      "walletAddress": "0x50e6A61Ad6DB24C192C0C5A727443A39cF3C8AC9",
      "messages": [
      ]
    },
    {
      "id": 3,
      "walletAddress": "0x734nndfu33ne33eg4gd331bbcF3749E0983243CE",
      "isNudge": true,
      "messages": [
        { "text": "You've accepted nudged!", "isUser": false }
      ]
    }
  ]

  if(navigator.userAgent.includes("Chrome")){
    streamChat1.forEach(element => {
      element.messages.forEach(message => {
        message.isUser = !message.isUser;
      });
    });
    streamChat2.forEach(element => {
      element.messages.forEach(message => {
        message.isUser = !message.isUser;
      });
    });

    // swap wallet addresses in streamChat1 and streamChat2
    let temp = streamChat1[0].walletAddress;
    streamChat1[0].walletAddress = streamChat2[0].walletAddress;
    streamChat2[0].walletAddress = temp;

    temp = streamChat1[1].walletAddress;

    streamChat1[1].walletAddress = streamChat2[1].walletAddress;
    streamChat2[1].walletAddress = temp;

  }

export { connecttoXmtp, streamChat1, streamChat2 };
  