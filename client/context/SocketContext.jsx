"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 🚫 SSR protection
    if (typeof window === "undefined") return;

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000", {
        transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
        setReady(true);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!ready) return null;

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
