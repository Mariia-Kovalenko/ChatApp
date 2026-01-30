const {
    addUser,
    setOffline,
    getAllUsers,
    getUserById,
} = require("../state/users");
const { saveMessage, getAllMessages } = require('../state/messages');
const { bots } = require("../constants");

const registerSocketHandlers = (io, socket) => {

    // JOIN
    socket.on('join', (user) => {
        const list = addUser(user, socket.id);
        io.emit('user_list', Object.values(list));

        // FIX: load messages history
        const allMessages = getAllMessages(); 
        const userHistory = allMessages.filter(m => 
            m.toUserId === user.id || m.fromUserId === user.id
        );
        socket.emit('load_history', userHistory);

        console.log('emit user history', userHistory)
    });

    // SEND MESSAGE
    socket.on("send_message", (msg) => {
        saveMessage(msg);
        const targetId = msg.toUserId;
        // FIX: add separate func to handle bot and user messages
        if (bots[targetId]) {
            handleBotResponse(socket, targetId, msg);
        } else {
            handleUserMessage(io, socket, targetId, msg);
        }
    });

    // USER TYPING
    socket.on("typing", (data) => {
        // FIX: use separate func to retrieve users
        const recipient = getUserById(data.toUserId);
        if (recipient?.socketId) {
            io.to(recipient.socketId).emit("user_typing", {
                fromUserId: data.fromUserId,
                isTyping: data.isTyping,
            });
        }
    });

    // DISCONNECTED: set offline
    socket.on("disconnect", () => {
        const list = setOffline(socket.id);
        io.emit("user_list", Object.values(list));
    });
};

function handleBotResponse(socket, targetId, msg) {
    if (targetId !== "ignore") {
        socket.emit("user_typing", {
            fromUserId: targetId,
            isTyping: true,
        });
    }
    const delay = targetId === "echo" ? 3000 : 1000;

    setTimeout(() => {
        let text =
            targetId === "echo"
                ? msg.text
                : targetId === "reverse"
                  ? msg.text.split("").reverse().join("")
                  : "";
        if (text) {
            // fix: fixed saving bot message to history
            const botResponse = {
                ...msg,
                fromUserId: targetId,
                toUserId: msg.fromUserId,
                text,
                id: Date.now(),
            }
            saveMessage(botResponse);
            socket.emit("receive_message", botResponse);
        }
        if (targetId !== "ignore") {
            socket.emit("user_typing", {
                fromUserId: targetId,
                isTyping: false,
            });
        }
    }, delay);
}

function handleUserMessage(io, socket, targetId, msg) {
    const recipient = getUserById(targetId);
    if (recipient?.socketId)
        io.to(recipient.socketId).emit("receive_message", msg);
    socket.emit("receive_message", msg);
}


module.exports = { registerSocketHandlers }