// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   type ReactNode,
// } from "react";
// import { io, Socket } from "socket.io-client";

// const SocketContext = createContext<Socket | null>(null);

// export const useSocket = (): Socket | null => useContext(SocketContext);

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//
//   const socket = useMemo(
//     () =>
//       io("http://localhost:3001", {
//         autoConnect: true,
//       }),
//     [],
//   );

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("⚡ Connected to WebSocket Server:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log(" Disconnected from WebSocket Server");
//     });

//     return () => {
//       // socket.off("connect");
//       // socket.off("disconnect");
//       socket.disconnect();
//     };
//   }, [socket]);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

//  frontend/src/context/SocketContext.tsx
// -======================================================================
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";
// import { io, Socket } from "socket.io-client";
// import Swal from "sweetalert2";

// const SocketContext = createContext<Socket | null>(null);

// export const useSocket = (): Socket | null => useContext(SocketContext);

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

//   useEffect(() => {
//     const savedCustomer = localStorage.getItem("currentCustomer");

//     // data naththan sockent connection eka hadanne nathuwa methanain nawathwanawa  ethakota program eka crash wenna na thiyena idakada nathi wenawa
//     if (!savedCustomer) {
//       Swal.fire({
//         title: " plese Loggin",
//         text: "Access denied. Please sign in again.",
//         icon: "info",
//         timer: 3000,
//         showConfirmButton: false,
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });
//       return;
//     }

//     try {
//       const user = JSON.parse(savedCustomer);

//       if (!user || !user.email) {
//         return;
//       }

//       const socket = io("http://localhost:3001", {
//         autoConnect: true,
//         transports: ["websocket", "polling"],
//         query: {
//           userEmail: user.email,
//         },
//       });

//       setSocketInstance(socket);

//       socket.on("connect", () => {
//         console.log("⚡ Connected to WebSocket Server:", socket.id);
//       });

//       socket.on("disconnect", () => {
//         console.log("Disconnected from WebSocket Server");
//       });

//       // Unmount Cleanup
//       return () => {
//         socket.off("connect");
//         socket.off("disconnect");
//         socket.disconnect();
//       };
//     } catch (error) {
//       console.error("Error parsing user from localStorage:", error);
//     }
//   }, []);
//   return (
//     <SocketContext.Provider value={socketInstance}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
// ======================================================

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
          console.error("Error parsing user:", e);
        }
      } else {
        if (userEmail !== null) setUserEmail(null);
      }
    };

    checkUser();
    const interval = setInterval(checkUser, 1000); // 1s n 1s chek karanawa login chek karanna 
    return () => clearInterval(interval);
  }, [userEmail]);

  // Effect 2: 💡 email ekak stet ekata set wechcha gaman socket eka conect wenawa 
  useEffect(() => {
    if (!userEmail) {
      console.log("SOCKET INFO: if user is not avelable  so does;not create a socket.");
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
  }, [userEmail]); // email eka wenas weddi witharai socket eka hadenne saha ainwenne 

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
