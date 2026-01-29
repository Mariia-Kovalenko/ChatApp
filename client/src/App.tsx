import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import type { Contact, Message } from "./types";
import { getIdentity } from "./utils/auth.ts";

import { io, Socket } from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUser = useRef(getIdentity());

  const [activeContactId, setActiveContactId] = useState('reverse');
  const [showChat, setShowChat] = useState(false);

  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({});

  // TODO: add unread messages feature to indicate new messages for contacts
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!socket) return;

    socket.on("user_typing", ({ fromUserId, isTyping }) => {
      console.log(`User ${fromUserId} typing status: ${isTyping}`);
      setTypingStatus(prev => ({ ...prev, [fromUserId]: isTyping }));
    });
  }, [socket, activeContactId]);

  const handleSelectContact = (id: string) => {
    setActiveContactId(id);
    setShowChat(true); 

    // if selected, clear the unread
    setUnreadCounts(prev => ({
      ...prev,
      [id]: 0
    }));
  };

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
  
    s.emit("join", currentUser.current);
  
    s.on("user_list", (list) => {
      const others = list.filter((u: any) => u.id !== currentUser.current.id);
      setContacts(others);
    });
  
    s.on("receive_message", (msg) => {
      // TODO: fix to prevent duplicate messages
      setMessages((prev) => {
        const exists = prev.find(m => m.id === msg.id);
        if (exists) return prev;
        return [...prev, msg];
      });


      // TODO: fix the issue when opened chat shows unread count
      setUnreadCounts((prev) => {
        if (msg.fromUserId === currentUser.current.id || msg.fromUserId === activeIdRef.current) {
          return prev;
        }
        return { ...prev, [msg.fromUserId]: (prev[msg.fromUserId] || 0) + 1 };
      });
    });
  
    s.on("user_typing", ({ fromUserId, isTyping }) => {
      setTypingStatus(prev => ({ ...prev, [fromUserId]: isTyping }));
    });
  
    return () => { s.disconnect(); };
  }, []); 

  const activeIdRef = useRef(activeContactId);
  useEffect(() => {
    activeIdRef.current = activeContactId;
  }, [activeContactId]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !socket) return;

    const msg = {
      id: Date.now(),
      fromUserId: currentUser.current.id,
      toUserId: activeContactId,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit("send_message", msg);
    setMessages((prev) => [...prev, msg]);
  };

  const activeChatMessages = messages.filter(m => 
    (m.fromUserId === currentUser.current.id && m.toUserId === activeContactId) ||
    (m.fromUserId === activeContactId && m.toUserId === currentUser.current.id)
  );

  const activeContact = contacts.find((c: Contact) => c.id === activeContactId);

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-gray-800">

      <div className={`flex-1 flex flex-col border-r border-gray-300 ${!showChat ? 'hidden md:flex' : 'flex'}`}>
      <ChatWindow 
          activeContact={activeContact || { name: 'Select a chat', desc: '', id: '', online: false }}
          messages={activeChatMessages} 
          onSendMessage={handleSendMessage}  
          onBack={() => setShowChat(false)} 
          currentUserId={currentUser.current.id}
          isTyping={!!typingStatus[activeContactId]} 
          onTyping={(isTyping) => {
            socket?.emit("typing", { 
              fromUserId: currentUser.current.id, 
              toUserId: activeContactId, 
              isTyping 
            });
          }}
        />
      </div>

      <div className={`bg-white flex flex-col w-full md:w-80 ${showChat ? 'hidden md:flex' : 'flex'}`}>
         {/* TODO: pass unreadcount to display unread messages */}
        <Sidebar 
          contacts={contacts}
          activeContactId={activeContactId} 
          onSelectContact={handleSelectContact} 
          unreadCounts={unreadCounts}
        />
      </div>
      
    </div>
  );
}