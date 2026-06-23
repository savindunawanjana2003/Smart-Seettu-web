import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Effect 1: Sync User Login Status Across Tabs (Using Storage Event)
  // ==========================================================
  useEffect(() => {
    const checkUser = () => {
      const savedCustomer = localStorage.getItem("currentCustomer");
      if (savedCustomer) {
        try {
          const user = JSON.parse(savedCustomer);
          if (user && user.email && user.email !== userEmail) {
            setUserEmail(user.email);
          }
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
        }
      } else {
        if (userEmail !== null) setUserEmail(null);
      }
    };

    // Initial check when component mounts
    checkUser();

    // Listen to changes made by other tabs (Instantly syncs login/logout)
    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, [userEmail]);

  // Effect 2: Manage WebSocket Connection Based on userEmail
  // ========================================================
  useEffect(() => {
    if (!userEmail) {
      console.log("SOCKET INFO: User is not available, connection skipped.");
      return;
    }

    console.log(`Connecting socket for email: ${userEmail}`);

    const socket = io("http://localhost:3001", {
      autoConnect: true,
      transports: ["websocket", "polling"],
      query: {
        userEmail: userEmail,
      },
    });

    setSocketInstance(socket);

    const handleBeforeUnload = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // -----
    socket.on("connect", () => {
      console.log("⚡ Connected to WebSocket Server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log(" Disconnected from WebSocket Server");
    });

    // Unmount Cleanup
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
      setSocketInstance(null);
    };
  }, [userEmail]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
