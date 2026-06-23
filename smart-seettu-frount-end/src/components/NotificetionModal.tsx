import { useEffect, useState } from "react";
import type { notifecetion } from "../types/types";
import { reactionForGrupReqest } from "../service/reqest";
import Swal from "sweetalert2";

interface GrupReqestProps {
  isShow: boolean;
  userEmail: string;
  onClose: () => void;
  reque?: notifecetion[];
}

const GrupReqest = ({
  isShow,
  userEmail,
  onClose,
  reque = [],
}: GrupReqestProps) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isShow) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isShow]);
  // =========================

  const [notyficetion, setNotyficetions] = useState<notifecetion[]>([]);

  useEffect(() => {
    setNotyficetions(reque);
  }, [reque]);

  const getEmailAvailableAdmins = (data: notifecetion): string => {
    return data.email || "admin@example.com";
  };
  // ====================

  if (!show) return null;
  // =================================action fro grup reqest ===================
  const handleAccept = async (
    id: string,
    email: string,
    reqestid: string,
  ): Promise<void> => {
    const grupId = id;
    const memberEmail = email;
    const reqestId = reqestid;
    // alert("lsdjksks");
    const memberRespons = "accept";

    try {
      // alert(`${grupId, memberEmail, reqestId}`)accept
      console.log(
        grupId + "//" + memberEmail + "//" + reqestId + "////////////////////",
      );
      const res = await reactionForGrupReqest(
        grupId,
        memberEmail,
        memberRespons,
        reqestId,
      );

      if (res.status === 201) {
        Swal.fire({
          title: "Request Confirmed Successfully",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          width: "400px",
          customClass: {
            popup: "custom-toast-class",
          },
        });

        return;
      } else {
        Swal.fire({
          title: "Request Confirmation Failed",
          icon: "error",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          width: "400px",
        });
        return;
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Request Confirmation Failed",
        icon: "error",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: "400px",
      });
      return;
    }

    // throw new Error("Function not implemented.");
  };

  function handleReject(id: string): void {
    throw new Error("Function not implemented.");
  }
  // ===========================================================================
  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/30 bg-transparent transition-all duration-500
        ${animate ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel with modern design */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-96 bg-white rounded-r-2xl shadow-2xl transition-all duration-500
        ${animate ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header with accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl" />
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Group Requests
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {reque.length} pending{" "}
                  {reque.length === 1 ? "request" : "requests"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Content with smooth scroll */}
        <div className="p-4 space-y-3 h-[calc(100%-85px)] overflow-y-auto">
          {notyficetion.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4 shadow-inner">
                <span className="text-3xl">🔕</span>
              </div>
              <p className="text-gray-500 font-medium">No requests</p>
              <p className="text-sm text-gray-400 mt-1">
                Everything is peaceful
              </p>
            </div>
          ) : (
            notyficetion.map((req, index) => (
              <div
                key={req.id}
                className={`group bg-white rounded-xl border border-gray-100 p-3 transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5
                ${animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${animate ? index * 60 : 0}ms` }}
              >
                <div className="flex gap-3">
                  {/* Animated Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">
                      {req.grupId[0].toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                          {req.grupId}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>

                          {req.grupAdminEmail}
                          {/* ----------------------- */}
                        </p>
                      </div>
                    </div>

                    {/* Stylish Buttons */}

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() =>
                          handleAccept(req.id, req.email, req.reqestid)
                        }
                        className="flex-1 text-xs px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow font-medium"
                      >
                        ✓ Accept
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="flex-1 text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-200 font-medium"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer decoration */}
        {reque.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 rounded-b-2xl">
            <div className="flex justify-center gap-4 text-xs">
              <span className="text-gray-500"> New requests</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500"> Click to respond</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrupReqest;
