const { getAllUsers } = require("../state/users");
const { spamMessages } = require("../constants");
const { saveMessage } = require ("../state/messages");

const startSpamBot = (io) => {
    const sendSpam = () => {
        const min = 10000;
        const max = 120000;
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;

        setTimeout(() => {
            const randomText =
                spamMessages[Math.floor(Math.random() * spamMessages.length)];
            const timestamp = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            getAllUsers().forEach((user) => {
                if (!user.isBot && user.socketId) {
                    const spamMsg = {
                        id: Date.now() + Math.random(),
                        fromUserId: "spam",
                        toUserId: user.id,
                        text: randomText,
                        time: timestamp,
                    };

                    //FIX: save spam bot messages
                    saveMessage(spamMsg);

                    io.to(user.socketId).emit("receive_message", spamMsg);
                }
            });
            sendSpam();
        }, delay);
    };
    sendSpam();
};

module.exports = { startSpamBot };
