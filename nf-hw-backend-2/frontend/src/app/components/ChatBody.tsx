import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Socket } from 'socket.io-client';
import OnlineStatus from './OnlineStatus';
import { usePathname } from 'next/navigation';

interface Message {
    name: string;
    text: string;
    id?: string;
    messageUser: string;
}

interface ChatBodyProps {
    id: string;
}

const ChatBody = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState<string>('');
  const socket = useContext(SocketContext) as Socket;

  const userId = localStorage.getItem('id');

  useEffect(() => {
      if (socket) {
          socket.on('receive_message', (message: Message) => {
              setMessages(prev => [...prev, message]);
          });

          socket.on("user_typing", () => {
              setTypingStatus(`User is typing...`);
              setTimeout(() => setTypingStatus(''), 3000);
          });

          return () => {
              socket.off('receive_message');
              socket.off("user_typing");
          };
      }
  }, [socket]);

  return (
      <>
          <header className="chat__mainHeader">
              <p>Hangout with Colleagues</p>
              {userId && <OnlineStatus userId={userId} />}
          </header>
          <div className="message__container">
              {messages.map((message, index) =>
                  <div className={`message__chats ${message.name === userId ? 'message__sender' : 'message__recipient'}`} key={message.id || index}>
                      <p className="sender__name">{message.messageUser}</p>
                      <p>{message.text}</p>
                  </div>
              )}
              {typingStatus && (
                  <div className="message__status">
                      <p>{typingStatus}</p>
                  </div>
              )}
          </div>
      </>
  );
}

export default ChatBody;