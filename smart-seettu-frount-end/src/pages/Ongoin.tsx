import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Settings,
  MessageCircle,
  Calendar,
  Clock,
  TrendingUp,
  Crown,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
  Loader2,
  AlertCircle,
  Search,
  X,
  LayoutGrid,
  List,
  ChevronRight,
  MoreVertical,
  Shield,
  UserCheck,
  UserX,
  Zap,
} from "lucide-react";
import { ongoinService } from "../service/ongoin";
import Swal from "sweetalert2";
import { setShowEmailIcon } from "../redux/slice/mailSlice";
import { useDispatch } from "react-redux";

interface Group {
  _id?: string;
  id: string;
  adminid: string;
  memberCount: string;
  expectedMonthlySeettuAmount: string;
  monthlyContributionPerMember: string;
  seettuDurationInMonths: string;
  members: any[];
  grupStete: "pending" | "active" | "completed";
  createDate: string;
  __v?: number;
}

interface GroupWithUI {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  createdDate: string;
  status: "active" | "pending" | "completed";
  isAdmin: boolean;
  isMember: boolean;
  lastActivity: string;
  expectedMonthlySeettuAmount: string;
  monthlyContributionPerMember: string;
  seettuDurationInMonths: string;
}

const Ongoin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "admin" | "member">("all");
  const [groups, setGroups] = useState<GroupWithUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    dispatch(setShowEmailIcon(false));
    try {
      const user = JSON.parse(localStorage.getItem("currentCustomer") || "{}");
      setUserId(user.phone || "");
    } catch (error) {
      console.error("Error getting user:", error);
      setUserId("");
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      fetchGroups();
    }
  }, [userId]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ongoinService.getAllGroups();

      if (response && Array.isArray(response)) {
        const formattedGroups = response.map((group: Group) => {
          const isUserAdmin = group.members?.some(
            (m: any) => m.tagname === "admin" && m.contactnumber === userId,
          );
          const isUserMember = group.members?.some(
            (m: any) => m.tagname === "member" && m.contactnumber === userId,
          );

          return {
            id: group.id || group._id || "",
            name: `සීට්ටු සමූහය ${group.id || group._id}`,
            description: `මාසික සීට්ටු සමූහය - ${group.createDate || "2026"}`,
            memberCount: group.members?.length || 0,
            maxMembers: Number(group.memberCount),
            createdDate:
              group.createDate || new Date().toISOString().split("T")[0],
            status:
              group.members?.length >= Number(group.memberCount)
                ? "completed"
                : group.grupStete || "pending",
            isAdmin: !!isUserAdmin,
            isMember: !!isUserMember,
            lastActivity:
              group.createDate || new Date().toISOString().split("T")[0],
            expectedMonthlySeettuAmount:
              group.expectedMonthlySeettuAmount || "0",
            monthlyContributionPerMember:
              group.monthlyContributionPerMember || "0",
            seettuDurationInMonths: group.seettuDurationInMonths || "0",
          };
        });
        setGroups(formattedGroups);
      } else {
        setError("Failed to load groups");
        setGroups([]);
      }
    } catch (err: any) {
      console.error("Error fetching groups:", err);
      setError(err?.message || "Failed to load groups. Please try again.");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };
  const CheckCircle = ({ className }: { className?: string }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "සක්‍රිය";
      case "pending":
        return "රැඳී සිටින";
      case "completed":
        return "සම්පූර්ණයි";
      default:
        return status;
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const filteredGroups = groups.filter((group) => {
    if (activeTab === "admin" && !group.isAdmin) return false;
    if (activeTab === "member" && (group.isAdmin || !group.isMember))
      return false;
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      return (
        group.name.toLowerCase().includes(search) ||
        group.description.toLowerCase().includes(search) ||
        group.id.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const handleGroupClick = (groupId: string) => {
    navigate(`/pages/Dashbord/Grup/${groupId}`);
  };

  const handleDeleteGroup = async (groupId: string, groupName: string) => {
    const result = await Swal.fire({
      title: "සමූහය මකා දැමීමට වග බලා ගන්න",
      text: `"${groupName}" සමූහය මකා දැමීමට අවශ්‍ය බව ඔබට විශ්වාසද?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "ඔව්, මකා දමන්න",
      cancelButtonText: "අවලංගු කරන්න",
    });

    if (result.isConfirmed) {
      try {
        await Swal.fire({
          title: "මකා දමන ලදි!",
          text: "සමූහය සාර්ථකව මකා දමන ලදි.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchGroups();
      } catch (err) {
        Swal.fire({ title: "දෝෂයකි!", icon: "error" });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your groups...
          </p>
          <p className="text-sm text-gray-400">කරුණාකර මොහොතක් රැඳී සිටින්න</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                    මගේ සීට්ටු සමූහ
                  </h1>
                  <p className="text-gray-500 text-sm md:text-base mt-0.5">
                    ඔබ සම්බන්ධ වී සිටින සියලුම සීට්ටු සමූහ මෙතැනින් කළමනාකරණය
                    කරන්න
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/pages/Dashbord/Grupmanagement")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              නව සමූහයක් සාදන්න
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {groups.length}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  මුළු සමූහ
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {groups.filter((g) => g.isAdmin).length}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  පරිපාලක
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {groups.filter((g) => g.isMember && !g.isAdmin).length}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  සාමාජික
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {groups.filter((g) => g.status === "active").length}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  සක්‍රිය
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="සමූහයක් සොයන්න..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                සියල්ල
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "admin"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                පරිපාලක
              </button>
              <button
                onClick={() => setActiveTab("member")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "member"
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                සාමාජික
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Group List */}
      <div className="container mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6 flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-300" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium text-lg">
                    {searchTerm ? "සමූහයක් හමු නොවීය" : "සමූහ නොමැත"}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {searchTerm
                      ? `"${searchTerm}" සඳහා සමූහ හමු නොවීය`
                      : "මෙම කාණ්ඩයේ සමූහ කිසිවක් සොයාගත නොහැක"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                {/* Group Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${getStatusDot(group.status)} shadow-sm`}
                        />
                        <h3 className="font-bold text-gray-800 text-base truncate">
                          {group.name}
                        </h3>
                        {group.isAdmin && (
                          <span className="text-[10px] px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                        {group.description}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ml-2 flex items-center gap-1.5 ${getStatusColor(group.status)}`}
                    >
                      {getStatusIcon(group.status)}
                      {getStatusText(group.status)}
                    </span>
                  </div>
                </div>

                {/* Group Stats */}
                <div className="px-6 py-3 bg-gray-50/80 flex items-center justify-between">
                  <div className="flex items-center gap-5 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {group.memberCount}/{group.maxMembers}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs">{group.createdDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{group.lastActivity}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-2.5">
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                      style={{
                        width: `${(group.memberCount / group.maxMembers) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-2 bg-gray-50/50">
                  <button
                    onClick={() => handleGroupClick(group.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    බලන්න
                  </button>

                  {group.isAdmin ? (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/pages/Dashbord/Grupmanagement/${group.id}`)
                        }
                        className="px-3.5 py-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200 shadow-sm"
                        title="සංස්කරණය කරන්න"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id, group.name)}
                        className="px-3.5 py-2.5 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200 shadow-sm"
                        title="මකා දමන්න"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="px-3.5 py-2.5 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200 shadow-sm"
                      title="පිටවන්න"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/pages/Dashbord/Chat/${group.id}`)}
                    className="px-3.5 py-2.5 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200 shadow-sm"
                    title="කතාබස් කරන්න"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 pb-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                🚀 අදහස් තිබේද?
              </h3>
              <p className="text-gray-500 text-sm mt-0.5">
                නව සීට්ටු සමූහයක් ආරම්භ කිරීමට හෝ පවතින සමූහයක් කළමනාකරණය කිරීමට
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/pages/Dashbord/Grupmanagement")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                නව සමූහය
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                සැකසුම්
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="container mx-auto px-4 pb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <span className="text-lg">💡</span>
          <span className="font-medium">ඉඟිය:</span>
          <span className="text-gray-500">
            සමූහයක් මත ක්ලික් කිරීමෙන් විස්තර බලන්න
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ongoin;
