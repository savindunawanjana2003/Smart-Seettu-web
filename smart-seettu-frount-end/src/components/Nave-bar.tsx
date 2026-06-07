import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userMenuOpen, setUserMenuOpen] = useState(false);

  // ====================================
  // const [user, setUser] = useState({
  //   name: "John Doe",
  //   email: "john@example.com",
  //   role: "Member",
  // });

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
    // setUserMenuOpen(false);
  };

  // // Logout handler
  // const handleLogout = () => {
  //   // Clear user session/data
  //   setIsLoggedIn(false);
  //   setUser(Object);
  //   // setUserMenuOpen(false);
  //   setOpen(false);

  //   // Optional: Clear any stored tokens
  //   localStorage.removeItem("authToken");
  //   sessionStorage.removeItem("user");

  //   // Optional: Redirect to home or login page
  //   // window.location.href = "/";
  // // };

  const closeLoginFromBackground = () => {
    setIsLoggedIn(false);
  };

  // =================================

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
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Login
          </button>
          {isLoggedIn && (
            <div
              className="fixed inset-0 bg-transparent/20 z-50 flex items-center justify-center "
              onClick={closeLoginFromBackground}
            >
              <div
                className="w-full lg:h-[60vh] sm:w-[80vw] sm:h-[70vh] md:h-[70vh] max-w-md md:max-w-xl bg-cyan-950 flex flex-col gap-1 p-6 sm:p-10 md:pl-11 border rounded-3xl mx-auto w-25px h-[50vh] mt-10 mb-10 ml-5 mr-5"
                onClick={(e) => e.stopPropagation()}
              >
                <label
                  htmlFor=""
                  className=" sm:text-4xl md:text-4xl pt-1 sm:p:7"
                >
                  Please Login
                </label>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-amber-50 text-light font-bold text-xl"
                    htmlFor=""
                  >
                    Email
                  </label>
                  <input
                    className="bg-amber-50 w-[90%] text-gray-950 pl-2 h-[6vh] rounded"
                    type="email"
                    placeholder=" email"
                    part="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-amber-50 text-light font-bold text-xl"
                    htmlFor=""
                  >
                    Password
                  </label>
                  <input
                    className="bg-amber-50 w-[90%] text-gray-950 pl-2  h-[6vh] border rounded"
                    type="password"
                    placeholder="password"
                  />
                </div>
                <a className="text-sky-600 text-xl" href="#">
                  Forgot password?
                </a>
                <button
                  type="button"
                  className="btn btn-outline-primary bg-amber-300  h-[6vh] w-[90%] border-b-blue-950 border-1 rounded hover:bg-amber-400 text-black font-bold"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary bg-transparent border-amber-400 text-amber-400 font-bold rounded border-1  h-[6vh] w-[90%]"
                >
                  Register for free
                </button>{" "}
                <span className="text-xl  h-[6vh] w-[90%] flex items-center justify-center ">
                  <h1>OR</h1>
                </span>
                <button
                  type="button"
                  className="btn btn-outline-primary bg-amber-300  h-[6vh] border-b-blue-950 border-1 rounded hover:bg-amber-400 text-black font-bold w-[90%] mb-5"
                >
                  Sign with google
                </button>
              </div>
            </div>
          )}
          {/* ====login buten ekata adala unit ekata methnata enne
           */}
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

              {/* <div className="w-full px-6 mt-2">
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
              </div> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
