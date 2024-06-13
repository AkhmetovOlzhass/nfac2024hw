import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { SocketContext } from '../context/SocketContext'; // Импорт контекста для WebSocket
import { Socket } from 'socket.io-client';

// Определение типов для пропсов
interface ChatFooterProps {
    roomId: string; // Типизируем roomId как строку
}

const ChatFooter: React.FC<ChatFooterProps> = ({ roomId }) => {
    const [message, setMessage] = useState<string>(''); // Типизация состояния message
    const socket = useContext(SocketContext) as Socket; // Приведение контекста к типу Socket
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('userName') || 'Anonymous';

    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
      socket.emit("typing", { roomId, userId });
    };

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('send_message', { text: message, roomId, username: localStorage.getItem('userName'), messageId: userId });
            setMessage('');
        }
    };

    return (
      <div className="chat__footer">
        <form className="form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={message}
            onChange={handleTyping}
          />
          <button type="submit" className="sendBtn">SEND</button>
        </form>
      </div>
    );
}

export default ChatFooter;