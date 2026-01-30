import { useEffect, useRef, useState } from "react";
import type { Contact, Message } from "../types";
import {
  connectSocket,
  disconnectSocket,
  onReceiveMessage,
  onReceiveHistory,
  onTyping,
  onUserList,
  sendMessage,
  sendTyping,
} from "../services/socket.service";

export function useChat(currentUser: { id: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({});
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [activeContactId, setActiveContactId] = useState("");

  const activeIdRef = useRef(activeContactId);

  useEffect(() => {
    activeIdRef.current = activeContactId;
  }, [activeContactId]);

  const handleSendMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    sendMessage(msg);
  };

  useEffect(() => {
    connectSocket(currentUser);

    onUserList((list) => {
      setContacts(list.filter(u => u.id !== currentUser.id));
    });

    // FIX: add listener to receive message history
    onReceiveHistory((history: Message[]) => {
      setMessages(history);
    });

    onReceiveMessage((msg) => {
      setMessages(prev =>
        prev.some(m => m.id === msg.id) ? prev : [...prev, msg]
      );

      if (msg.fromUserId !== activeIdRef.current) {
        setUnreadCounts(prev => ({
          ...prev,
          [msg.fromUserId]: (prev[msg.fromUserId] || 0) + 1
        }));
      }
    });

    onTyping(({ fromUserId, isTyping }) => {
      setTypingStatus(prev => ({ ...prev, [fromUserId]: isTyping }));
    });

    return disconnectSocket;
  }, []);

  return {
    contacts,
    messages,
    typingStatus,
    unreadCounts,
    activeContactId,
    setActiveContactId,
    sendMessage: handleSendMessage,
    sendTyping,
    setUnreadCounts,
  };
}
