import {
  faUsers,
  faBlog,
  faRobot,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { Outlet, Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

const ALLOWED_ROLES_MANAGEMENT = ["ADMIN", "MANAGER"];
const ALL_ROLES = ["ADMIN", "MANAGER", "USER"];

const Home2 = () => {
  const navItems = [
    {
      path: "/user",
      icon: faUsers,
      label: "User manegement",
      color: "from-blue-500 to-blue-700",
      role: ALLOWED_ROLES_MANAGEMENT,
    },
    {
      path: "/blog",
      icon: faBlog,
      label: "Add your blog",
      color: "from-pink-500 to-pink-700",
      role: ALL_ROLES,
    },
    {
      path: "/ai",
      icon: faRobot,
      label: "AI Assistant",
      color: "from-green-500 to-green-700",
      role: ALL_ROLES,
    },
    {
      path: "/Intro",
      icon: faHome,
      label: "Home",
      color: "from-orange-500 to-orange-700",
      role: ALL_ROLES,
    },
  ];

  const navigate = useNavigate();

  function handleLogout(): void {
    navigate("/", { replace: true });
  }

  return (
    <div className="w-screen h-screen bg-slate-950 overflow-hidden">
      {/* Navbar */}
      <aside className="w-full h-24 bg-slate-900 border-b border-slate-700 shadow-xl flex items-center justify-between px-8">
        {/* Left Side */}
        <div className="flex gap-5">
          {navItems.map((item, index) => {
            const role = "ADMIN";
            // methan roll eka anuwa  option show wenna hadapu logik eka
            if (!item.role.includes(role)) {
              return null;
            }

            return (
              <Link
                key={index}
                to={item.path}
                replace
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${item.color}
                text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl
                transition-all duration-300`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 rounded-2xl
          bg-gradient-to-r from-red-500 to-red-700
          text-white font-semibold shadow-lg
          hover:scale-105 hover:shadow-2xl
          transition-all duration-300"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />

          <span>Log out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="w-full h-[calc(100vh-96px)] bg-gradient-to-br from-slate-800 via-slate-900 to-black overflow-auto">
        <div className="w-full h-full p-6">
          <div className="w-full h-full rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-700 shadow-2xl overflow-auto">
            <Outlet />
            {/* /pages/... routes වල child components ටික මෙතන render කරන්න කියන එක. */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home2;
