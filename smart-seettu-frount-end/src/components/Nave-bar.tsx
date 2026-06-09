import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginfuntion } from "../service/auth";

import userIcon from "../assets/image/userIcon.png";
import {
  faBox,
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

  const showLoginmodal = () => {
    setIsLoggedIn(true);
  };

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
    } catch (error) {
      console.log(error.message);
    }

    // alert(respons + "<==");

    // axios eken passe login sacsess nam   login butten eka hide wela  profail icon eka show wenna one   butten eka thibba thana
    // if (true) {
    //   setIsLoggedIn(false);
    //   setisLoginSuccsesres(true);
    // }
  };

  const closeLoginFromBackground = () => {
    setIsLoggedIn(false);
  };

  const registerHeader = () => {
    setIsLoggedIn(false);
    setIsClickRegister(true);
    // If you are using React Router pages instead of modals, use: navigate("/register");
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
    } catch (error) {
      setErrors({
        submit: error?.response?.data?.message || "Something went wrongs77",
      });
    } finally {
      setIsLoading(false);
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
