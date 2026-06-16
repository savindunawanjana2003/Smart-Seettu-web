import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { saveReqest } from "../service/reqest";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import { type reqestDeatiles } from "../types/types";

interface SendNotyfyProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    email: string;
    isOnline: boolean;
  } | null;
}

const SendNotyfy = ({ isOpen, onClose, user }: SendNotyfyProps) => {
  const profailuser = useSelector(
    (state: RootState) => state.customer.currentCustomer,
  );

  const adminid = profailuser?.id ?? "";

  const [grupid, setGrupId] = useState("");

  useEffect(() => {
    if (!isOpen || !user) return;

    const currentGroupId = localStorage.getItem("curentGrupId") ?? "";

    if (!currentGroupId) {
      Swal.fire({
        title: "Pleas create a grup first",
        text: `${user.name} Admin`,
        icon: "info",
        showConfirmButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#d1d5db",
        confirmButtonText: "OK",
      });
    }

    setGrupId(currentGroupId);
  }, [isOpen, user]);

  // IMPORTANT
  if (!isOpen || !user) return null;

  const handleSendRequest = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to send a group invitation to ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Yes, Send Invitation!",
    });

    if (!result.isConfirmed) return;

    const now: Date = new Date();

    const formattedDateTime: string = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const reqestDeatiles: reqestDeatiles = {
      grupId: grupid,
      grupAdminId: adminid,
      memberEmail: user.email,
      memberRespons: "pending",
      createDateTime: formattedDateTime,
    };

    try {
      const res = await saveReqest(reqestDeatiles);

      if (res?.status === 201 || res?.status === 200) {
        Swal.fire({
          title: "Sent Successfully!",
          text: `Invitation has been sent to ${user.name}.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Sent not Successfully!",
          text: `Invitation has not been sent to ${user.name}.`,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <AiOutlineClose size={20} />
        </button>

        <div className="h-28 bg-gradient-to-r from-blue-500 to-indigo-600 relative"></div>

        <div className="px-6 pb-6 text-center relative -mt-14">
          <div className="inline-flex relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-500 overflow-hidden">
              <AiOutlineUser size={48} className="text-gray-400" />
            </div>

            <span
              className={`absolute bottom-1 right-2 w-4 h-4 border-2 border-white rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-800 tracking-wide">
            {user.name}
          </h3>

          <p className="text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-2.5 py-1 rounded-full mt-1">
            {user.isOnline ? "Active Now" : "Offline"}
          </p>

          <hr className="my-5 border-gray-100" />

          <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Group Invitation
            </h4>

            <p className="text-sm text-gray-600 leading-relaxed">
              Would you like to invite{" "}
              <span className="font-semibold text-gray-800">{user.name}</span>{" "}
              to join your newly created Seettu Group? {grupid}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSendRequest}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition"
            >
              <AiOutlineUserAdd size={18} />
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotyfy;
