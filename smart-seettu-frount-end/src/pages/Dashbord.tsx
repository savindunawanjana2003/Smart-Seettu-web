import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutCustomer } from "../redux/slice/customerSlice";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineInfoCircle,
  AiOutlineMail,
} from "react-icons/ai";
import Swal from "sweetalert2";

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <AiOutlineDashboard /> },
    { path: "pages/A", name: "Group Management", icon: <AiOutlineHome /> },
    { path: "pages/B", name: "Payments Status", icon: <AiOutlineTeam /> },
    { path: "/payments", name: "Make Payment", icon: <AiOutlineCreditCard /> },
    { path: "/about", name: "About Us", icon: <AiOutlineInfoCircle /> },
    { path: "/contact", name: "Contact", icon: <AiOutlineMail /> },
  ];

  const activeUsers = [
    { id: 1, name: "Kavindu Sandeepa", isOnline: true },
    { id: 2, name: "Ishan Chinthaka", isOnline: true },
    { id: 3, name: "Indummm", isOnline: true },
    { id: 4, name: "lklkl", isOnline: true },
    { id: 5, name: "Chiky Thu Marga", isOnline: true },
  ];

  // user kenek wa clik karana kota danata inna page eka anuwa  wa dakarana funshion ekak denna puluwan
  const handleUserClick = (user) => {
    const currentPath = location.pathname; // dan  lode wela thiyena url path eka ganne meken

    console.log(`Clicked User: ${user.name} | Current Path: ${currentPath}`);

    if (currentPath.endsWith("pages/A")) {
      actionForGroupManagement(user);
    } else if (currentPath.endsWith("pages/B")) {
      actionForPaymentStatus(user);
    } else if (currentPath.endsWith("/payments")) {
      actionForMakePayment(user);
    } else {
      defaultAction(user);
    }
  };

  const actionForGroupManagement = (user) => {
    alert(`now page and clik member : ${user.name}`);
  };

  const actionForPaymentStatus = (user) => {
    alert(`now page and clik member: ${user.name}`);
  };

  const actionForMakePayment = (user) => {
    alert(`now page and clik member : Make Payment  : ${user.name}`);
  };

  const defaultAction = (user) => {
    alert(`now page and clik member : View  : ${user.name}`);
  };

  const logout = () => {
    dispatch(logoutCustomer());
    Swal.fire({
      title: "Logging Out...",
      text: "Please wait a moment.",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      navigate("/", { replace: true });
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-14 sticky top-0 z-50 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 tracking-wider">
            SEETU LANKA
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

            <button
              onClick={logout}
              className="flex justify-center items-center gap-10 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Log out
            </button>
          </div>
        </nav>

        <main className="flex-1 bg-amber-50 p-4 min-h-[calc(100vh-3.5rem)] overflow-y-auto flex justify-center">
          <div className="w-[100vw] bg-amber-100 rounded-lg shadow border border-gray-200 p-2">
            <Outlet />
          </div>
        </main>

        <aside className="w-64 bg-gray-50 h-[calc(100vh-3.5rem)] sticky top-14 hidden xl:flex flex-col p-4 border-l border-gray-200 overflow-y-auto">
          <h3 className="text-gray-500 font-semibold text-sm mb-3 tracking-wide">
            Contacts / Active Users
          </h3>
          <div className="space-y-2">
            {activeUsers.map((user) => (
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
