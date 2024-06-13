import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Socket } from 'socket.io-client';
import OnlineStatus from './OnlineStatus';

interface Message {
    username: string;
    text: string;
    _id?: string;
    messageId: string;
    roomId: string;
}

const ChatBody: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const socket = useContext(SocketContext) as Socket;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem('id');
      setUserId(storedId);
      if (storedId) {
        const roomPath = window.location.pathname.split('/');
        const id1 = roomPath[roomPath.length - 1];
        const roomId = [id1, storedId].sort().join('-');
        setRoomId(roomId);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (roomId) {
        const response = await fetch(`http://localhost:5000/api/v1/messages/${roomId}`);
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
        
      setMessages(prev => [...prev, message]);
    };

    if (socket) {
      socket.on('receive_message', handleReceiveMessage);

      socket.on("user_typing", () => {
        setTypingStatus(`User is typing...`);
        setTimeout(() => setTypingStatus(''), 3000);
      });

      return () => {
        socket.off('receive_message', handleReceiveMessage);
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
          <div className={`message__chats ${message.messageId === userId ? 'message__sender' : 'message__recipient'}`} key={message._id || index}>
            <p className="sender__name">{message.username}</p>
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