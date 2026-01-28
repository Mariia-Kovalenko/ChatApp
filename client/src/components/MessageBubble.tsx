type MessageBubbleProps = {
    isMe: boolean;
    user: string;
    text: string;
    time: string;
  };
  
  export default function MessageBubble({
    isMe,
    user,
    text,
    time,
  }: MessageBubbleProps) {
    return (
      <div className={`flex flex-col lg:max-w-lg max-w-[90%] w-full ${isMe ? "justify-self-end": ""}`}>
        <div className="relative w-full">
          <div className="rounded-lg shadow-md overflow-hidden bg-[#f1f3f5]">
            <div
              className={`px-3 py-1 text-xs flex justify-between gap-10 ${
                isMe ? 'bg-[#f5c6cb]' : 'bg-[#dee2e6]'
              }`}
            >
              <span className="font-bold">{user}</span>
              <span className="text-gray-500">{time}</span>
            </div>
            <div className="p-3 text-sm">{text}</div>
          </div>
  
          <div
            className={`absolute bottom-4 w-3 h-3 rotate-45 bg-[#f1f3f5] ${
              isMe ? '-right-1.5' : '-left-1.5'
            }`}
          />
        </div>
        {isMe && (
          <span className="text-[10px] text-gray-400 mt-1 mr-2">
            Seen 4:27pm
          </span>
        )}
      </div>
    );
  }
  