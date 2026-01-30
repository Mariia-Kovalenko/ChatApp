const bots = {
    echo: {
        id: "echo",
        name: "Echo bot",
        desc: "I repeat what you say...",
        online: true,
        isBot: true,
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=echo",
    },
    reverse: {
        id: "reverse",
        name: "Reverse bot",
        desc: "I turn your world upside down.",
        online: true,
        isBot: true,
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=reverse",
    },
    spam: {
        id: "spam",
        name: "Spam bot",
        desc: "I will spam you to the death!!",
        online: true,
        isBot: true,
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=spam",
    },
    ignore: {
        id: "ignore",
        name: "Ignore bot",
        desc: "...",
        online: true,
        isBot: true,
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ignore",
    },
};

const spamMessages = [
    "Hey, I`m here just to check on you!",
    "Are you still there? I miss you!",
    "You can do whatever you want!",
    "System alert: You are doing great!",
];

module.exports = { bots, spamMessages };
