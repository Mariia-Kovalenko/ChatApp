import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { getIdentity } from "./utils/auth";
import { useChat } from "./hooks/useChat";

export default function App() {
  const currentUser = useRef(getIdentity());
  const [showChat, setShowChat] = useState(false);

  const {
      contacts,
      messages,
      typingStatus,
      unreadCounts,
      activeContactId,
      setActiveContactId,
      sendMessage,
      sendTyping,
      setUnreadCounts,
  } = useChat(currentUser.current);

  const activeMessages = messages.filter((m) => {
    const isMe = m.fromUserId === currentUser.current.id;
    const isTarget = m.fromUserId === activeContactId;
    
    // 1. Message is from me TO the active contact
    const sentByMe = isMe && m.toUserId === activeContactId;
    
    // 2. Message is from the active contact TO me
    const receivedByMe = isTarget && m.toUserId === currentUser.current.id;
  
    return sentByMe || receivedByMe;
  });

  const activeContact = contacts.find((c) => c.id === activeContactId);

  const handleSelectContact = (id: string) => {
      setActiveContactId(id);
      localStorage.setItem('lastOpened', id);
      setShowChat(true);
      setUnreadCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  useEffect(() => {
    if (!activeContact && contacts.length) {
      // FIX: make sure we always see the last opened 
      const lastOpened = localStorage.getItem('lastOpened');
      const c = contacts.find((c) => c.id === lastOpened);

      if (c?.online) {
        setActiveContactId(c?.id)
      } else {
        setActiveContactId(contacts[0].id)
      }
      setShowChat(true);
    }
  }, [contacts])

  return (
      <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-gray-800">
          <div className={`flex-1 flex flex-col border-r border-gray-300 ${!showChat ? "hidden md:flex" : "flex"}`}>
              {activeContact ? (
                  <ChatWindow
                      activeContact={activeContact}
                      messages={activeMessages}
                      currentUserId={currentUser.current.id}
                      isTyping={!!typingStatus[activeContactId]}
                      onBack={() => setShowChat(false)}
                      onSendMessage={(text) =>
                          sendMessage({
                              id: Date.now(),
                              fromUserId: currentUser.current.id,
                              toUserId: activeContactId,
                              text,
                              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                          })
                      }
                      onTyping={(isTyping) =>
                          sendTyping({
                              fromUserId: currentUser.current.id,
                              toUserId: activeContactId,
                              isTyping,
                          })
                      }
                  />
              ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                      Select a contact to start chatting
                  </div>
              )}
          </div>

          <div className={`bg-white flex flex-col w-full md:w-80 ${showChat ? "hidden md:flex" : "flex"}`}>
              <Sidebar
                  contacts={contacts}
                  activeContactId={activeContactId}
                  unreadCounts={unreadCounts}
                  onSelectContact={handleSelectContact}
              />
          </div>
      </div>
  );
}