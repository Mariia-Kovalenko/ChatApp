const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const  { bots } = require('./constants')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" } 
});


let connectedUsers = { ...bots };

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    connectedUsers[user.id] = { ...user, socketId: socket.id, online: true, isBot: false };
    io.emit('user_list', Object.values(connectedUsers));
  });

  socket.on('send_message', (msg) => {
    const targetId = msg.toUserId;

    // if bot
    if (bots[targetId]) {
      if (targetId !== 'ignore') {
        socket.emit('user_typing', { fromUserId: targetId, isTyping: true });
      }

      const delay = targetId === 'echo' ? 3000 : 1000;

      setTimeout(() => {
        let replyText = "";
  
        if (targetId === 'echo') {
          replyText = msg.text;
        } else if (targetId === 'reverse') {
          replyText = msg.text.split('').reverse().join('');
        } 
  
        if (replyText) {
          const reply = { 
            ...msg, 
            fromUserId: targetId, 
            toUserId: msg.fromUserId, 
            text: replyText, 
            id: Date.now() 
          };
          socket.emit('receive_message', reply);
        }

        if (targetId !== 'ignore') {
          socket.emit('user_typing', { fromUserId: targetId, isTyping: false });
        }
      }, delay);
    } else {
      // if user
      const recipient = connectedUsers[targetId];

      if (recipient && recipient.socketId) {
        io.to(recipient.socketId).emit('receive_message', msg);
      }

      socket.emit('receive_message', msg);
    }
  });

  socket.on('typing', (data) => {
    const recipient = connectedUsers[data.toUserId];
  
    if (recipient && recipient.socketId) {
      io.to(recipient.socketId).emit('user_typing', {
        fromUserId: data.fromUserId,
        isTyping: data.isTyping
      });
    }
  });

// upon delete, set offline status, do not clean
  socket.on('disconnect', () => {
    const userId = Object.keys(connectedUsers).find(
      id => connectedUsers[id].socketId === socket.id
    );

    if (userId && !connectedUsers[userId].isBot) {
      connectedUsers[userId].online = false;
      io.emit('user_list', Object.values(connectedUsers));
    }
  });
});


// spam bot
const sendSpam = () => {
  const min = 10000;
  const max = 120000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  setTimeout(() => {
    const spamMessages = [
      "Hey, I`m here just to check on you!",
      "Are you still there? I miss you!",
      "You can do whatever you want!",
      "System alert: You are doing great!"
    ];
    
    const randomText = spamMessages[Math.floor(Math.random() * spamMessages.length)];
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //FIX: make sure correct ids are sent to ensure we receive and display messages from spam bot
    Object.values(connectedUsers).forEach(user => {
      if (!user.isBot && user.socketId) {
        const spamMsg = {
          id: Date.now() + Math.random(), 
          fromUserId: 'spam', 
          toUserId: user.id, 
          text: randomText,
          time: timestamp
        };

        io.to(user.socketId).emit('receive_message', spamMsg);
      }
    });

    // console.log('Spam sent to all active users');
    sendSpam();
  }, delay);
};

sendSpam();

server.listen(3001, () => console.log('Server running on port 3001'));