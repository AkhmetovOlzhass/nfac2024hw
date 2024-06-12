'use client'

import { useEffect, useState } from "react";
import useBlogService from "../service/usersService";
import { User } from "../interfaces/user";
import Link from "next/link";
import OnlineStatus from "./OnlineStatus";

import './components.css'

const ChatBar= () => {

  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const service = useBlogService();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await service.getAllUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, [])

  const nowId = localStorage.getItem('id');
    
    return (
        <div className="chat__sidebar">
        <h2>Open Chat</h2>
        <div>
          <h4 className="chat__header">ACTIVE USERS</h4>
          <div className="chat__users flex flex-col">
          {users ? (
            users.map(user => (
              user._id !== nowId ? <div key={user._id}><Link href={`/chats/${user._id}`} className="" >{user.username}</Link> <OnlineStatus userId={user._id} /></div>  : null
            ))
          ) : (
            <div>Loading...</div>
          )}
          </div>
        </div>
      </div>
      );
}

export default ChatBar;