import { useState } from "react";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Member",
  });

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserMenuOpen(false);
  };
  

  // Logout handler
  const handleLogout = () => {
    // Clear user session/data
    setIsLoggedIn(false);
    setUser(Object);
    setUserMenuOpen(false);
    setOpen(false);

    // Optional: Clear any stored tokens
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("user");

    // Optional: Redirect to home or login page
    // window.location.href = "/";
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Smart Seettu
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
            <li>
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                Members
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                Payments
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Auth Section - Desktop */}
          <div className="hidden md:block">
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-gray-200">{user?.name}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm text-gray-300">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-amber-500 mt-1">
                        {user?.role}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md text-white border-t border-gray-800">
            <ul className="flex flex-col items-center gap-4 py-6">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Members
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>

              <div className="w-full px-6 mt-2">
                {!isLoggedIn ? (
                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-2 rounded-lg transition-all"
                  >
                    Login
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-sm text-gray-300">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-5 py-2 rounded-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
