import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
function Chat() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.on('receive_message', (message) => {
            setChatHistory(prevHistory => {
                const lastMessage = prevHistory[prevHistory.length - 1];
                if (lastMessage && lastMessage.sender === 'bot') {
                    lastMessage.text = message.text;
                    return [...prevHistory.slice(0, -1), lastMessage];
                } else {
                    return [...prevHistory, { text: message.text, sender: 'bot' }];
                }
            });
        });

        return () => newSocket.close();
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (socket) {
            socket.emit('send_message', { text: message });
            setMessage('');
            setChatHistory(prevHistory => [...prevHistory, { text: message, sender: 'user' }]);
        }
    };

    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl">
          <div className="overflow-y-auto h-96 mb-4 p-3 space-y-2 bg-gray-700 rounded">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`rounded p-2 text-white ${chat.sender === 'user' ? 'bg-blue-500 ml-auto' : 'bg-green-500 mr-auto'}`}>
                {chat.text ? chat.text : "Некорректное сообщение"}
              </div>
            ))}
          </div>
          <form className="flex" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Введите сообщение..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    );
}

export default Chat;