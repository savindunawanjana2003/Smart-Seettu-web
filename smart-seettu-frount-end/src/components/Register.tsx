import React, { useState } from "react";
import Header from "./Nave-bar";

type FormFields = "name" | "email" | "password" | "confirmPassword";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type FormErrors = Partial<Record<FormFields | "submit", string>>;

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as FormFields;
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...dataToSend } = formData;

      // Replace with your actual API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        console.log("Registration successful:", data);
        // Show success message and redirect to login
        alert("Registration successful! Please login.");
        // window.location.href = "/login";
      } else {
        setErrors({
          submit: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please check your connection." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    // Navigate to login page
    console.log("Navigate to login");
    // window.location.href = "/login";
  };

  const handleGoogleSignUp = () => {
    // Implement Google OAuth for registration
    console.log("Google sign up");
    // window.location.href = "/auth/google";
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed top-0 left-0 w-full h-[10%] bg-red-500 z-50">
        <Header />
      </div>

      <div className="w-96 bg-gray-800 sm:w-120 lg:w-150 rounded-xl shadow-2xl my-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          <h2 className="text-4xl font-bold text-white text-center">
            Create Account
          </h2>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-center">
              {errors.submit}
            </div>
          )}

          {/* Full Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-amber-50 font-bold text-xl" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`bg-amber-50 w-full text-gray-950 pl-3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors.name ? "border-2 border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-amber-50 font-bold text-xl" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`bg-amber-50 w-full text-gray-950 pl-3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label
              className="text-amber-50 font-bold text-xl"
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
              className={`bg-amber-50 w-full text-gray-950 pl-3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors.password ? "border-2 border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Password must be at least 6 characters with 1 uppercase and 1
              number
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label
              className="text-amber-50 font-bold text-xl"
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
              className={`bg-amber-50 w-full text-gray-950 pl-3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors.confirmPassword ? "border-2 border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 h-12 w-full rounded-lg hover:bg-amber-600 transition-colors text-black font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          {/* Login Link */}
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="bg-transparent border-2 border-amber-500 text-amber-500 font-bold rounded-lg hover:bg-amber-500 hover:text-black transition-colors h-12"
          >
            Already have an account? Login
          </button>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">OR</span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="bg-white h-12 w-full rounded-lg hover:bg-gray-100 transition-colors text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
  );
};

export default RegisterForm;
