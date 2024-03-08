import { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStore {
  socket: null | Socket;
  setSocket: (socket: Socket) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => {
    set({
      socket
    });
  },
}));

export default useSocketStore;
