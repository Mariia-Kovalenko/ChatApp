# ChatApp — Messenger with Bots

**ChatApp** is a full-stack, real-time chat application built with **React**, **Node.js**, and **Socket.io**.  
It features a lightweight server architecture, in-memory message storage, and interactive bots with distinct personalities.

---

## Getting Started

Follow these steps to run the project locally:

### 1. Install Dependencies
Run the following command in the root directory to install packages for both the server and the React client:

```bash
npm install && npm --prefix client install && npm --prefix server install
```


### 2 Start the Application
Launch both the server and frontend simultaneously using the concurrent script (in root folder):

```bash
npm run start
```

Development mode:
```bash
npm run dev
```
- Server: http://localhost:3001
- Client: http://localhost:5173


### 3 Project structure

Project Structure

The project is organized to keep the server lean and the frontend modular.

**Server (server/)**

```
├── constants.js    # Bot profiles and configurations, spam messages 
├── handlers/       # Socket event logic (join, message, typing)
├── services/       # Automated tasks (SpamBot)
├── state/          # In-memory storage (Users and Messages)
└── index.js        # Entry point and server configuration
```

**Client (client/src/)**
```
├── common/         # Reusable components (Inputs, Button etc)
├── components/     # Main UI components (Sidebar, ChatWindow, Bubbles)
├── hooks/          # Custom useChat hook for state management
├── services/       # Socket.io connection and event emitters
└── utils/          # Identity generation and localStorage auth
```

### 4 Features
**Client-Side**

- Dynamic Identity: Randomly generates a name and avatar for first-time users, stored in localStorage for returning sessions.
- Real-time Interaction: Instant message delivery and "typing..." indicators for both humans and bots.
- Unread Notifications: Tracks unread messages per contact and resets when the chat is opened.
- Responsive Design: Desktop layout with adaptive mobile view that toggles between contact list and active chat.
- Swift Updates: Messages appear instantly for the sender, ensuring a smooth experience.

**Server-Side**

- In-Memory Message Storage: Keeps message history in a server-side array—no database needed.
- State Management: Tracks active users and broadcasts real-time online/offline status updates.
- Bot Logic: Custom behavior for each bot.


### 5 Tech Stack
- Frontend: React (TypeScript), Tailwind CSS, Vite.
- Backend: Node.js, Express.
- Real-time: Socket.io.
- Tooling: Concurrently (for dual-process execution), Nodemon (for dev restarts).