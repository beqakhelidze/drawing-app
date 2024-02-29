import { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStore {
  socket: null | Socket;
  roomName: null | string;
  setSocket: (socket: Socket, roomName: string) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  roomName: null,
  setSocket: (socket, roomName) => {
    set({
      socket,
      roomName,
    });
  },
}));

export default useSocketStore;
