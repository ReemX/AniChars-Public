import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const socket = io(import.meta.env.VITE_API_HOST);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined)
    throw new Error("SocketContext was used outside SocketProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SocketProvider, useSocket };
