import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSocketStore from "@/store/useSocketStore";

const useSocket = (
  roomId: string | null
): { loading: boolean; authorized: boolean } => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const setSocket = useSocketStore.getState().setSocket;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!roomId || !token) return;

    const WS = io(`http://localhost:8000`, {
      query: {
        roomId,
        token,
      },
    });
    WS.connect();
    WS.on("connect", () => {
      console.log("Socket connected");
    });

    WS.on("authorized", () => {
      setSocket(WS);
      setAuthorized(true);
      setLoading(false);
    });

    WS.on("unauthorized", () => {
      console.log('unauthorized'); 
      setLoading(false);
    });

    WS.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return () => {
      WS.disconnect();
    };
  });

  return { loading, authorized };
};

export default useSocket;
