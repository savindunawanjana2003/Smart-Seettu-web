import React from "react";
import {
  X,
  User,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

interface MemberDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    email: string;
    address: string;
    poneNumber?: string;
    phone?: string;
    memberId?: string;
    joinDate?: string;
    role?: string;
    status?: string;
  } | null;
}

const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  if (!isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 bg-transparent  flex items-start justify-end z-50 p-4"
      onClick={onClose}
    >
      {/* Modal Card - Top Right Corner */}
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100 transform transition-all duration-300 animate-slide-in-right mt-4 mr-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Member Profile</h3>
              <p className="text-xs text-blue-200 opacity-90">
                View member details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Avatar - Center */}
        <div className="flex justify-center -mt-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/30 border-4 border-white">
            {member.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Profile Info Body */}
        <div className="p-6 pt-4 space-y-3">
          {/* Name */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 p-3 rounded-xl border border-blue-100/50 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                Full Name
              </p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">
                {member.name}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-sm text-gray-700 font-mono mt-0.5 truncate">
                {member.email}
              </p>
            </div>
          </div>

          {/* Contact Number */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                Contact Number
              </p>
              <p className="text-sm text-gray-700 mt-0.5">
                {member.poneNumber || member.phone || "Not Available"}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                Home Address
              </p>
              <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">
                {member.address}
              </p>
            </div>
          </div>

          {/* Extra Fields - Optional */}
          {(member.memberId || member.role || member.joinDate) && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {member.memberId && (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-center">
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                    Member ID
                  </p>
                  <p className="text-xs font-mono text-gray-700 mt-0.5">
                    {member.memberId}
                  </p>
                </div>
              )}
              {member.role && (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-center">
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                    Role
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">
                    {member.role}
                  </p>
                </div>
              )}
              {member.joinDate && (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-center">
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                    Joined
                  </p>
                  <p className="text-xs text-gray-700 mt-0.5">
                    {member.joinDate}
                  </p>
                </div>
              )}
              {member.status && (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-center">
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </p>
                  <span
                    className={`text-xs font-semibold mt-0.5 inline-block px-2 py-0.5 rounded-full ${
                      member.status === "Active" || member.status === "active"
                        ? "bg-green-100 text-green-700"
                        : member.status === "Pending" ||
                            member.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <span>Verified Member</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-600 text-xs font-medium rounded-lg transition-all border border-gray-200 hover:border-gray-300"
          >
            Close
          </button>
        </div>
      </div>

      {/* Custom CSS for Slide-in Animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MemberDetailsModal;
