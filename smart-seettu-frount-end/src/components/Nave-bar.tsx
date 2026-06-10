import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginfuntion } from "../service/auth";

import userIcon from "../assets/image/userIcon.png";
import {
  faBox,
  faL,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { registere } from "../service/user";
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

const Header = ({ sections }) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowUserIcon, setisShowUserIcon] = useState(false);

  // --------------------

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  // ----------------------

  // const navigate = useNavigate();

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
  const [isLoginSuccsesres, setisLoginSuccsesres] = useState(false);

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

  const chekIsClickBackground = () => {};

  // const handleChangeLogin = (e: any) => {
  // const name = e.target.name;
  // const { value } = e.target;
  // setLoginDeatiles((prev) => ({
  //   ...prev,
  //   [name]: value,
  // }));
  // };

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
          popup.style.borderRadius = "12px";
          popup.style.fontFamily = "'Inter', system-ui, sans-serif";
        },
      });
      return;
    }

    try {
      const respons = await loginfuntion(email, password);
      //    data: {
      //   email: customer?.email,
      //   accessToken,
      //   refreshToken,
      // },

      if (respons.status === 200) {
        localStorage.setItem("accessToken", respons.data.data.accessToken);
        localStorage.setItem("refreshToken", respons.data.data.refreshToken);

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
            popup.style.borderRadius = "12px";
            popup.style.fontFamily = "'Inter', system-ui, sans-serif";
          },
        });
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
            popup.style.borderRadius = "12px";
            popup.style.fontFamily = "'Inter', system-ui, sans-serif";
          },
        });
      }
    } catch (error) {
      if (error.status === 429) {
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
            popup.style.borderRadius = "12px";
            popup.style.fontFamily = "'Inter', system-ui, sans-serif";
          },
        });
      }
      console.log(error.message);
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
            <div className="w-[5vw] h-[5vw] bg-transparent-300  flex flex-col justify-center items-center">
              <div className="w-[4vw] h-[4vw] bg-amber-300 border-4 border-emerald-600 rounded-full flex justify-center items-center">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                ></img>
              </div>
              {<h6 className="text-[6px]">saa</h6>}
            </div>
          )}

          {/* Login Modal overlay */}
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
                  className={`bg-amber-500 hover:bg-amber-600 transition-colors py-2 rounded  text-black font-bold mt-2 ${isLoginSuccsesres ? "hidden" : "block"}`}
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
            </ul>
          </div>
        )}

        {/* Registration Modal Overlay */}
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

                {/* Full Name Field */}
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

                {/* Email Field */}
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

                {/* nic Field */}
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

                {/* poneNumber Field */}
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

                {/* address Field */}
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

                {/* Password Field */}
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

                {/* Confirm Password Field */}
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
                    {/* Modal Card */}
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

                      {/* Scrollable Content Body */}
                      <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-600 leading-relaxed text-justify">
                        {/* Section 1 */}
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

                        {/* Section 2 */}
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

                        {/* Legal Alert Box */}
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

                        {/* Section 3 */}
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

                        {/* Section 4 */}
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

                      {/* Footer Section with Checkbox and Button */}
                      <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
                        {/* Checkbox */}
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

                        {/* Buttons */}
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

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-500 h-10 w-full rounded hover:bg-amber-600 transition-colors text-black font-bold text-md mt-2 disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </button>

                {/* Login Link */}
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="bg-transparent border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500/10 transition-colors h-10 text-sm"
                >
                  Already have an account? Login
                </button>

                {/* OR Divider */}
                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>

                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-gray-800 text-gray-400">OR</span>
                  </div>
                </div>

                {/* Google Sign Up Button */}
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
