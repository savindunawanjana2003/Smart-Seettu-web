import React, { useState } from "react";
// import PaymentButton from "../components/Payhearui";

interface paymentData {
  fullName: string;
  customerPhone: string;
  email: string;
  groupName: string;
  memberType: string;
  selectedMonth: string;
  amount: string;
  selectedPaymentMethod: string;
}

interface PaymentEntryProps {
  onProceedToPayment: (data: {
    fullName: string;
    customerPhone: string;
    email: string;
    groupName: string;
    memberType: string;
    selectedMonth: string;
    amount: string;
    selectedPaymentMethod: string;
    groupDetails?: {
      id: number;
      name: string;
      memberCount: number;
      monthlyFee: number;
    };
  }) => void;
  groupData?: {
    id: number;
    name: string;
    memberCount: number;
    monthlyFee: number;
  }[];
}

interface errTypes {
  fullName?: string;
  customerPhone?: string;
  email?: string;
  groupName?: string;
  selectedMonth?: string;
  amount?: string;
}

// const PaymentEntry: React.FC<PaymentEntryProps> = ({
//   onProceedToPayment,
//   groupData,
// })
const PaymentEntry: React.FC<PaymentEntryProps> = ({ groupData }) => {
  const [formData, setFormData] = useState<paymentData>({
    fullName: "",
    customerPhone: "",
    email: "",
    groupName: "",
    memberType: "member",
    selectedMonth: "",
    amount: "",
    selectedPaymentMethod: "payhere",
  });

  const [errors, setErrors] = useState<errTypes>({});

  const paymentMethods = [
    { id: "payhere", label: "PayHere" },
    { id: "visa", label: "VISA" },
    { id: "mastercard", label: "MasterCard" },
    { id: "amex", label: "American Express" },
    { id: "discover", label: "Discover" },
    { id: "visa_electron", label: "Visa Electron" },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const defaultGroups = [
    { id: 1, name: "Family Group", memberCount: 5, monthlyFee: 5000 },
    { id: 2, name: "Friends Circle", memberCount: 8, monthlyFee: 3000 },
    { id: 3, name: "Office Group", memberCount: 12, monthlyFee: 2000 },
    { id: 4, name: "Neighborhood Group", memberCount: 6, monthlyFee: 4000 },
  ];

  const groups = groupData || defaultGroups;
  const selectedGroup = groups.find((g) => g.name === formData.groupName);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupName = e.target.value;
    const group = groups.find((g) => g.name === groupName);
    setFormData((prev) => ({
      ...prev,
      groupName: groupName,
      amount: group ? group.monthlyFee.toString() : "",
    }));
    if (errors.groupName) {
      setErrors((prev) => ({ ...prev, groupName: "" }));
    }
  };

  // const validateForm = () => {
  //   const newErrors: errTypes = {};

  //   if (!formData.fullName.trim()) {
  //     newErrors.fullName = "Full name is required";
  //   }

  //   if (!formData.customerPhone.trim()) {
  //     newErrors.customerPhone = "Phone number is required";
  //   } else if (
  //     !/^[0-9]{10,}$/.test(formData.customerPhone.replace(/\s/g, ""))
  //   ) {
  //     newErrors.customerPhone = "Please enter a valid phone number";
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Please enter a valid email address";
  //   }

  //   if (!formData.groupName) {
  //     newErrors.groupName = "Please select a group";
  //   }

  //   if (!formData.selectedMonth) {
  //     newErrors.selectedMonth = "Please select a month";
  //   }

  //   if (!formData.amount || parseFloat(formData.amount) <= 0) {
  //     newErrors.amount = "Please enter a valid amount";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof errTypes]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // <PaymentButton />;
    // alert("kjk");
    // if (validateForm()) {
    //   onProceedToPayment({
    //     ...formData,
    //     groupDetails: selectedGroup,
    //   });
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-body flex items-center justify-center p-1 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10  min-h-screen overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="text-indigo-600 hover:text-purple-600 font-medium text-sm flex items-center gap-1 transition-colors mb-2"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            💰 Group Contribution Payment
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Please fill in your details to pay the monthly group contribution
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="font-semibold text-gray-700 text-sm"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`px-4 py-3 border-2 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.fullName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="customerPhone"
              className="font-semibold text-gray-700 text-sm"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`px-4 py-3 border-2 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] ${
                errors.customerPhone ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.customerPhone && (
              <span className="text-red-500 text-xs mt-1">
                {errors.customerPhone}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-semibold text-gray-700 text-sm"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`px-4 py-3 border-2 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
          </div>

          {/* Group Selection */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="groupName"
              className="font-semibold text-gray-700 text-sm"
            >
              Select Group <span className="text-red-500">*</span>
            </label>
            <select
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleGroupChange}
              className={`px-4 py-3 border-2 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] cursor-pointer bg-white ${
                errors.groupName ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select your group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name} - {group.memberCount} members (LKR{" "}
                  {group.monthlyFee})
                </option>
              ))}
            </select>
            {errors.groupName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.groupName}
              </span>
            )}
          </div>

          {/* Member Type */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">
              Member Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-5 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="member"
                  name="memberType"
                  value="member"
                  checked={formData.memberType === "member"}
                  onChange={handleChange}
                  className="w-4.5 h-4.5 cursor-pointer accent-indigo-600"
                />
                <label
                  htmlFor="member"
                  className="font-medium text-gray-700 cursor-pointer text-sm"
                >
                  Group Member
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="admin"
                  name="memberType"
                  value="admin"
                  checked={formData.memberType === "admin"}
                  onChange={handleChange}
                  className="w-4.5 h-4.5 cursor-pointer accent-indigo-600"
                />
                <label
                  htmlFor="admin"
                  className="font-medium text-gray-700 cursor-pointer text-sm"
                >
                  Group Admin
                </label>
              </div>
            </div>
          </div>

          {/* Month Selection */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="selectedMonth"
              className="font-semibold text-gray-700 text-sm"
            >
              Pay for Month <span className="text-red-500">*</span>
            </label>
            <select
              id="selectedMonth"
              name="selectedMonth"
              value={formData.selectedMonth}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] cursor-pointer bg-white ${
                errors.selectedMonth ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors.selectedMonth && (
              <span className="text-red-500 text-xs mt-1">
                {errors.selectedMonth}
              </span>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="amount"
              className="font-semibold text-gray-700 text-sm"
            >
              Contribution Amount (LKR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount will auto-fill when group is selected"
              className={`px-4 py-3 border-2 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] ${
                selectedGroup ? "bg-gray-100" : "bg-white"
              } ${errors.amount ? "border-red-500" : "border-gray-200"}`}
              min="0"
              step="0.01"
              readOnly={!!selectedGroup}
            />
            {errors.amount && (
              <span className="text-red-500 text-xs mt-1">{errors.amount}</span>
            )}
            {selectedGroup && (
              <span className="text-indigo-600 text-xs font-medium mt-1">
                Monthly contribution for {formData.groupName}: LKR{" "}
                {selectedGroup.monthlyFee}
              </span>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">
              Select Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-1">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center gap-2 p-2.5 border-2 border-gray-200 rounded-xl transition-all cursor-pointer hover:border-indigo-500 hover:bg-indigo-50"
                >
                  <input
                    type="radio"
                    id={method.id}
                    name="selectedPaymentMethod"
                    value={method.id}
                    checked={formData.selectedPaymentMethod === method.id}
                    onChange={handleChange}
                    className="w-4 h-4 cursor-pointer accent-indigo-600"
                  />
                  <label
                    htmlFor={method.id}
                    className="font-medium text-gray-700 cursor-pointer text-xs sm:text-sm"
                  >
                    {method.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          {selectedGroup && formData.selectedMonth && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-500 rounded-xl p-5 my-2.5">
              <h3 className="text-gray-800 text-lg font-semibold mb-3.5">
                📋 Payment Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <p className="text-sm text-gray-600 m-1">
                  <strong className="text-gray-800">Group:</strong>{" "}
                  {formData.groupName}
                </p>
                <p className="text-sm text-gray-600 m-1">
                  <strong className="text-gray-800">Member Type:</strong>{" "}
                  {formData.memberType === "admin"
                    ? "Group Admin"
                    : "Group Member"}
                </p>
                <p className="text-sm text-gray-600 m-1">
                  <strong className="text-gray-800">Month:</strong>{" "}
                  {formData.selectedMonth}
                </p>
                <p className="text-sm text-gray-600 m-1">
                  <strong className="text-gray-800">Amount:</strong> LKR{" "}
                  {formData.amount}
                </p>
                <p className="text-sm text-gray-600 m-1 sm:col-span-2">
                  <strong className="text-gray-800">Payment Method:</strong>{" "}
                  {
                    paymentMethods.find(
                      (m) => m.id === formData.selectedPaymentMethod,
                    )?.label
                  }
                </p>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3.5 rounded-lg mt-2.5">
            <p className="text-yellow-700 text-sm m-0">
              <strong>Note:</strong> Before the payment, please make sure that
              your bank account is activated for online transactions. Contact
              your bank for more information.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)] active:translate-y-0 mt-2.5"
          >
            💳 Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentEntry;
