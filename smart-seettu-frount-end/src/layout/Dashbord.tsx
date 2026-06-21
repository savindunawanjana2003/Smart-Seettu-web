import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutCustomer } from "../redux/slice/customerSlice";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineBell,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SendNotyfy from "../components/SendNotyfy";
import GrupReqest from "../components/NotificetionModal";
import type { RootState } from "../redux/store";
import type { notifecetion } from "../types/types";
import { getRequestsBymemberEmail } from "../service/reqest";
import { getAllcustormer, setOffline } from "../service/user";
import { useSocket } from "../context/SocketContext";
const Dashboard = () => {
  const socket = useSocket();

  // --------------------methanin acountUserge Email eka ganna-----------------------
  const currentCustomer = useSelector(
    (state: RootState) => state.customer.currentCustomer,
  );
  const userEmail: string = currentCustomer?.email ?? "No email found";
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // -----------------------------------------------
  const [systemMembers, setSystemMembers] = useState<any>([]);

  useEffect(() => {
    if (location.pathname === "/pages/Dashbord") {
      navigate("/pages/Dashbord/Home", { replace: true });
    }
    getAllcustormerfuntion();
  }, []);

  // ===================dashbord ekak kothana page eke hitiyath / path eata enawa ===============
  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    // Browser back button event eka listen karanawa
    window.addEventListener("popstate", handlePopState);

    // Component eken ain weddi lisener eka ain wenawa
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // ====================================

  const getAllcustormerfuntion = async () => {
    try {
      const custormerList = await getAllcustormer();

      const formatted = custormerList.map((c: any) => ({
        id: c._id,
        name: c.name,
        email: c.email,
        isOnline: c.isOnline,
      }));

      setSystemMembers(formatted);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // ===================================

  useEffect(() => {
    if (!socket) {
      return;
    }


    socket.on("backend-updated", (data: { message: string; type: any }) => {
      if (data.type === "CUSTOMER_ADDED") {
        // alert("Custormer Offline 1");
      } else if (data.type === "CUSTOMER_LOGED") {
        getAllcustormerfuntion();
      } else if (data.type === "SHOCKET_DISCONECTED") {
        // alert("Custormer SHOCKET_DISCONECTED 2");

        getAllcustormerfuntion();

        // alert("Custormer Offline");
        // f();
      } else if (data.type === "NEW_GRUP_ADD") {
      }

      if (data.type == "UPDATE_AS_OFFLINE") {
        // alert("Custormer UPDATE_AS_OFFLINE 5");
        getAllcustormerfuntion();
      }

      if (data.type === "CUSTOMER_ONLINE") {
        // alert("Custormer Online awa 6");
        getAllcustormerfuntion();
      }
    });

    return () => {
      socket.off("backend-updated");
    };
  }, [socket]);

  // ===================================
  const [isShowGrupreq, setisShowGrupreq] = useState(false);

  const [notificetions, setNotyficetions] = useState<notifecetion[]>([]);

  const navItems = [
    { path: "Home", name: "Home", icon: <AiOutlineDashboard /> },
    {
      path: "Grupmanagement",
      name: "Group Management",
      icon: <AiOutlineHome />,
    },

    { path: "Ongoin", name: "Ongoing grup work", icon: <AiOutlineTeam /> },
    { path: "$Payment", name: "Make Payment", icon: <AiOutlineCreditCard /> },
    { path: "Contact", name: "Contacts", icon: <AiOutlineMail /> },
    { path: "AboutUs", name: "About Us", icon: <AiOutlineInfoCircle /> },
  ];

  const [notyCount, setNotyCount] = useState(0);
  const [showNotificationBar, setshowNotificationBar] =
    useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // user kenek wa clik karana kota danata inna page eka anuwa  wadakarana funshion ekak denna puluwan
  const handleUserClick = (user: any) => {
    const currentPath = location.pathname; // dan  lode wela thiyena url path eka ganne meken
    console.log(`Clicked User: ${user.name} | Current Path: ${currentPath}`);
    // await alert(currentPath);
    if (currentPath.endsWith("pages/Dashbord/CurrentgroupDetails")) {
      actionForGroupManagement(user);
      // alert(`now page and clik member : Group Management : ${user.name}`);
    } else if (currentPath.endsWith("pages/B")) {
      actionForPaymentStatus(user);
    } else if (currentPath.endsWith("/payments")) {
      actionForMakePayment(user);
    } else {
      // defaultAction(user);
    }
  };

  // notyfy count eka wenas wenakot witharak meke wenna one de {} athule liyanna one
  useEffect(() => {}, [notyCount]);
  // ====================show masseges in the sid bar=================
  const actionForGroupManagement = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true); //
  };

  const actionForPaymentStatus = (user: any) => {
    alert(`now page and clik member: ${user.name}`);
  };

  const actionForMakePayment = (user: any) => {
    alert(`now page and clik member : Make Payment  : ${user.name}`);
  };

  // const defaultAction = (user) => {
  //   alert(`now page and clik member : View  : ${user.name}`);
  // };

  const logout = () => {
    Swal.fire({
      title: "Logging Out...",
      text: "Please wait a moment.",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(async () => {
      const email: string = currentCustomer?.email || "";
      // wampaththe paththa valu eka false,null,undifain wage nam dakunu paththa value eka use karanna
      const offlineStatusResponse = await setOffline(email);
      dispatch(logoutCustomer());
      navigate("/", { replace: true });
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
    });
  };

  const clikNotyfy = () => {
    if (showNotificationBar) {
      setshowNotificationBar(false);
    } else {
      setshowNotificationBar(true);
    }
  };
  // const [notificetions, setNotyficetions] = useState<notifecetion[]>([]);
  //
  const groupRequest = async () => {
    // setNotyCount(notyCount + 1);
    setisShowGrupreq(true);

    // ------ api col

    try {
      const res = await getRequestsBymemberEmail(userEmail);

      const newNotifications = res.data.map((item: any) => ({
        id: item.grupId,
        reqestid: item.reqestId,
        email: item.memberEmail,
        grupId: item.grupId,
      }));

      setNotyficetions(newNotifications);

      // setNotyficetions(notificetions);
      console.log("================");
      console.log(notificetions);
      console.log("======================");
    } catch (error) {
      console.error(error);
    }
  };

  const paymentReminder = () => {
    // setNotyCount(notyCount + 1);
    setisShowGrupreq(true);
  };

  const groupCreated = () => {
    setisShowGrupreq(true);
    // setNotyCount(notyCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-14 sticky top-0 z-50 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 tracking-wider">
            SEETU LANKA
          </span>
        </div>
        {/* ====================== notyficetion icon=== */}
        <div className=" cursor-pointer absolute right-[22vw] ">
          <AiOutlineBell
            size={26}
            className="text-gray-700 hover:text-amber-500 transition-colors animate-bounce "
            onClick={clikNotyfy}
          />

          <span
            className={`absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold 
              `}
          >
            {notificetions.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
            S
          </div>
          <span className="font-medium text-sm hidden md:inline">
            Savindu Nawanjana
          </span>
        </div>
      </header>
      <div
        className={`w-[280px] h-[calc(100vh-3.5rem)] bg-white border-l border-gray-200 shadow-2xl fixed right-0 top-14 z-40 overflow-y-auto  shadow-xl transition-all duration-500 ${
          showNotificationBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
          <p className="text-xs text-gray-500">Recent updates and requests</p>
        </div>

        {/* =========================notificetion bar=========================== */}
        <div className="p-3 space-y-3">
          <div
            onClick={groupRequest}
            className="p-3 rounded-xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100 transition"
          >
            <p className="font-semibold text-sm">New Group Request</p>
            <p className="text-xs text-gray-500 mt-1">
              Kavindu joined Seettu Group #12
            </p>
          </div>

          <div
            onClick={paymentReminder}
            className="p-3 rounded-xl bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition"
          >
            <p className="font-semibold text-sm">Payment Reminder</p>
            <p className="text-xs text-gray-500 mt-1">
              Monthly payment due tomorrow
            </p>
          </div>

          <div
            onClick={groupCreated}
            className="p-3 rounded-xl bg-green-50 border border-green-100 cursor-pointer hover:bg-green-100 transition"
          >
            <p className="font-semibold text-sm">Group Created</p>
            <p className="text-xs text-gray-500 mt-1">
              Your new group was created successfully
            </p>
          </div>
        </div>
      </div>
      {/* =========frend Reqest coll=============================== */}
      <SendNotyfy
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
      ;{/* ========================== */}
      <GrupReqest
        isShow={isShowGrupreq}
        userEmail={userEmail}
        onClose={() => {
          setisShowGrupreq(false);
        }}
        reque={notificetions}
      />
      {/* ------------------------------------------------ */}
      {/* ===========left nave bar================== */}
      <div className="flex flex-1 pt-0">
        <nav className="w-64 bg-amber-47- h-[calc(100vh-3.5rem)] sticky top-14 hidden lg:flex flex-col p-3 border-r border-gray-200 overflow-y-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer mb-2">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center font-bold">
              S
            </div>
            <span className="font-semibold text-sm">Savindu Nawanjana</span>
          </div>

          <hr className="my-2 border-gray-200" />
          <div className="flex flex-col flex-1 bg--400  gap-[30px] space-y-1 border-amber-50 rounded-3xl pt-27">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                replace={true}
                className="flex items-center gap-10 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            {/* <button
              onClick={logout}
              className="flex justify-center items-center gap-10 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Log out
            </button> */}
          </div>
        </nav>
        {/* ===========chengable content Ariya=================== */}
        <main className="flex-1 bg-amber-50 p-4 min-h-[calc(100vh-3.5rem)] overflow-y-auto flex justify-center">
          <div className="w-[100vw] bg-amber-100 rounded-lg shadow border border-gray-200 p-2">
            {/* =================content Ariya===== */}
            <Outlet />

            {/* ===================== */}
          </div>
        </main>
        {/* ============ right aside========================== */}
        <aside className="w-64 bg-gray-50 h-[calc(100vh-3.5rem)] sticky top-14 hidden xl:flex flex-col p-4 border-l border-gray-200 overflow-y-auto">
          <h3 className="text-gray-500 font-semibold text-sm mb-3 tracking-wide">
            Contacts / Active Users
          </h3>
          <div className="space-y-2">
            {systemMembers.map((user: any) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-xs relative">
                    {user.name.charAt(0)}
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {user.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
