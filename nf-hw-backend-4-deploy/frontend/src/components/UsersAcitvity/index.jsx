import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function UsersActivity() {
  const [users, setUsers] = useState([]);
  const { getUsers } = useAuth();



  useEffect(() => {
    const socket = io('http://localhost:5000');

    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      if(fetchedUsers){
        setUsers(fetchedUsers.map(user => ({ ...user, currentTrack: null })));
      }
    };

    socket.on('trackUpdated', (data) => {
      setUsers(users => users.map(user =>
        user._id === data.userId ? { ...user, currentTrack: data.track, artist: data.artist } : user
      ));
    });

    fetchUsers();

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="border-t border-gray-700 mt-8 pt-4">
      <h4 className="text-white text-lg font-bold mb-4">Users Activity</h4>
      <div className="flex flex-col gap-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {users.map(user => (
          <div key={user._id}>
            <Link to={`/user/${user._id}`} className="text-white font-bold">{user.username}</Link>
            <p className="text-gray-400"> { user.currentTrack ? `${user.currentTrack} - ${user.artist}` : "Not playing"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}