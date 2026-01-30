import { useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { Contact, Message } from "../types";
import MessageInput from "../common/MessageInput";

type ChatWindowProps = {
  activeContact: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
  currentUserId: string; 
  isTyping: boolean;
  onTyping: (isTyping: boolean) => void
}

export default function ChatWindow({ 
  activeContact, 
  messages, 
  onSendMessage, 
  onBack,
  currentUserId ,
  isTyping,
  onTyping
}: ChatWindowProps) {
  const [inputText, setInputText] = useState("");
  const typingTimeoutRef = useRef<number | null>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
    onTyping(false); 
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    onTyping(true);

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      onTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#b4c3d2] flex gap-4 items-start transition-all duration-300 relative">
        <button 
          onClick={onBack}
          className="md:hidden absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm shadow-sm"
        >
          Back
        </button>
        <img 
          src={activeContact.avatar || "https://via.placeholder.com/100"} 
          className="w-36 h-36 bg-gray-400 flex-shrink-0 object-cover" 
          alt={activeContact.name} 
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold">{activeContact.name}</h2>
          <p className="text-sm text-gray-700 max-w-xl">{activeContact.desc}</p>
        </div>
      </div>

      <div className="scrollable flex-1 overflow-y-auto p-6 space-y-4 bg-[#d9e2ec]">
        {messages.map((msg) => {
            console.log(msg.fromUserId, ' vs ', currentUserId)
            const isMe = msg.fromUserId === currentUserId;

            return (
              <MessageBubble 
                key={msg.id}
                isMe={isMe} 
                user={isMe ? "Me" : activeContact.name} 
                text={msg.text} 
                time={msg.time} 
              />)
            })
        }
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No messages yet. Say hello to {activeContact.name}!
          </div>
        )}
      </div>

      {isTyping && 
        <div className="text-center text-[#4a90e2] text-xs text-blue italic py-2 bg-[#d9e2ec]">
            {activeContact.name} is typing
        </div>
      }

      <MessageInput
        value={inputText}
        onChange={handleInputChange}
        onSend={handleSend}
      />
    </div>
  );
}