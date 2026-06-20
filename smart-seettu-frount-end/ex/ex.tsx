// import React, { useEffect, useState } from "react";
// import { useSocket } from "../SocketContext"; // අපේ Socket Context එක

// interface SeetuData {
//   id: string;
//   name: string;
//   amount: number;
// }

// const Home: React.FC = () => {
//   const socket = useSocket();
//   const [seetuList, setSeetuList] = useState<SeetuData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // 1. Database එකෙන් data ටික fetch කරන ප්‍රධාන function එක
//   const fetchSeetuData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/api/seetu"); // ඔයාගේ API URL එක
//       const data = await response.json();
//       setSeetuList(data); // State එක update වෙනවා
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Page එක මුලින්ම load වෙද්දී data fetch කරනවා
//   useEffect(() => {
//     fetchSeetuData();
//   }, []);

//   // 2. Socket එක listen කරලා අදාළ කොටස විතරක් refresh කරන තැන
//   useEffect(() => {
//     if (!socket) return;

//     // Backend එකෙන් update එකක් ආපු ගමන්...
//     socket.on("backend-updated", (data: { message: string }) => {
//       console.log("Real-time notification:", data.message);

//       // 🔄 මුළු පිටුවම refresh කරන්නේ නැහැ!
//       // data fetch කරන function එක විතරක් ආයේ run කරනවා.
//       fetchSeetuData();
//     });

//     return () => {
//       socket.off("backend-updated");
//     };
//   }, [socket]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Smart Seetu Dashboard</h1>

//       {/* 📊 මේ Component එක විතරක් automatic refresh වෙනවා */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {seetuList.map((seetu) => (
//           <div key={seetu.id} className="border p-4 rounded shadow">
//             <h3 className="font-semibold">{seetu.name}</h3>
//             <p>Amount: LKR {seetu.amount}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


// // =========================================


// import React, { useEffect, useState } from 'react';
// import { useSocket } from '../SocketContext'; // අපේ Socket Context එක

// interface SeetuData {
//   id: string;
//   name: string;
//   amount: number;
// }

// const Home: React.FC = () => {
//   const socket = useSocket();
//   const [seetuList, setSeetuList] = useState<SeetuData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // 1. Database එකෙන් data ටික fetch කරන ප්‍රධාන function එක
//   const fetchSeetuData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/seetu'); // ඔයාගේ API URL එක
//       const data = await response.json();
//       setSeetuList(data); // State එක update වෙනවා
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Page එක මුලින්ම load වෙද්දී data fetch කරනවා
//   useEffect(() => {
//     fetchSeetuData();
//   }, []);

//   // 2. Socket එක listen කරලා අදාළ කොටස විතරක් refresh කරන තැන
//   useEffect(() => {
//     if (!socket) return;

//     // Backend එකෙන් update එකක් ආපු ගමන්...
//     socket.on('backend-updated', (data: { message: string }) => {
//       console.log('Real-time notification:', data.message);
      
//       // 🔄 මුළු පිටුවම refresh කරන්නේ නැහැ! 
//       // data fetch කරන function එක විතරක් ආයේ run කරනවා.
//       fetchSeetuData(); 
//     });

//     return () => {
//       socket.off('backend-updated');
//     };
//   }, [socket]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Smart Seetu Dashboard</h1>
      
//       {/* 📊 මේ Component එක විතරක් automatic refresh වෙනවා */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {seetuList.map((seetu) => (
//           <div key={seetu.id} className="border p-4 rounded shadow">
//             <h3 className="font-semibold">{seetu.name}</h3>
//             <p>Amount: LKR {seetu.amount}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;