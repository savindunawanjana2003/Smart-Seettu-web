// import React, { useRef } from "react";
// import { JitsiMeeting } from "@jitsi/react-sdk";
// import { useNavigate } from "react-router-dom";

// const Videocall: React.FC = () => {
//   const jitsiApiRef = useRef<any>(null);
//   const navigate = useNavigate();

//   const jaasAppId = "vpaas-magic-cookie-afa8f7c5e8ea414e86cbf77fd2b6cc23";

//   const roomName = `${jaasAppId}/dental-care-room-xyz987`;
//   const userName = "Savindu Dev";
//   const userEmail = "savindu@example.com";

//   return (
//     <div
//       style={{
//         height: "100%",
//         width: "100%",
//         maxWidth: "100%",
//         margin: "0 auto",
//       }}
//     >
//       <JitsiMeeting
//         domain="8x8.vc"
//         roomName={roomName}
//         configOverwrite={{
//           startWithAudioMuted: false,
//           startWithVideoMuted: false,
//           prejoinPageEnabled: false,
//           disableThirdPartyRequests: true,
//         }}
//         interfaceConfigOverwrite={{
//           SHOW_JITSI_WATERMARK: false,
//           HIDE_INVITE_YOUR_TEAM: true,
//         }}
//         userInfo={{
//           displayName: userName,
//           email: userEmail,
//         }}
//         onReadyToClose={() => {
//           navigate("/");
//         }}
//         onApiReady={(externalApi) => {
//           jitsiApiRef.current = externalApi;
//           console.log("Jitsi Meet API via JaaS is ready");
//         }}
//         getIFrameRef={(iframeRef) => {
//           iframeRef.style.height = "100%";
//           iframeRef.style.width = "100%";
//           iframeRef.style.flex = "1";
//         }}
//       />
//     </div>
//   );
// };

// export default Videocall;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Users,
  ShieldCheck,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Loader2,
  Camera,
  Mic,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Globe,
  Phone,
  Calendar,
  Clock,
  Star,
  Heart,
  Waves,
  Circle,
} from "lucide-react";

const VideoCallPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCall = () => {
    if (!groupName.trim()) {
      setError("කරුණාකර සමූහ නමක් ඇතුළත් කරන්න");
      return;
    }
    if (!userName.trim()) {
      setError("කරුණාකර ඔබගේ නම ඇතුළත් කරන්න");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(`/video-call/room/${groupName}`, {
        state: {
          groupName: groupName,
          userName: userName,
        },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/40 flex items-center justify-center p-4">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/10 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Moving Gradient Orbs */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-purple-300/20 rounded-full blur-2xl animate-bounce delay-700" />

        {/* Decorative Lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <circle cx="20%" cy="30%" r="300" fill="url(#grad1)" />
          <circle cx="80%" cy="70%" r="400" fill="url(#grad1)" />
        </svg>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-300" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping delay-700" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping delay-500" />

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-32 opacity-10"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#3B82F6"
              d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,186.7C672,181,768,107,864,96C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-600/30 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-75 animate-pulse" />
            <Video className="w-10 h-10 text-white relative z-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            සීට්ටු වීඩියෝ ඇමතුම
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ඔබගේ සමූහය සමඟ වීඩියෝ ඇමතුමක් ආරම්භ කරන්න
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`flex-1 h-0.5 ${step >= 2 ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200"}`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <div
                className={`flex-1 h-0.5 ${step >= 3 ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200"}`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Step 1: Group Name */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    සමූහයක් සාදන්න
                  </h2>
                  <p className="text-sm text-gray-500">
                    ඔබගේ වීඩියෝ ඇමතුම සඳහා සමූහ නමක් ඇතුළත් කරන්න
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    සමූහ නම
                  </label>
                  <div className="relative group">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="උදා: සීට්ටු සමූහය 2026"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      onKeyPress={(e) => e.key === "Enter" && setStep(2)}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    ඔබගේ සමූහය හඳුනා ගැනීමට පහසු නමක් තෝරන්න
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (!groupName.trim()) {
                      setError("කරුණාකර සමූහ නමක් ඇතුළත් කරන්න");
                      return;
                    }
                    setError("");
                    setStep(2);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:scale-[1.02]"
                >
                  ඊළඟට
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: User Name */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    ඔබගේ නම ඇතුළත් කරන්න
                  </h2>
                  <p className="text-sm text-gray-500">
                    ඇමතුමේදී ඔබ හඳුනා ගැනීමට මෙම නම භාවිතා වේ
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ඔබගේ නම
                  </label>
                  <div className="relative group">
                    <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="උදා: කමල් පෙරේරා"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleCreateCall()
                      }
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    <UserPlus className="w-3 h-3" />
                    ඔබගේ සැබෑ නම හෝ ඔබ හඳුනා ගැනීමට පහසු නමක් භාවිතා කරන්න
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setError("");
                      setStep(1);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                  >
                    ආපසු
                  </button>
                  <button
                    onClick={handleCreateCall}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        සාදමින්...
                      </>
                    ) : (
                      <>
                        ඇමතුම ආරම්භ කරන්න
                        <Video className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                  <CheckCircle className="w-10 h-10 text-emerald-600 relative z-10" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  සූදානම්!
                </h2>
                <p className="text-gray-500 text-sm">
                  "{groupName}" සමූහය සාර්ථකව සාදන ලදි
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {userName} ලෙස ඔබ සම්බන්ධ වනු ඇත
                </p>

                <button
                  onClick={handleCreateCall}
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:scale-[1.02]"
                >
                  <Video className="w-4 h-4" />
                  ඇමතුම ආරම්භ කරන්න
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-white/50 backdrop-blur-sm border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>ආරක්ෂිත සම්බන්ධතාවය</span>
              </div>
              <div className="flex items-center gap-3">
                <span>🔒 සංකේතාත්මක</span>
                <span>•</span>
                <span>📹 HD ගුණත්වය</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center shadow-sm hover:shadow-md transition-all hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-1.5 shadow-lg shadow-blue-500/30">
              <Users className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-medium text-gray-700">මුළු සාමාජික</p>
            <p className="text-[10px] text-gray-400">එක්ව සාකච්ඡා කරන්න</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center shadow-sm hover:shadow-md transition-all hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-1.5 shadow-lg shadow-purple-500/30">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-medium text-gray-700">HD වීඩියෝ</p>
            <p className="text-[10px] text-gray-400">පැහැදිලි දර්ශන</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center shadow-sm hover:shadow-md transition-all hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-1.5 shadow-lg shadow-green-500/30">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-medium text-gray-700">පැහැදිලි ශබ්දය</p>
            <p className="text-[10px] text-gray-400">බාධාවකින් තොරව</p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          ආපසු
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default VideoCallPage;
