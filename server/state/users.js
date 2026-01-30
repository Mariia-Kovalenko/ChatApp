const { bots } = require('../constants');

let connectedUsers = { ...bots };

const addUser = (user, socketId) => {
    connectedUsers[user.id] = { ...user, socketId, online: true, isBot: false };
    return connectedUsers;
};

const setOffline = (socketId) => {
    const userId = Object.keys(connectedUsers).find(
        (id) => connectedUsers[id].socketId === socketId,
    );
    if (userId && !connectedUsers[userId].isBot) {
        connectedUsers[userId].online = false;
    }
    return connectedUsers;
};

const getAllUsers = () => Object.values(connectedUsers);
const getUserById = (id) => connectedUsers[id];

module.exports = {
    addUser,
    setOffline,
    getAllUsers,
    getUserById,
    connectedUsers,
};
