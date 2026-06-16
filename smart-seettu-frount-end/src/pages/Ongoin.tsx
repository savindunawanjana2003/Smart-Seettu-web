import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Settings,
  ChevronRight,
  MessageCircle,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  UserCog,
  Crown,
  LogOut,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
} from "lucide-react";

// Types
interface Group {
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
}

const Ongoin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "admin" | "member">("all");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Sample data - replace with real data from your backend
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "G001",
      name: "සීට්ටු සමූහය 2026",
      description: "මාසික සීට්ටු සමූහය - ජනවාරි 2026",
      memberCount: 8,
      maxMembers: 12,
      createdDate: "2026-01-01",
      status: "active",
      isAdmin: true,
      isMember: true,
      lastActivity: "2026-01-15",
    },
    {
      id: "G002",
      name: "ඉතුරුම් කණ්ඩායම",
      description: "ඉතුරුම් සහ ආයෝජන සමූහය",
      memberCount: 5,
      maxMembers: 10,
      createdDate: "2026-01-05",
      status: "pending",
      isAdmin: false,
      isMember: true,
      lastActivity: "2026-01-12",
    },
    {
      id: "G003",
      name: "ව්‍යාපාරික සීට්ටු",
      description: "ව්‍යාපාරිකයන් සඳහා සීට්ටු සමූහය",
      memberCount: 10,
      maxMembers: 10,
      createdDate: "2025-12-15",
      status: "completed",
      isAdmin: true,
      isMember: true,
      lastActivity: "2026-01-10",
    },
    {
      id: "G004",
      name: "ගෘහස්ථ සීට්ටු",
      description: "පවුලේ සාමාජිකයන් සඳහා",
      memberCount: 4,
      maxMembers: 8,
      createdDate: "2026-01-10",
      status: "active",
      isAdmin: false,
      isMember: true,
      lastActivity: "2026-01-14",
    },
    {
      id: "G005",
      name: "තරුණ සීට්ටු",
      description: "තරුණ පරපුරේ සීට්ටු සමූහය",
      memberCount: 6,
      maxMembers: 15,
      createdDate: "2026-01-08",
      status: "active",
      isAdmin: true,
      isMember: true,
      lastActivity: "2026-01-13",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800";
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

  const filteredGroups = groups.filter((group) => {
    if (activeTab === "admin") return group.isAdmin;
    if (activeTab === "member") return group.isMember && !group.isAdmin;
    return group.isMember || group.isAdmin;
  });

  const handleGroupClick = (groupId: string) => {
    navigate(`/pages/Dashbord/Grup/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-0 -right-4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  මගේ සීට්ටු සමූහ
                </h1>
              </div>
              <p className="text-amber-100/90 text-sm md:text-base max-w-2xl">
                ඔබ සම්බන්ධ වී සිටින සහ ඔබ විසින් නිර්මාණය කරන ලද සියලුම සීට්ටු
                සමූහ මෙතැනින් කළමනාකරණය කරන්න.
              </p>
            </div>

            <button
              onClick={() => navigate("/pages/Dashbord/Grupmanagement")}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all duration-200 text-sm font-medium border border-white/20"
            >
              <PlusCircle className="w-4 h-4" />
              නව සමූහයක් සාදන්න
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-100/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {groups.length}
                </p>
                <p className="text-xs text-gray-500">මුළු සමූහ</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-100/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {groups.filter((g) => g.isAdmin).length}
                </p>
                <p className="text-xs text-gray-500">පරිපාලක</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-100/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {groups.filter((g) => g.isMember && !g.isAdmin).length}
                </p>
                <p className="text-xs text-gray-500">සාමාජික</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-100/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {groups.filter((g) => g.status === "active").length}
                </p>
                <p className="text-xs text-gray-500">සක්‍රිය</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "all"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            සියල්ල
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "admin"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Crown className="w-4 h-4" />
            මම පරිපාලක
          </button>
          <button
            onClick={() => setActiveTab("member")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "member"
                ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            මම සාමාජික
          </button>
        </div>
      </div>

      {/* Group List */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">සමූහ නොමැත</p>
                  <p className="text-sm text-gray-400">
                    මෙම කාණ්ඩයේ සමූහ කිසිවක් සොයාගත නොහැක
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                {/* Group Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {group.name}
                        </h3>
                        {group.isAdmin && (
                          <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {group.description}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}
                    >
                      {getStatusText(group.status)}
                    </span>
                  </div>
                </div>

                {/* Group Stats */}
                <div className="px-5 py-3 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {group.memberCount}/{group.maxMembers}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">{group.createdDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{group.lastActivity}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-5 py-2">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${(group.memberCount / group.maxMembers) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => handleGroupClick(group.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    බලන්න
                  </button>

                  {group.isAdmin && (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/pages/Dashbord/Grupmanagement/${group.id}`)
                        }
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 rounded-lg text-sm font-medium transition-all duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => navigate(`/pages/Dashbord/Chat/${group.id}`)}
                    className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-all duration-200"
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">🚀 අදහස් තිබේද?</h3>
              <p className="text-amber-100/90 text-sm mt-1">
                නව සීට්ටු සමූහයක් ආරම්භ කිරීමට හෝ පවතින සමූහයක් කළමනාකරණය කිරීමට
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/pages/Dashbord/Grupmanagement")}
                className="px-5 py-2.5 bg-white text-amber-700 rounded-xl font-medium hover:bg-amber-50 transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                <PlusCircle className="w-4 h-4" />
                නව සමූහය
              </button>
              <button className="px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl font-medium transition-all duration-200 border border-white/20">
                <Settings className="w-4 h-4 inline mr-1" />
                සැකසුම්
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Hint */}
      <div className="container mx-auto px-4 pb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <span>💡</span>
          <span>ඉඟිය:</span>
          <span className="text-gray-500">
            සමූහයක් මත ක්ලික් කිරීමෙන් විස්තර බලන්න
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ongoin;
