import { Link, Outlet } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineInfoCircle,
  AiOutlineMail,
} from "react-icons/ai";

const Dashboard = () => {
  const navItems = [
    {
      path: "pages/A",
      name: "Home",
      icon: <AiOutlineHome className="text-xl" />,
    },
    {
      path: "pages/B",
      name: "Members",
      icon: <AiOutlineTeam className="text-xl" />,
    },
    {
      path: "/payments",
      name: "Payments",
      icon: <AiOutlineCreditCard className="text-xl" />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <AiOutlineDashboard className="text-xl" />,
    },
    {
      path: "/about",
      name: "About",
      icon: <AiOutlineInfoCircle className="text-xl" />,
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <AiOutlineMail className="text-xl" />,
    },
  ];

  return (
    <div className="flex bg-black text-[#00ff66] min-h-screen">
      {/* Sidebar */}
      <nav className="fixed h-screen w-64 bg-[#050505] border-r border-[#00ff66]/30 shadow-[0_0_25px_rgba(0,255,102,0.2)] flex flex-col">
        <div className="p-6 border-b border-[#00ff66]/20">
          <h1 className="text-2xl font-bold tracking-widest text-[#00ff66]">
            SYSTEM
          </h1>
          <p className="text-xs text-[#00ff66]/60 mt-1">ACCESS GRANTED</p>
        </div>

        <div className="flex-1 px-3 py-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="
                flex items-center gap-4
                px-4 py-3 mb-2
                rounded-md
                border border-transparent
                text-[#00ff66]/80
                hover:text-[#00ff66]
                hover:border-[#00ff66]/40
                hover:bg-[#00ff66]/10
                hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]
                transition-all duration-300
                group
              "
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>

              <span className="tracking-wide">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-[#00ff66]/20">
          <div className="text-xs text-[#00ff66]/50">STATUS: ONLINE</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="min-h-screen bg-gradient-to-br from-black via-[#050505] to-[#001a0a] p-6">
          <div className="border border-[#00ff66]/20 rounded-lg bg-black/70 backdrop-blur-sm shadow-[0_0_25px_rgba(0,255,102,0.08)] min-h-[95vh] p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
