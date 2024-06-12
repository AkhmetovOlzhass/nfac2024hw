'use client'

import { useEffect, useState } from "react";
import ChatBar from "../../components/ChatBar";
import ChatBody from "../../components/ChatBody";
import ChatFooter from "../../components/ChatFooter";

import '../../components/components.css'
import useBlogService from "@/app/service/usersService";
import { User } from "@/app/interfaces/user";
import { useRouter, usePathname } from "next/navigation";
import { useSocket } from "@/app/context/SocketContext";

const ChatPage = () => {
    const pathname = usePathname(); 
    const segments = pathname.split('/');
    const id1 = segments[segments.length - 1];
    const id2 = localStorage.getItem('id');

    const roomId = [id1, id2].sort().join('-');

    const socket = useSocket();

    useEffect(() => {
        if (socket && id1 && id2) {
          socket.emit('join_room', roomId);
        }
      }, [socket, id1, id2]);
    
  return (
    <>
    <div className="chat">
      <div className="chat__main">
        <ChatBody />
        <ChatFooter roomId={roomId} />
      </div>
    </div>
    </>
  )
};

export default ChatPage;