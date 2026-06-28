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
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdSend } from "react-icons/md";
import EmailModal from "../components/EmailModalForVidiocall";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SendNotyfy from "../components/SendNotyfy";
import GrupReqest from "../components/NotificetionModal";
import type { RootState } from "../redux/store";
import type { notifecetion, userType } from "../types/types";
import { getRequestsBymemberEmail } from "../service/reqest";
import { getAllcustormer } from "../service/user";
import { useSocket } from "../context/SocketContext";
import { setShowEmailIcon } from "../redux/slice/mailSlice";
import MemberDetailsModal from "../components/ModalForRecognizeuser";

export let uData = {
  id: "",
  name: "",
  email: "",
  contact: "",
  isOnline: "",
};

const Dashboard = () => {
  const socket = useSocket();

  const [userData, setUserData] = useState<any>({
    id: "",
    name: "",
    email: "",
    contact: "",
    isOnline: "",
  });

  // =============Brode cast==================================
  const updateMyData = (c: any) => {
    const c2 = {
      id: c.id,
      name: c.name,
      email: c.email,
      contact: c.contact,
      isOnline: c.isOnline,
    };

    setUserData(c2);
    uData = c2;
    const event = new CustomEvent("myDataChanged", { detail: c2 });
    window.dispatchEvent(event);
  };
  // =============Brode cast==================================

  const currentCustomer = useSelector(
    (state: RootState) => state.customer.currentCustomer,
  );
  const userEmail: string = currentCustomer?.email ?? "No email found";
  const userName: string =
    currentCustomer?.name ?? "user not found plaes login agen";

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [systemMembers, setSystemMembers] = useState<any>([]);
  const [isShowGrupreq, setisShowGrupreq] = useState(false);
  const [notificetions, setNotyficetions] = useState<notifecetion[]>([]);
  const [needTosendEmail, setneedTosendEmail] = useState(false);
  const [grupId, setgrupId] = useState("");
  const showEmailIcon = useSelector(
    (state: RootState) => state.mail.showEmailIcon,
  );
  const [userDeatiles, setUserDeatiles] = useState<userType>({
    name: "",
    email: "",
    address: "",
    poneNumber: "",
    phone: "",
  });

  const [popupuserDeatils, setpopupuserDeatils] = useState<boolean>();
  useEffect(() => {
    if (location.pathname === "/pages/Dashbord") {
      navigate("/pages/Dashbord/Home", { replace: true });
    }
    getAllcustormerfuntion();
    dispatch(setShowEmailIcon(false));
    setneedTosendEmail(showEmailIcon);
  }, []);

  useEffect(() => {
    setneedTosendEmail(showEmailIcon);
  }, [showEmailIcon]);

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const groupRequest = async () => {
    setisShowGrupreq(true);
    try {
      const res = await getRequestsBymemberEmail(userEmail);
      const newNotifications = res.data.map((item: any) => ({
        id: item.grupId,
        grupAdminEmail: item.grupAdminId,
        reqestid: item.reqestId,
        email: item.memberEmail,
        grupId: item.grupId,
      }));
      setNotyficetions(newNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllcustormerfuntion = async () => {
    try {
      const custormerList = await getAllcustormer();
      const formatted = custormerList.map((c: any) => ({
        id: c._id,
        name: c.name,
        email: c.email,
        contact: c.poneNumber,
        isOnline: c.isOnline,
        address: c.address,
      }));
      setSystemMembers(formatted);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(
      "backend-updated",
      async (data: { message: string; type: any; email?: string }) => {
        console.log("Received socket event type:", data.type);

        if (
          data.type === "CUSTOMER_ADDED" ||
          data.type === "SHOCKET_DISCONECTED" ||
          data.type === "NEW_GRUP_ADD" ||
          data.type === "UPDATE_AS_OFFLINE"
        ) {
          getAllcustormerfuntion();
        } else if (data.type === "NEW_MEMBER_ADD_TO_THE_GRUP") {
          try {
            const res = await getRequestsBymemberEmail(userEmail);
            const newNotifications = res.data.map((item: any) => ({
              id: item.grupId,
              grupAdminEmail: item.grupAdminId,
              reqestid: item.reqestId,
              email: item.memberEmail,
              grupId: item.grupId,
            }));
            setNotyficetions(newNotifications);
          } catch (error) {
            console.error(error);
          }
        } else if (data.type === "CUSTOMER_ONLINE") {
          const onlineUserEmail = data.email;

          if (onlineUserEmail && onlineUserEmail !== userEmail) {
            console.log(
              `🔔 New user came online: ${onlineUserEmail}. Refreshing sidebar...`,
            );
            getAllcustormerfuntion();
          }
        }
      },
    );

    return () => {
      socket.off("backend-updated");
    };
  }, [socket, userEmail]);

  useEffect(() => {
    console.log("👥 [STATE UPDATED] Current Active Members:", systemMembers);
  }, [systemMembers]);

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
    {
      path: "Vidiocoll",
      name: "Grup meeting",
      icon: <AiOutlineInfoCircle />,
    },
    { path: "AboutUs", name: "About Us", icon: <AiOutlineInfoCircle /> },
  ];

  // const DoubleClickExample = () => {
  // const handleDoubleClick = () => {
  // };

  const [showNotificationBar, setshowNotificationBar] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user: any) => {
    const currentPath = location.pathname;
    console.log(`Clicked User: ${user.name} | Current Path: ${currentPath}`);
    if (currentPath.endsWith("pages/Dashbord/CurrentgroupDetails")) {
      actionForGroupManagement(user);
    } else if (currentPath.endsWith("pages/Dashbord/Grupmanagement")) {
      actionForAdmemberAsGrupInitialais(user);
    } else if (currentPath.endsWith("/payments")) {
      actionForMakePayment(user);
    }
  };

  const actionForGroupManagement = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const actionForAdmemberAsGrupInitialais = (user: any) => {
    updateMyData(user);

    // console.log(user.contact + "=======================0000000000");
  };

  const actionForMakePayment = (user: any) => {
    console.log(user);
    // alert(`now page and clik member : Make Payment  : ${user.name}`);
  };

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
      dispatch(logoutCustomer());
      navigate("/", { replace: true });
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
    });
  };

  const clikNotyfy = () => {
    setshowNotificationBar(!showNotificationBar);
  };

  const paymentReminder = () => {
    setisShowGrupreq(true);
  };

  const groupCreated = () => {
    setisShowGrupreq(true);
  };
  const [isShowEmail, setisShowEmail] = useState<boolean>(false);
  // ========================================================
  const clickForsendEmail = async () => {
    const grupIde: any = localStorage.getItem("userSelectGrupIdForMeeting");
    setgrupId(grupIde);
    if (isShowEmail) {
      setisShowEmail(false);
    } else {
      setisShowEmail(true);
    }
  };

  const clickDuble = (user: any) => {
    // alert(user.address);
    const selectMember: userType = {
      name: user.name ?? "",
      email: user.email ?? "",
      address: user.address ?? "",
      poneNumber: user.contact ?? "",
      phone: user.phone ?? "",
    };
    setUserDeatiles(selectMember);
    setpopupuserDeatils(true);
  };

  // =========================================================

  const closed = () => {
    setpopupuserDeatils(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 sticky top-0 z-50 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/20">
            <span className="text-white font-bold text-sm tracking-wider">
              SL
            </span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-wider">
            SEETU LANKA
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* =========================================================== */}
          {needTosendEmail && (
            <div
              className="relative cursor-pointer"
              onClick={clickForsendEmail}
            >
              <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <MdSend size={22} className="text-gray-600" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] min-w-[5px] h-[5px] rounded-full flex items-center justify-center font-bold shadow-sm shadow-red-500/30"></span>
            </div>
          )}
          {/* ====================================================== */}
          <div className="relative cursor-pointer" onClick={clikNotyfy}>
            {/* <p className="text-transparent">{userData}</p> */}
            <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <AiOutlineBell size={22} className="text-gray-600" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-sm shadow-red-500/30">
              {notificetions.length}
            </span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow-md shadow-blue-500/20">
              {userName.charAt(0)}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                {userName}
              </p>
              <p className="text-xs text-gray-400">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>
      {/* Notification Sidebar */}
      <div
        className={`w-[320px] h-[calc(100vh-4rem)] bg-white border-l border-gray-200 shadow-xl fixed right-0 top-16 z-40 overflow-y-auto transition-all duration-300 ${
          showNotificationBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
              <p className="text-xs text-gray-400">
                Recent updates and requests
              </p>
            </div>
            <button
              onClick={clikNotyfy}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <AiOutlineMenu className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div
            onClick={groupRequest}
            className="p-4 rounded-xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100 transition-all hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                <AiOutlineTeam className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  New Group Request
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Kavindu joined Seettu Group #12
                </p>
                <p className="text-[10px] text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>

          <div
            onClick={paymentReminder}
            className="p-4 rounded-xl bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-all hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                <AiOutlineCreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  Payment Reminder
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Monthly payment due tomorrow
                </p>
                <p className="text-[10px] text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>

          <div
            onClick={groupCreated}
            className="p-4 rounded-xl bg-green-50 border border-green-100 cursor-pointer hover:bg-green-100 transition-all hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                <AiOutlineHome className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  Group Created
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Your new group was created successfully
                </p>
                <p className="text-[10px] text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SendNotyfy
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
      <GrupReqest
        isShow={isShowGrupreq}
        userEmail={userEmail}
        onClose={() => setisShowGrupreq(false)}
        reque={notificetions}
      />
      {/* ============================ */}
      {isShowEmail && (
        <EmailModal
          isShow={true}
          onClose={() => {}}
          groupId={grupId}
          onSend={() => {}}
        />
      )}
      {/* =============user deatils modal============= */}
      {/* <MemberDetailsModal /> */}
      <MemberDetailsModal
        isOpen={popupuserDeatils || false}
        onClose={closed}
        member={userDeatiles}
      />
      ;{/* =================================== */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <nav className="w-64 h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex flex-col bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
                {userName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  {userName}
                </p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>

          <div className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  replace={true}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  <span
                    className={`text-lg ${isActive ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-6 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-3 border-t border-gray-100">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <AiOutlineLogout className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-amber-500 p-2 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-10xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar - Active Users */}
        <aside className="w-72 bg-white h-[calc(100vh-4rem)] sticky top-16 hidden xl:flex flex-col border-l border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
                Active Users
              </h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                {systemMembers.filter((u: any) => u.isOnline).length} online
              </span>
            </div>
          </div>

          <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
            {systemMembers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                  <AiOutlineUser className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm text-gray-400">No users available</p>
              </div>
            ) : (
              systemMembers.map((user: any) => (
                <div onDoubleClick={() => clickDuble(user)}>
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm text-white ${
                            user.isOnline
                              ? "bg-gradient-to-br from-green-500 to-green-600 shadow-md shadow-green-500/20"
                              : "bg-gray-400"
                          }`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm shadow-green-500/30"></span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    {user.isOnline && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
