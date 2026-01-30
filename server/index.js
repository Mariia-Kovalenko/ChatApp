const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
// const  { bots } = require('./constants')
const { startSpamBot } = require('./services/spamService');
const { registerSocketHandlers } = require('./handlers/socketsHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" } 
});

startSpamBot(io);
io.on('connection', (socket) => {
  registerSocketHandlers(io, socket);
});

server.listen(3001, () => console.log('Server running on port 3001'));