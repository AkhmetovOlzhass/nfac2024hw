import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

interface OnlineStatusProps {
    userId: string;
}

const OnlineStatus: React.FC<OnlineStatusProps> = ({ userId }) => {
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const socket = useContext(SocketContext);

    useEffect(() => {
        const handleStatusUpdate = (data: { userId: string; isOnline: boolean }) => {
            console.log("Received status update", data);
            if (data.userId === userId) {
                setIsOnline(data.isOnline);
            }
        };

        socket?.on('user_status', handleStatusUpdate);
        
        return () => {
            socket?.off('user_status', handleStatusUpdate);
        };
    }, [socket, userId]);

    return (
        <span className={`status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Online' : 'Offline'}
        </span>
    );
};

export default OnlineStatus;