import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginCustomer } from "../redux/slice/customerSlice";
import Swal from "sweetalert2";
import { loginfuntion } from "../service/auth";
import { LogOut } from "lucide-react";
// import { type CurrentCustomerObject } from "../types/types";

import userIcon from "../assets/image/userIcon.png";
import {
  faBox,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { registere, setOffline, setOnline } from "../service/user";
import { useSocket } from "../context/SocketContext";
interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nic: string;
  poneNumber: string;
  address: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  nic?: string;
  poneNumber?: string;
  address?: string;
  submit?: string;
}

// mewa thamai inputs fild wala thiyenna name attribute ekata enna puluwan values
type FormFields =
  | "name"
  | "email"
  | "password"
  | "confirmPassword"
  | "nic"
  | "poneNumber"
  | "address";

export interface loginDeatils {
  email: string;
  password: string;
}

const Header = ({ sections }: { sections: any }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowUserIcon, setisShowUserIcon] = useState(false);
  const [isLoginSuccsesres, setisLoginSuccsesres] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    console.log(isShowUserIcon);
  }, [isShowUserIcon]);

  useEffect(() => {
    const checkTokens = async () => {
      if (
        localStorage.getItem("ACCESS_TOKEN") ||
        localStorage.getItem("REFRESH_TOKEN")
      ) {
        setisShowUserIcon(true);
        setisLoginSuccsesres(true);
      } else {
        setisShowUserIcon(false);
        setisLoginSuccsesres(false);
      }
    };
    checkTokens();
  });

  // ======================================v==
  const c = localStorage.getItem("currentCustomer");

  const parsedCustomer = c ? JSON.parse(c) : null;

  const [userName, setUserName] = useState(parsedCustomer?.name || "User");
  // =======================================-------------------------------------

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nic: "",
    poneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isClickRegister, setIsClickRegister] = useState(false);

  const [isagrementShoe, setagrementshow] = useState(false);

  const [isClikBackground, setisClikBackground] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const showLoginmodal = () => {
    setIsLoggedIn(true);
  };

  const iconClikAgrement = () => {
    setagrementshow(true);
    setisClikBackground(true);
  };
  // =======================cath from lissing =====================
  // useEffect(() => {
  //   if (!socket) {
  //     console.log("SOCKET STATUS: thawama conect wela na !");
  //     return;
  //   }

  //   console.log(
  //     "SOCKET STATUS: Socket hariyatama connect wela thinnen Listening...",
  //   );

  //
  //   socket.on("backend-updated", (data: { message: string,type:string }) => {
  //     // alert("Backend masege eka awa " + data.message);

  //     alert(data.type);
  //   });

  //   return () => {
  //     socket.off("backend-updated");
  //   };
  // }, [socket]);

  // =================================================

  const reqestFromseverTologinfunshion = async () => {
    if (email == "" || password == "") {
      Swal.fire({
        title: "⚠️ Incomplete Form",
        text: "Please fill in all required fields before submitting.",
        icon: "error",
        iconColor: "#dc3545",
        confirmButtonText: "Continue",
        confirmButtonColor: "#dc3545",
        background: "#fefefe",
        showConfirmButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          confirmButton: "swal-custom-btn",
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.borderRadius = "12px";
            popup.style.fontFamily = "'Inter', system-ui, sans-serif";
          }
        },
      });
      return;
    }

    try {
      const respons = await loginfuntion(email, password);

      if (respons.status === 200) {
        console.log(respons.data.data.email);
        console.log(respons.data.data.name);
        console.log(respons.data.data.poneNumber);

        const newCustormer = {
          id: respons.data.data.id,
          email: respons.data.data.email,
          name: respons.data.data.name,
          phone: respons.data.data.poneNumber,
        };

        // -----------redux stor eke curent user deatils save karanawa logwenakotama---------------------
        dispatch(loginCustomer(newCustormer));

        localStorage.setItem("ACCESS_TOKEN", respons.data.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", respons.data.data.refreshToken);

        Swal.fire({
          title: "Login succsessfully",
          text: "",
          icon: "success",
          iconColor: "#00BFFE",
          confirmButtonText: "Continue",
          confirmButtonColor: "#dc3545",
          background: "#fefefe",
          showConfirmButton: true,
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: true,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            confirmButton: "swal-custom-btn",
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.style.borderRadius = "12px";
              popup.style.fontFamily = "'Inter', system-ui, sans-serif";
            }
          },
        });

        // =================================================/  update stetus  from usin api coll
        const onlineStatusResponse = await setOnline(email);
        console.log("Online status updated:", onlineStatusResponse);
        console.log("Login response:", respons.data);
        console.log("=======================================================");
        setUserName(respons.data.data.name);

        if (
          localStorage.getItem("ACCESS_TOKEN") ||
          localStorage.getItem("REFRESH_TOKEN")
        ) {
          await setisShowUserIcon(true);
        }
        await setIsLoggedIn(false);
        await setEmail("");
        await setpassword("");
      } else if (respons.status === 429) {
        Swal.fire({
          title: "Too Many Requests",
          text: "You have made too many login attempts. Please try again after some time.",
          icon: "error",
          iconColor: "#dc3545",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#6c757d",
          background: "#fefefe",
          showConfirmButton: true,
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: true,
          timer: 5000,
          timerProgressBar: true,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            confirmButton: "swal-custom-btn",
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.style.borderRadius = "12px";
              popup.style.fontFamily = "'Inter', system-ui, sans-serif";
            }
          },
        });
        const offlineStatusResponse = await setOffline(email);
        await setisShowUserIcon(false);

        return;
      }
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status?: number }).status === 429
      ) {
        Swal.fire({
          title: "Too Many Requests",
          text: "You have made too many login attempts. Please try again after some time.",
          icon: "error",
          iconColor: "#dc3545",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#6c757d",
          background: "#fefefe",
          showConfirmButton: true,
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: true,
          timer: 5000,
          timerProgressBar: true,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            confirmButton: "swal-custom-btn",
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.style.borderRadius = "12px";
              popup.style.fontFamily = "'Inter', system-ui, sans-serif";
            }
          },
        });
      }
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const closeLoginFromBackground = () => {
    setIsLoggedIn(false);
  };

  const registerHeader = () => {
    setIsLoggedIn(false);
    setIsClickRegister(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as FormFields;
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.nic.trim()) {
      newErrors.nic = "NIC is required";
    }

    if (!formData.poneNumber.trim()) {
      newErrors.poneNumber = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const clearForm = () => {
    const emtyObject = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nic: "",
      poneNumber: "",
      address: "",
    };
    setFormData(emtyObject);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // i removed the confirm password brfore sending data to api
      const { confirmPassword, ...dataToSend } = formData;
      if (isChecked) {
        const response = await registere(
          dataToSend.name,
          dataToSend.email,
          dataToSend.password,
          dataToSend.nic,
          dataToSend.poneNumber,
          dataToSend.address,
        );

        if (response?.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "ඔබගේ ලියාපදිංචිය සාර්ථකයි!",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#f59e0b",
          });
          setIsClickRegister(false);
          clearForm();
          setErrors({
            submit: null,
          });
        } else {
          setErrors({
            submit: response?.data?.message || "Something went wrongs",
          });
        }
      } else {
        Swal.fire({
          title: "Attention Please!",
          text: "Please agree to the Terms and Conditions of the website before proceeding.",
          icon: "warning",
          confirmButtonText: "I Agree",
          confirmButtonColor: "#f59e0b",
        });
      }
    } catch (error) {
      setErrors({
        submit: error?.response?.data?.message || "Something went wrongs77",
      });
    } finally {
      setIsLoading(false);
      setIsChecked(false);
    }
  };

  const handleLoginRedirect = () => {
    setIsClickRegister(false);
    setIsLoggedIn(true);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up initiated");
  };

  const navItems = [
    {
      targetSection: "customers-section",
      icon: faUsers,
      label: "Customers",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      targetSection: "items-section",
      icon: faBox,
      label: "Items",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      targetSection: "orders-section",
      icon: faShoppingCart,
      label: "Orders",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  const clilUserIcon = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    const currentCustomer = localStorage.getItem("currentCustomer");
    const emailuser: string = currentCustomer
      ? JSON.parse(currentCustomer).email
      : "";

    const offlineStatusResponse = await setOffline(emailuser);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("currentCustomer");
    localStorage.removeItem("curentGrupId");

    setisShowUserIcon(false);
    setUserName("User");
    setShowLogoutModal(false);
  };

  const setOfflinef = async () => {
    const currentCustomer = localStorage.getItem("currentCustomer");
    const emailuser: string = currentCustomer
      ? JSON.parse(currentCustomer).email
      : "";

    const offlineStatusResponse = await setOffline(emailuser);
  };

  // -----------------------------
  const setOnline1 = async () => {
    const currentCustomer = localStorage.getItem("currentCustomer");
    const emailuser: string = currentCustomer
      ? JSON.parse(currentCustomer).email
      : "";

    if (emailuser == "") {
    } else {
      const offlineStatusResponse = await setOnline(emailuser);
    }
  };

  // ====================================

  // useEffect(() => {
  //   setOnline1();

  //   const handleTabClose = (event: BeforeUnloadEvent) => {
  //     console.log("Tab is closing");
  //     setOfflinef();

  //     event.preventDefault();
  //   };

  //   window.addEventListener("beforeunload", handleTabClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleTabClose);
  //   };
  // });

  // ====================================

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Smart Seettu
            </h1>
          </div>

          <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
            <li>
              <Link
                to={sections[0].id}
                className="hover:text-amber-400 transition-colors duration-200"
                smooth={true}
                offset={-70}
                duration={500}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={sections[1].id}
                className="hover:text-amber-400 transition-colors duration-200"
                smooth={true}
                offset={-70}
                duration={500}
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                to={sections[2].id}
                className="hover:text-amber-400 transition-colors duration-200"
                smooth={true}
                offset={-70}
                duration={500}
              >
                Payments
              </Link>
            </li>
            <li>
              <Link
                to={sections[0].id}
                className="hover:text-amber-400 transition-colors duration-200"
                smooth={true}
                offset={-70}
                duration={500}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={sections[1].id}
                className="hover:text-amber-400 transition-colors duration-200"
                smooth={true}
                offset={-70}
                duration={500}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={sections[0].id}
                className="hover:text-amber-400 transition-colors duration-200"
                smooth={true}
                offset={-70}
                duration={500}
              >
                Contact
              </Link>
            </li>
          </ul>

          <button
            onClick={showLoginmodal}
            className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
              isLoginSuccsesres ? "hidden" : "block"
            }`}
          >
            Login
          </button>
          {isShowUserIcon && (
            <div
              onClick={clilUserIcon}
              className="flex flex-col items-center justify-center gap-2 w-auto"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-emerald-600 rounded-full overflow-hidden">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h6 className="text-sm sm:text-base md:text-lg font-medium text-center">
                {userName}
              </h6>
            </div>
          )}

          {/* ================================================ */}
          {isLoggedIn && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={closeLoginFromBackground}
            >
              <div
                className="w-full max-w-md bg-slate-900 border border-gray-700 flex flex-col gap-4 p-8 rounded-3xl mx-4 shadow-2xl text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold text-amber-400">
                  Please Login
                </h3>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 font-semibold text-sm">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded focus:outline-amber-500"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 font-semibold text-sm">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded focus:outline-amber-500"
                    type="password"
                    placeholder="password"
                  />
                </div>

                <a
                  className="text-amber-400 text-sm hover:underline self-start"
                  href="#"
                >
                  Forgot password?
                </a>

                <button
                  type="button"
                  onClick={reqestFromseverTologinfunshion}
                  className={`bg-amber-500 hover:bg-amber-600 transition-colors py-2 rounded  text-black font-bold mt-2 `}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="bg-transparent border border-amber-500 text-amber-400 font-semibold py-2 rounded hover:bg-amber-500/10 transition-colors"
                  onClick={registerHeader}
                >
                  Register for free
                </button>
              </div>
            </div>
          )}

          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

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
            </ul>
          </div>
        )}

        {/* ==============main logout========================== */}
        {showLogoutModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setShowLogoutModal(false)}
          >
            <div
              className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">Logout</h3>
                    <p className="text-red-200/90 text-sm">
                      Profile session control
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl p-5 mb-5 border border-gray-600/30 shadow-inner">
                  <div className="flex items-center gap-4">
                    {/* Avatar with online status */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-500/50 flex items-center justify-center shadow-lg">
                        <img
                          src={userIcon}
                          alt="Profile"
                          className="w-14 h-14 object-cover rounded-full"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-gray-800 rounded-full animate-pulse"></span>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <p className="text-white font-semibold text-lg">
                        {userName || "John Doe"}
                      </p>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {email || "john@email.com"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          ● Online
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Details Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-gray-800/40 p-2.5 rounded-lg border border-gray-700/30">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Member ID
                      </p>
                      <p className="text-white text-sm font-medium">
                        #USR-2026-001
                      </p>
                    </div>
                    <div className="bg-gray-800/40 p-2.5 rounded-lg border border-gray-700/30">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Role
                      </p>
                      <p className="text-white text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        Admin
                      </p>
                    </div>
                    <div className="bg-gray-800/40 p-2.5 rounded-lg border border-gray-700/30">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Joined
                      </p>
                      <p className="text-white text-sm font-medium">Jan 2026</p>
                    </div>
                    <div className="bg-gray-800/40 p-2.5 rounded-lg border border-gray-700/30">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Groups
                      </p>
                      <p className="text-white text-sm font-medium">5 Active</p>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-500 text-lg">⚠️</span>
                    </div>
                    <div>
                      <p className="text-amber-400 font-medium text-sm">
                        Are you sure you want to logout?
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        You will need to login again to access your account and
                        groups.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dual Logout Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-xl transition-all duration-200 hover:shadow-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>

                {/* Additional small logout option */}
                <div className="mt-3 text-center">
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    Or click here to logout immediately
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ===================================================================== */}
        {isClickRegister && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl my-8 border border-gray-700">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
                <h2 className="text-3xl font-bold text-amber-400 text-center">
                  Create Account
                </h2>

                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-center text-sm">
                    {errors.submit}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.name ? "border-red-500 focus:outline-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-0.5">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.email ? "border-red-500 focus:outline-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-0.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="nic"
                  >
                    Nic
                  </label>
                  <input
                    id="nic"
                    name="nic"
                    type="text"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder="Your NIC Number"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.nic ? "border-red-500 focus:outline-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.nic && (
                    <p className="text-red-400 text-xs mt-0.5">{errors.nic}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="poneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="poneNumber"
                    name="poneNumber"
                    type="text"
                    value={formData.poneNumber}
                    onChange={handleChange}
                    placeholder="077XXXXXXXX"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.poneNumber
                        ? "border-red-500 focus:outline-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.poneNumber && (
                    <p className="text-red-400 text-xs mt-0.5">
                      {errors.poneNumber}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your Address"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.address
                        ? "border-red-500 focus:outline-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-xs mt-0.5">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.password
                        ? "border-red-500 focus:outline-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-0.5">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-300 font-semibold text-sm"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`bg-gray-900 text-white border border-gray-700 px-3 h-10 rounded focus:outline-amber-500 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:outline-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-0.5">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* ========================== */}

                <div className="flex items-start gap-7 p-4 bg-gray-50 border border-gray-200 rounded-lg w-[100%] mb-4 flex justify-evenly items-center">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    name="terms_agreement"
                    value="accepted"
                    required
                    checked={isChecked}
                    onChange={() => setIsChecked(true)}
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="className-sm text-gray-600 leading-relaxed flex flex-column justify-center items-center text-[9px] gap-1">
                    <a
                      href="#"
                      className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
                    >
                      Terms and Conditions
                    </a>
                    ...
                  </span>

                  <svg
                    onClick={iconClikAgrement}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                    cursor-pointer
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>

                {/* ============================== */}

                {isagrementShoe && (
                  <div
                    // onClick={chekIsClickBackground}

                    onClick={() => setisClikBackground(false)}
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-sm animate-fade-in ${isClikBackground ? "block" : "hidden"}`}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col border-t-8 border-blue-600 overflow-hidden"
                    >
                      {/* Header Section */}
                      <div className="p-6 border-b border-gray-100 bg-gray-50/50 text-center">
                        <h1 className="text-2xl font-black text-blue-600 tracking-wider">
                          LANKA SEETU
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">
                          විශ්වාසවන්ත සහ විනිවිදභාවයෙන් යුතු ඩිජිටල් සීට්ටු
                          වේදිකාව
                        </p>

                        <div className="mt-4">
                          <h2 className="text-lg font-bold text-gray-800">
                            නියමයන් සහ කොන්දේසි (Terms & Conditions)
                          </h2>
                          <p className="text-xs italic text-gray-400 mt-0.5">
                            කරුණාකර ඉදිරියට යාමට පෙර මෙම නිල ගිවිසුම හොඳින්
                            කියවා තේරුම් ගන්න.
                          </p>
                        </div>
                      </div>

                      <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-600 leading-relaxed text-justify">
                        <div>
                          <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-1 mb-2">
                            1. සීට්ටු ක්‍රියාවලිය හැඳින්වීම (System Process)
                          </h3>
                          <p>
                            Lanka Seetu යනු සාමාජිකයින් පිරිසක් එකතු වී,
                            අන්‍යෝන්‍ය විශ්වාසය මත මාසිකව ස්ථාවර මුදලක් එකතු කර,
                            භ්‍රමණ ක්‍රමයකට (Rotating Payout) අනුව එක් එක්
                            සාමාජිකයාට මුළු මුදල ලබාදෙන පද්ධතියකි.
                          </p>

                          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs">
                            <div>
                              <span className="font-bold text-blue-600">
                                • සමූහය හැදීම (Group Formation):
                              </span>{" "}
                              නිශ්චිත සාමාජිකයින් සංඛ්‍යාවක් (උදා: 10, 20, 50)
                              එක්ව සමූහයක් සාදා ගනී.
                            </div>
                            <div>
                              <span className="font-bold text-blue-600">
                                • මාසික දායකත්වය (Monthly Collection):
                              </span>{" "}
                              සෑම සාමාජිකයෙක්ම සෑම මාසයකම නියමිත දිනට පෙර එක හා
                              සමාන මුදලක් (උදා: රු. 10,000) ලබා දිය යුතුය.
                            </div>
                            <div>
                              <span className="font-bold text-blue-600">
                                • මුදල් ලබාදීම (Monthly Payout):
                              </span>{" "}
                              එකතු වන මුළු මුදල (Total Pool - උදා: රු. 100,000)
                              ක්‍රමවේදයට අනුව (ස්ථාවර අනුපිළිවෙල, ලොතරැයි හෝ
                              වෙන්දේසි ක්‍රමයට) සෑම මාසයකදීම එක් අයෙකුට බැගින්
                              ලබා දේ.
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-1 mb-2">
                            2. නායකයාගේ වගකීම (Leader Role)
                          </h3>
                          <ul className="list-disc pl-5 space-y-1.5">
                            <li>
                              සමූහයේ සියලුම සාමාජිකයින්ගෙන් නියමිත වේලාවට මුදල්
                              එකතු කිරීම සහ කළමනාකරණය.
                            </li>
                            <li>
                              මුදල් ලබාදෙන අනුපිළිවෙල (Turn Order)
                              විනිවිදභාවයකින් යුතුව සකස් කිරීම.
                            </li>
                            <li>
                              සීට්ටු වාර්තා (Ledger / Records) නිවැරදිව තබා
                              ගැනීම.
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-red-50/70 border-l-4 border-red-500 rounded-r-xl space-y-2">
                          <h4 className="font-bold text-red-700 text-sm">
                            ⚠️ විශේෂ නීතිමය නිවේදනය සහ අවවාදයයි (Legal Warning)
                          </h4>
                          <p className="text-xs text-gray-700">
                            <span className="font-bold text-black">
                              මුදල් වංචා කිරීම සහ අතරමඟින් හැර යාම:
                            </span>{" "}
                            යම් සාමාජිකයෙකු තමාගේ වාරය පැමිණි විට සීට්ටු මුදල්
                            ලබා ගැනීමෙන් පසු, ඉදිරි මාස සඳහා අදාළ මාසික මුදල්
                            ගෙවීම පැහැර හැරීම හෝ සමූහයෙන් ඉවත් වීම{" "}
                            <span className="font-bold text-red-600">
                              දඬුවම් ලැබිය හැකි බරපතල මූල්‍ය වංචාවකි.
                            </span>
                          </p>
                          <p className="text-xs text-gray-700">
                            එවැනි අසාධාරණ සහ නීතිවිරෝධී ක්‍රියාවකදී, අදාළ සමූහයේ
                            (Group) සිටින{" "}
                            <span className="font-bold text-black">
                              ඕනෑම සාමාජිකයෙකුට හෝ නායකයෙකුට වංචා කළ පුද්ගලයාට
                              එරෙහිව ශ්‍රී ලංකා නීතිය යටතේ සිවිල් සහ අපරාධ නඩු
                              පැවරීම ඇතුළු නීතිමය පියවර (Legal Action) ගැනීමට
                              පූර්ණ අයිතිය ඇත.
                            </span>
                          </p>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-1 mb-2">
                            3. සාමාජික කොන්දේසි (Member Rules)
                          </h3>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>
                              <span className="font-bold text-black">
                                පූර්ණ කාලීන රැඳී සිටීම:
                              </span>{" "}
                              Lanka Seetu වෙබ් අඩවියට ලියාපදිංචි වන සහ සීට්ටු
                              සමූහයකට එකතු වන සෑම පුද්ගලයෙකුම, අදාළ සීට්ටු වටය
                              ආරම්භයේ සිට{" "}
                              <span className="font-bold text-black">
                                එහි සම්පූර්ණ ක්‍රියාවලිය අවසන් වන තෙක් (අවසන්
                                මාසය/වාරය දක්වා)
                              </span>{" "}
                              සමූහයේ රැඳී සිටිමින් දායකත්වය දැක්වීමට නීතිමය
                              වශයෙන් බැඳී සිටී.
                            </li>
                            <li>
                              <span className="font-bold text-black">
                                කාලීන ගෙවීම්:
                              </span>{" "}
                              සෑම සාමාජිකයෙකුම තමාට මුදල් ලැබුණත්, නොලැබුණත්
                              නායකයා විසින් නියම කරනු ලබන දිනට පෙර තමාගේ මාසික
                              වාරිකය ගෙවා අවසන් කළ යුතුය.
                            </li>
                            <li>
                              <span className="font-bold text-black">
                                විනිවිදභාවය:
                              </span>{" "}
                              වංචනික තොරතුරු සැපයීම හෝ සාමාජිකයින් නොමඟ යැවීම
                              සපුරා තහනම් වන අතර, එවැනි අවස්ථාවකදී ගිණුම
                              අත්හිටුවීමට වෙබ් අඩවියට අයිතිය ඇත.
                            </li>
                          </ol>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-1 mb-2">
                            4. වගකීම් ලිමිතය (Disclaimer)
                          </h3>
                          <p>
                            Lanka Seetu යනු සාමාජිකයින් අතර සම්බන්ධීකරණය පහසු
                            කරන ඩිජिटल තාක්ෂණික වේදිකාවක් (Platform) පමණි.
                            සාමාජිකයින් අතර ඇති වන පුද්ගලික මූල්‍ය ගනුදෙනු සහ
                            විශ්වාසය පිළිබඳව පාරිභෝගිකයින් වගබලා ගත යුතු අතර,
                            යම් පැහැර හැරීමකදී සාමාජිකයින්ට නීතිමය ක්‍රියාමාර්ග
                            වෙත යොමු විය හැක.
                          </p>
                        </div>
                      </div>

                      <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
                        <label className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl cursor-pointer select-none">
                          <input
                            type="checkbox"
                            // checked={isAgreed}
                            // onChange={(e) => setIsAgreed(e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="text-xs text-gray-700 leading-normal">
                            මම "Lanka Seetu" හි ඉහත සඳහන් සියලුම නියමයන්,
                            කොන්දේසි සහ නීතිමය රීති කියවා හොඳින් තේරුම් ගතිමි.
                            සීට්ටු වටය අවසන් වනතුරු එහි රැඳී සිටීමටත්, නීති
                            විරෝධී ලෙස හැර යාමකදී මට එරෙහිව නීතිමය පියවර ගත හැකි
                            බවටත් මම එකඟ වෙමි.
                          </span>
                        </label>

                        <div className="flex gap-3 justify-end">
                          <button
                            // onClick={}
                            className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"
                          >
                            Cancel
                          </button>
                          <button
                            // disabled={}
                            // onClick={() => {
                            //   if (isAgreed) {
                            //     onAccept();
                            //     onClose();
                            //   }
                            // }}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl shadow-md disabled:shadow-none transition"
                          >
                            මම එකඟ වෙමි (Accept & Continue)
                          </button>
                        </div>

                        <p className="text-center text-[10px] text-gray-400 border-t border-gray-200/60 pt-3">
                          &copy; 2026 Lanka Seetu. All Rights Reserved. |
                          ආරක්ෂිත සහ විධිමත් සීට්ටු ක්‍රමවේදයක් සඳහා.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-500 h-10 w-full rounded hover:bg-amber-600 transition-colors text-black font-bold text-md mt-2 disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </button>

                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="bg-transparent border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500/10 transition-colors h-10 text-sm"
                >
                  Already have an account? Login
                </button>

                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>

                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-gray-800 text-gray-400">OR</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="bg-white h-10 w-full rounded hover:bg-gray-100 transition-colors text-gray-800 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
