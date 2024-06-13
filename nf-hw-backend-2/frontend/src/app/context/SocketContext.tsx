'use client'

import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure this runs only in the browser
            const userId = localStorage.getItem('id');
            const newSocket = io('http://localhost:5000', { autoConnect: true, query: { userId } });
            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
