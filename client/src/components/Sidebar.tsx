import { useState } from "react";
import type { Contact } from "../types";
import SearchInput from "../common/SearchInput";
import ContactItem from "./Contact";

type SidebarProps = {
    contacts: any[];
    activeContactId: string;
    onSelectContact: (id: string) => void;
    unreadCounts: Record<string, number>;
};

export default function Sidebar({
    activeContactId,
    contacts,
    onSelectContact,
    unreadCounts,
}: SidebarProps) {
    const [filter, setFilter] = useState("online");
    const [searchQuery, setSearchQuery] = useState("");

    const displayContacts = contacts.filter((bot: Contact) => {
        const matchesTab = filter === "all" || bot.online;
        const matchesSearch = bot.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <>
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setFilter("online")}
                    className={`flex-1 py-3 font-semibold border-r border-gray-200 ${filter === "online" ? "bg-white" : "bg-gray-50 text-gray-400"}`}
                >
                    Online
                </button>
                <button
                    onClick={() => setFilter("all")}
                    className={`flex-1 py-3 font-semibold ${filter === "all" ? "bg-white" : "bg-gray-50 text-gray-400"}`}
                >
                    All
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {displayContacts.length ? (
                    displayContacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            unreadCount={unreadCounts[contact.id] || 0}
                            isActive={activeContactId === contact.id}
                            onSelect={onSelectContact}
                        />
                    ))
                ) : (
                    <div className="text-sm text-center text-gray-400 pt-8">
                        No conversations found
                    </div>
                )}
            </div>

            <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
            />
        </>
    );
}
