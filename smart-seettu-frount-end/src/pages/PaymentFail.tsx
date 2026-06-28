// PaymentUnsuccessful.jsx
import { useState } from "react";
import {
  XCircle,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  Home,
  AlertTriangle,
} from "lucide-react";

const PaymentUnsuccessful = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");

  const paymentDetails = {
    transactionId: "TXN-2024-001235",
    amount: "LKR 15,000.00",
    date: "June 28, 2026",
    time: "2:35 PM",
    paymentMethod: "Credit Card •••• 4582",
    status: "Failed",
  };

  const commonIssues = [
    "Insufficient funds",
    "Card declined",
    "Network timeout",
    "Incorrect payment details",
    "Bank server error",
  ];

  const handleRetry = () => {
    // Retry logic here
    console.log("Retrying payment...");
  };

  const handleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleIssueSelect = (issue: any) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all hover:scale-105 duration-300">
        {/* Error Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full mx-auto flex items-center justify-center animate-pulse">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          {/* Warning glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-red-400 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed!
          </h2>
          <p className="text-gray-500">
            We couldn't process your payment. Please try again.
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {paymentDetails.status}
          </div>
        </div>

        {/* Error Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-600 text-sm">Transaction ID</span>
            <span className="text-gray-800 font-mono text-sm font-semibold">
              {paymentDetails.transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-600 text-sm">Amount</span>
            <span className="text-xl font-bold text-red-600">
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

        {/* Error Message Box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-red-800 mb-1">
                What went wrong?
              </h4>
              <p className="text-sm text-red-600">
                Your payment was declined by the bank. Please check your card
                details or try a different payment method.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Payment
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleHelp}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <HelpCircle className="w-5 h-5" />
              Help
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>
        </div>

        {/* Help Section */}
        {showHelp && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-slideDown">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Common Issues:
            </h4>
            <div className="space-y-2">
              {commonIssues.map((issue, index) => (
                <button
                  key={index}
                  onClick={() => handleIssueSelect(issue)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    selectedIssue === issue
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <p className="text-center text-xs text-gray-400 mt-6">
          If you continue to experience issues, please contact your bank or our
          support team.
        </p>
      </div>
    </div>
  );
};

export default PaymentUnsuccessful;
