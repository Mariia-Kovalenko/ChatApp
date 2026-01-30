let messageHistory = [];

// NOTE: keeps only 500 messages for demo
const saveMessage = (msg) => {
  messageHistory.push(msg);
  if (messageHistory.length > 500) messageHistory.shift();
};

const getHistoryForUser = (userId1, userId2) => {
  return messageHistory.filter(msg => 
    (msg.fromUserId === userId1 && msg.toUserId === userId2) ||
    (msg.fromUserId === userId2 && msg.toUserId === userId1) ||
    (msg.fromUserId === 'spam' && msg.toUserId === userId1) 
  );
};

const getAllMessages = () => messageHistory;

module.exports = { saveMessage, getHistoryForUser, getAllMessages };