interface UserProfile {
    id: string;
    name: string;
    avatar: string;
}

export const getIdentity = () => {
    const saved = localStorage.getItem('chat_user');
    if (saved) return JSON.parse(saved);

    const names = ["Swift Fox", "Neon Turtle", "Brave Panda", "Shadow Eagle", "Cosmic Whale"];
    const randomName = names[Math.floor(Math.random() * names.length)] + " " + Math.floor(Math.random() * 100);
    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomName}`;

    const newUser: UserProfile = {
      id: Math.random().toString(36).substring(2, 9),
      name: randomName,
      avatar: randomAvatar
    };
    localStorage.setItem('chat_user', JSON.stringify(newUser));
    return newUser;
  };