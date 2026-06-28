import React, { useState } from "react";
import { X, Send, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberEmail: string;
  memberName: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  memberEmail,
  memberName,
}) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("කරුණාකර යැවීමට අවශ්‍ය පණිවිඩය ඇතුළත් කරන්න.");
      return;
    }

    try {
      setIsSending(true);

      const SERVICE_ID = "service_tsxopuf";
      const TEMPLATE_ID = "template_jxsyjjc";
      const PUBLIC_KEY = "oR4C8lPUI9m_NgRPk";

      const customer = JSON.parse(
        localStorage.getItem("currentCustomer") || "",
      );
      console.log(customer.email);
      console.log(customer.phone);
      console.log("======================");

      const templateParams = {
        to_name: memberName,
        email: memberEmail,
        sender_email: customer.email,
        sender_contact_number: customer.phone,
        message: message,
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY,
      );

      console.log("SUCCESS!", response.status, response.text);
      alert("ඊමේල් පණිවිඩය සාර්ථකව යවන ලදී!");

      setMessage("");
      onClose();
    } catch (error) {
      console.error("FAILED...", error);
      alert("ඊමේල් යැවීම අසාර්ථකයි. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 animate-pulse" />
            <div>
              <h3 className="font-bold text-lg">Send Email Message</h3>
              <p className="text-xs text-blue-100 mt-0.5">To: {memberName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendEmail} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Recipient Email (ලබන්නාගේ ලිපිනය)
            </label>
            <input
              type="email"
              value={memberEmail}
              readOnly
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-600 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Type Message (පණිවිඩය ඇතුළත් කරන්න)
            </label>
            <textarea
              rows={5}
              placeholder="Write your email content here..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95"
            >
              {isSending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Email</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
