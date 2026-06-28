import React, { useEffect, useState } from "react";
import {
  Send,
  Mail,
  Users,
  Calendar,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getAllGrupmembersFromGrupId } from "../service/grup";
import emailjs from "@emailjs/browser";

// interface Member {
//   memberId: string;
//   membername: string;
//   email: string;
//   contactnumber?: boolean;
// }

// interface Group {
//   id: string;
//   adminid: string;
//   memberCount: string;
//   expectedMonthlySeettuAmount: string;
//   monthlyContributionPerMember: string;
//   seettuDurationInMonths: string;
//   members: Member;
//   grupStete: string;
//   createDate: string;
// }

interface EmailModalProps {
  isShow: boolean;
  onClose: () => void;
  groupId?: string;
  onSend: (data: {
    groupId: string;
    emails: string[];
    message: string;
    month: string;
  }) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isShow,
  onClose,
  groupId,
  onSend,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isActive, setisActive] = useState<boolean>(false);
  const [grupId, setGrupId] = useState<string>("");
  //   const [grupMembersList, setgrupMembersList] = useState<any[]>([]);
  const [groupData, setGrupData] = useState<any>({
    id: grupId || "",
    name: "සීට්ටු සමූහය",
    createdDate: "",
    adminId: "ADMIN",
    adminName: "",
    members: [],
  });

  useEffect(() => {
    if (!groupId) return;

    const loadGroup = async () => {
      try {
        const res = await getAllGrupmembersFromGrupId(groupId);

        setGrupData((prev: any) => ({
          ...prev,
          members: res.memberslist,
        }));

        setisActive(true);
      } catch (error) {
        console.error("Error loading members:", error);
      }
    };

    setGrupId(groupId);
    loadGroup();
  }, [groupId]);

  // const sinhalaMonths = [
  //   "ජනවාරි",
  //   "පෙබරවාරි",
  //   "මාර්තු",
  //   "අප්‍රේල්",
  //   "මැයි",
  //   "ජූනි",
  //   "ජූලි",
  //   "අගෝස්තු",
  //   "සැප්තැම්බර්",
  //   "ඔක්තෝබර්",
  //   "නොවැම්බර්",
  //   "දෙසැම්බර්",
  // ];

  // Handle Select All
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(groupData.members.map((m: any) => m.email));
    }
    setSelectAll(!selectAll);
  };

  // Handle Individual Email Selection
  const handleEmailToggle = (email: string) => {
    setSelectedEmails((prev) => {
      const newSelection = prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email];

      // Update selectAll state
      setSelectAll(newSelection.length === groupData.members.length);
      return newSelection;
    });
  };

  const handleSend = () => {
    if (selectedEmails.length === 0) {
      alert("කරුණාකර අවම වශයෙන් එක් සාමාජිකයෙකු හෝ තෝරන්න");
      return;
    }

    if (!message.trim()) {
      alert("කරුණාකර පණිවිඩයක් ඇතුළත් කරන්න");
      return;
    }

    setIsSending(true);

    const SERVICE_ID = "service_tsxopuf";
    const TEMPLATE_ID = "template_az4ojz8";
    const PUBLIC_KEY = "oR4C8lPUI9m_NgRPk";

    const emailsString = selectedEmails.join(", ");

    const templateParams = {
      group_name: grupId,
      month: selectedMonth,
      message: message,
      to_emails: emailsString,
      PUBLIC_KEY,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("ඊමේල් සියල්ල සාර්ථකව යැවුණා");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("ඊමේල් යැවීම අසාර්ථකයි. කරුණාකර නැවත උත්සාහ කරන්න. ");
      })
      .finally(() => {
        setIsSending(false);
        onClose();
        setSelectedEmails([]);
        setSelectAll(false);
        setMessage("");
        setSelectedMonth("");
      });
  };

  if (!isShow) return null;

  const clickBackGround = () => {
    setisActive(false);
  };

  return (
    <div>
      {isActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4"
          onClick={clickBackGround}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      ඊමේල් යවන්න
                    </h2>
                    <p className="text-sm text-gray-500">
                      {groupData.name} - {groupData.members.length} සාමාජිකයින්
                    </p>
                  </div>
                </div>
                {/* <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button> */}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Group Info */}
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold">
                        {groupData.members.length}
                      </span>{" "}
                      සාමාජිකයින්
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      සාදන ලද්දේ: {groupData.createdDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Admin:{" "}
                      <span className="font-semibold">
                        {groupData.adminName}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Member Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    සාමාජිකයින් තෝරන්න
                  </label>
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {selectAll ? "සියල්ල ඉවත් කරන්න" : "සියල්ල තෝරන්න"}
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 max-h-48 overflow-y-auto">
                  <div className="space-y-2">
                    {groupData.members.map((member: any) => (
                      <label
                        key={member.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedEmails.includes(member.email)}
                          onChange={() => handleEmailToggle(member.email)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              member.isOnline
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {member.email}
                            </p>
                          </div>
                          {member.isOnline && (
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  <span className="font-medium text-blue-600">
                    {selectedEmails.length}
                  </span>{" "}
                  සාමාජිකයින් තෝරා ඇත
                </p>
              </div>

              {/* Month Selection */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  මාසය තෝරන්න
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">මාසයක් තෝරන්න</option>
                  {sinhalaMonths.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  පණිවිඩය
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="ඔබගේ පණිවිඩය ඇතුළත් කරන්න..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
                />
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  සාමාජිකයින්ට යවන පණිවිඩය මෙයයි
                </p>
              </div>

              {/* Selected Emails Preview */}
              {selectedEmails.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">
                    තෝරාගත් ඊමේල් ({selectedEmails.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmails.map((email) => (
                      <span
                        key={email}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 rounded-b-2xl flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
              >
                අවලංගු කරන්න
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || selectedEmails.length === 0}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    යවමින්...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    ඊමේල් යවන්න
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Custom CSS for animations */}
        </div>
      )}
    </div>
  );
};

export default EmailModal;
