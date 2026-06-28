// PaymentSuccess.jsx
import React from "react";
import { CheckCircle, Download, Share2, Home, Receipt } from "lucide-react";

const PaymentSuccess = () => {
  const paymentDetails = {
    transactionId: "TXN-2024-001234",
    amount: "LKR 15,000.00",
    date: "June 28, 2026",
    time: "2:30 PM",
    paymentMethod: "Credit Card •••• 4582",
    status: "Completed",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all hover:scale-105 duration-300">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center animate-bounce">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          {/* Ripple effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-green-400 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500">
            Your payment has been processed successfully.
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {paymentDetails.status}
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-600 text-sm">Transaction ID</span>
            <span className="text-gray-800 font-mono text-sm font-semibold">
              {paymentDetails.transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-600 text-sm">Amount</span>
            <span className="text-xl font-bold text-green-600">
              {paymentDetails.amount}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-600 text-sm">Date & Time</span>
            <span className="text-gray-800 text-sm">
              {paymentDetails.date} at {paymentDetails.time}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Payment Method</span>
            <span className="text-gray-800 text-sm">
              {paymentDetails.paymentMethod}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-600/30">
            <Receipt className="w-5 h-5" />
            Download Receipt
          </button>

          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
              <Home className="w-5 h-5" />
              Home
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-xs text-gray-400 mt-6">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
