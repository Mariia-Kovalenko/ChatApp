import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { BOTS } from './data';
import type { Bot } from "./types";

export default function App() {
  const [activeBotId, setActiveBotId] = useState('reverse');
  const [showChat, setShowChat] = useState(false);

  const activeBot = BOTS.find((b: Bot) => b.id === activeBotId) || BOTS[1];

  const handleSelectBot = (id: string) => {
    setActiveBotId(id);
    setShowChat(true); 
  };

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-gray-800">

      <div className={`flex-1 flex flex-col border-r border-gray-300 ${!showChat ? 'hidden md:flex' : 'flex'}`}>
        <ChatWindow 
          activeBot={activeBot} 
          onBack={() => setShowChat(false)} 
        />
      </div>

      <div className={`bg-white flex flex-col w-full md:w-80 ${showChat ? 'hidden md:flex' : 'flex'}`}>
        <Sidebar 
          activeBotId={activeBotId} 
          onSelectBot={handleSelectBot} 
        />
      </div>
      
    </div>
  );
}