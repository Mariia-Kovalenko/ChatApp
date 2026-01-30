import { io, Socket } from "socket.io-client";
import type { Message } from "../types";

let socket: Socket | null = null;

export function connectSocket(user: { id: string }) {
  socket = io("http://localhost:3001");
  socket.emit("join", user);
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}

export function onUserList(cb: (users: any[]) => void) {
  socket?.on("user_list", cb);
}

export function onReceiveMessage(cb: (msg: Message) => void) {
  socket?.on("receive_message", cb);
}

export function onTyping(cb: (data: { fromUserId: string; isTyping: boolean }) => void) {
  socket?.on("user_typing", cb);
}

export function sendMessage(msg: Message) {
  socket?.emit("send_message", msg);
}

export function sendTyping(data: {
  fromUserId: string;
  toUserId: string;
  isTyping: boolean;
}) {
  socket?.emit("typing", data);
}
