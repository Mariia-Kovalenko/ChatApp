import MessageBubble from "./MessageBubble";
import type { Bot } from "../types";

type ChatWindowProps = {
    activeBot: Bot;
    onBack: () => void
}

export default function ChatWindow({ activeBot, onBack }: ChatWindowProps) {
    return (
      <>
        <div className="bg-[#b4c3d2] p-6 flex gap-4 items-start transition-all duration-300">
        <button 
          onClick={onBack}
          className="md:hidden absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm"
        >
          Back
        </button>
          <div className="w-24 h-24 bg-gray-400 border-2 border-white flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">{activeBot.name}</h2>
            <p className="text-sm text-gray-700 max-w-xl">{activeBot.desc}</p>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#d9e2ec]">
            <MessageBubble isMe={false} user="Reverse bot" text="Hello world!" time="4:20 PM" />
            <MessageBubble isMe={true} user="Username" text="Hello robot" time="4:22 PM" />
            
        </div>
  
        <div className="text-center text-xs text-[#4a90e2] italic py-2 bg-[#d9e2ec]">
          Reverse bot is typing...
        </div>
        <div className="p-2 sm:p-4 bg-[#d9e2ec] flex gap-2">
            <input 
            type="text" 
            placeholder="Start chatting!" 
            className="
            flex-1 p-3 rounded bg-white
            border-[1.3px] border-gray-300
            shadow-sm
            focus:outline-none
            focus:border-[#4a90e2] focus:shadow-lg"
        />
            <button className="bg-[#4a90e2] h-[50px] min-w-[50px] flex items-center justify-center text-white text-sm md:text-md whitespace-nowrap p-3 rounded font-semibold hover:bg-blue-600 transition-colors">
                <span className="block md:hidden">
                    <svg width="20" height="20" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.2122 7.06774L36.2134 7.77609C35.7278 7.8634 35.2779 7.98532 34.8035 8.11732L34.611 8.17095C26.2611 10.1998 18.2549 13.2791 10.8338 17.314C8.06665 18.7878 6.53925 21.7507 6.94304 24.8616C7.34912 27.9858 9.59725 30.4721 12.6834 31.1972L20.5241 32.9865C20.8564 33.0623 21.145 33.2271 21.3872 33.4414C21.4145 33.4716 21.4236 33.5111 21.4527 33.5404C21.4821 33.5697 21.5219 33.5791 21.5524 33.6066C21.7671 33.8488 21.9319 34.1374 22.0078 34.4692L23.796 42.3088C24.576 45.733 27.5873 48.1252 31.1187 48.1252C33.896 48.1252 36.3476 46.6448 37.6727 44.1742C41.9719 36.2306 45.1765 27.723 47.193 18.8998L47.927 15.7823L47.9304 15.7722C48.4955 13.3183 47.7693 10.7894 45.9878 9.00695C44.2053 7.22426 41.673 6.49482 39.2122 7.06774ZM43.4644 14.7393L42.7293 17.8636C40.8001 26.2962 37.743 34.4144 33.6375 41.9998C32.9182 43.3416 31.751 43.5419 31.1187 43.5419C29.9539 43.5419 28.619 42.8459 28.2654 41.2906L26.4761 33.4487C26.3764 33.0119 26.1875 32.6207 26.0095 32.2247L31.4096 26.8256C32.3047 25.9316 32.3047 24.4803 31.4096 23.5849C30.5144 22.6896 29.0643 22.6898 28.1689 23.5849L22.7679 28.985C22.3682 28.8051 21.9725 28.6158 21.5311 28.5152L13.7197 26.7325C11.8903 26.3028 11.55 24.7397 11.4886 24.2708C11.4292 23.8077 11.3589 22.2276 13.0059 21.3503C20.0958 17.4955 27.7294 14.5603 35.7557 12.6088L36.0277 12.5338C36.3635 12.441 36.6813 12.3491 37.1445 12.2618L40.252 11.5312C40.4612 11.4831 40.6693 11.4586 40.8739 11.4586C41.571 11.4586 42.2313 11.7327 42.746 12.2474C43.4129 12.9145 43.6748 13.8229 43.4644 14.7393Z" fill="white"/>
                    </svg>
                </span> 
                <span className="hidden md:block">Send message</span>
            </button>
        </div>
      </>
    );
  }