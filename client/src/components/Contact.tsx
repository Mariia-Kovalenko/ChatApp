import type { Contact } from "../types";

type ContactItemProps = {
    contact: Contact;
    unreadCount?: number;
    isActive?: boolean;
    onSelect: (contactId: string) => void;
};

export default function ContactItem({
    contact,
    unreadCount = 0,
    isActive = false,
    onSelect,
}: ContactItemProps) {
    return (
        <div
            onClick={() => onSelect(contact.id)}
            className={`p-4 flex gap-3 border-b border-gray-100 cursor-pointer
          ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`}
        >
            <div className="relative">
                <div className="w-12 h-12 relative rounded" />
                <img
                    src={contact.avatar || "https://via.placeholder.com/100"}
                    className="absolute top-0 w-full h-full bg-gray-400 flex-shrink-0 object-cover rounded"
                    alt={contact.name}
                />
                {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{contact.name}</h4>
                <p className="text-xs text-gray-400 truncate">{contact.desc}</p>
            </div>

            {unreadCount > 0 && (
                <div className="flex items-center">
                    <span className="w-4 h-4 aspect-square bg-[#4a90e2] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {unreadCount}
                    </span>
                </div>
            )}
        </div>
    );
}
