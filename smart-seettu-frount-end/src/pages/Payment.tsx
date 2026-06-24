import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  // Calendar,
  DollarSign,
  // Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  // Filter,
  Download,
  Send,
  Printer,
  Eye,
  CreditCard,
  Wallet,
  // TrendingUp,
  // Award,
  AlertCircle,
  Loader2,
  // ChevronDown,
  // ChevronUp,
  // UserCheck,
  // UserX,
  Bell,
  // Mail,
  // Phone,
  // FileText,
  Upload,
  Image,
  // MessageSquare,
  // ThumbsUp,
  // ThumbsDown,
  AlertTriangle,
  Info,
  Shield,
  UserCog,
  Crown,
  Settings,
  BarChart3,
  // PieChart,
  // Activity,
  // Zap,
  // Star,
  // Medal,
  // Gift,
  // Heart,
} from "lucide-react";
import Swal from "sweetalert2";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate?: string;
  totalPaid?: number;
  lastPayment?: string;
  paymentStatus?: "paid" | "pending" | "overdue";
}

interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  month: string;
  year: number;
  status: "paid" | "pending" | "overdue";
  paymentDate?: string;
  paymentMethod?: "cash" | "bank" | "online";
  transactionId?: string;
  notes?: string;
  bankReceipt?: string;
  receiptImage?: string;
  verifiedBy?: string;
  verifiedDate?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  adminId: string;
  adminName: string;
  members: Member[];
  monthlyAmount: number;
  totalMembers: number;
  startDate: string;
  duration: number;
  currentMonth: number;
  totalCollected: number;
  pendingAmount: number;
  overdueAmount: number;
}

interface PaymentNotification {
  id: string;
  memberId: string;
  memberName: string;
  type: "reminder" | "overdue" | "payment_received" | "payment_verified";
  message: string;
  date: string;
  read: boolean;
}

const Payment = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [notifications, setNotifications] = useState<PaymentNotification[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "bank" | "online"
  >("cash");
  const [paymentNote, setPaymentNote] = useState("");
  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showStatsPanel, setShowStatsPanel] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(true); // Set based on user role

  const sinhalaMonths = [
    "ජනවාරි",
    "පෙබරවාරි",
    "මාර්තු",
    "අප්‍රේල්",
    "මැයි",
    "ජූනි",
    "ජූලි",
    "අගෝස්තු",
    "සැප්තැම්බර්",
    "ඔක්තෝබර්",
    "නොවැම්බර්",
    "දෙසැම්බර්",
  ];

  // Sample data - Replace with API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const sampleGroup: Group = {
          id: groupId || "G001",
          name: "සීට්ටු සමූහය 2026",
          description: "මාසික සීට්ටු සමූහය - ජනවාරි 2026",
          adminId: "ADM001",
          adminName: "Kamal Perera",
          monthlyAmount: 10000,
          totalMembers: 8,
          startDate: "2026-01-01",
          duration: 12,
          currentMonth: 1,
          totalCollected: 45000,
          pendingAmount: 25000,
          overdueAmount: 10000,
          members: [
            {
              id: "M001",
              name: "Kamal Perera",
              email: "kamal@email.com",
              phone: "0771234567",
              joinedDate: "2026-01-01",
              totalPaid: 10000,
              lastPayment: "2026-01-15",
              paymentStatus: "paid",
            },
            {
              id: "M002",
              name: "Nimal Fernando",
              email: "nimal@email.com",
              phone: "0719876543",
              joinedDate: "2026-01-01",
              totalPaid: 5000,
              lastPayment: "2026-01-10",
              paymentStatus: "pending",
            },
            {
              id: "M003",
              name: "Sunil Wijesinghe",
              email: "sunil@email.com",
              phone: "0764567890",
              joinedDate: "2026-01-01",
              totalPaid: 0,
              lastPayment: "-",
              paymentStatus: "overdue",
            },
          ],
        };
        setGroup(sampleGroup);

        const samplePayments: Payment[] = sampleGroup.members.map(
          (member, index) => ({
            id: `P${Date.now()}${index}`,
            memberId: member.id,
            memberName: member.name,
            amount: sampleGroup.monthlyAmount / sampleGroup.totalMembers,
            month: "ජනවාරි",
            year: 2026,
            status: index === 0 ? "paid" : index === 1 ? "pending" : "overdue",
            paymentDate: index === 0 ? "2026-01-15" : undefined,
            paymentMethod: index === 0 ? "bank" : undefined,
            transactionId: index === 0 ? `TXN${Date.now()}${index}` : undefined,
            bankReceipt: index === 0 ? "receipt_001.jpg" : undefined,
          }),
        );

        setPayments(samplePayments);

        // Sample notifications
        const sampleNotifications: PaymentNotification[] = [
          {
            id: "N001",
            memberId: "M003",
            memberName: "Sunil Wijesinghe",
            type: "overdue",
            message:
              "Sunil Wijesinghe ගේ ජනවාරි මාසයේ ගෙවීම කල් ඉකුත් වී ඇත. කරුණාකර ගෙවීම කරන්න.",
            date: "2026-01-20",
            read: false,
          },
          {
            id: "N002",
            memberId: "M002",
            memberName: "Nimal Fernando",
            type: "reminder",
            message:
              "Nimal Fernando ට ජනවාරි මාසයේ ගෙවීම සිහිපත් කිරීම. ගෙවීමට දින 5ක් ඉතිරිව ඇත.",
            date: "2026-01-18",
            read: false,
          },
        ];
        setNotifications(sampleNotifications);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, [groupId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "overdue":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "ගෙවා ඇත";
      case "pending":
        return "රැඳී සිටින";
      case "overdue":
        return "කල් ඉකුත්";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method?: string) => {
    switch (method) {
      case "cash":
        return "මුදල්";
      case "bank":
        return "බැංකු හුවමාරුව";
      case "online":
        return "ඔන්ලයින්";
      default:
        return "-";
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.memberName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: payments.length,
    paid: payments.filter((p) => p.status === "paid").length,
    pending: payments.filter((p) => p.status === "pending").length,
    overdue: payments.filter((p) => p.status === "overdue").length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    paidAmount: payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0),
  };

  const handlePaymentSubmit = () => {
    const newPayment: Payment = {
      id: `P${Date.now()}`,
      memberId: selectedMember?.id || "",
      memberName: selectedMember?.name || "",
      amount: paymentAmount,
      month: selectedMonth || sinhalaMonths[new Date().getMonth()],
      year: selectedYear,
      status: "pending",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: paymentMethod,
      transactionId: `TXN${Date.now()}`,
      notes: paymentNote,
      bankReceipt: bankReceipt?.name,
    };

    setPayments([...payments, newPayment]);
    setShowPaymentModal(false);
    setSelectedMember(null);
    setPaymentAmount(0);
    setPaymentNote("");
    setBankReceipt(null);
    setReceiptPreview(null);

    Swal.fire({
      title: "ගෙවීම සාර්ථකයි!",
      text: "ඔබගේ ගෙවීම සාර්ථකව ලියාපදිංචි විය. පරිපාලක විසින් තහවුරු කරනු ඇත.",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const handleVerifyPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowVerifyModal(true);
  };

  const confirmVerifyPayment = () => {
    if (selectedPayment) {
      const updatedPayments = payments.map((p) =>
        p.id === selectedPayment.id
          ? {
              ...p,
              status: "paid" as const,
              verifiedBy: "Admin",
              verifiedDate: new Date().toISOString().split("T")[0],
            }
          : p,
      );
      setPayments(updatedPayments);
      setShowVerifyModal(false);

      Swal.fire({
        title: "ගෙවීම තහවුරු කරන ලදි!",
        text: `${selectedPayment.memberName} ගේ ගෙවීම සාර්ථකව තහවුරු කරන ලදි.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSendReminder = (memberId: string, memberName: string) => {
    Swal.fire({
      title: "සිහිපත් කිරීම යවන්න",
      text: `${memberName} ට ගෙවීම සිහිපත් කිරීම යැවීමට අවශ්‍යද?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ඔව්, යවන්න",
      cancelButtonText: "අවලංගු කරන්න",
    }).then((result) => {
      if (result.isConfirmed) {
        const newNotification: PaymentNotification = {
          id: `N${Date.now()}`,
          memberId,
          memberName,
          type: "reminder",
          message: `${memberName} ට ගෙවීම සිහිපත් කිරීම. කරුණාකර ඔබගේ ගෙවීම ඉක්මනින් සිදු කරන්න.`,
          date: new Date().toISOString().split("T")[0],
          read: false,
        };
        setNotifications([newNotification, ...notifications]);

        Swal.fire({
          title: "සිහිපත් කිරීම යවන ලදි!",
          text: `${memberName} ට සිහිපත් කිරීම සාර්ථකව යවන ලදි.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSendOverdueAlert = (memberId: string, memberName: string) => {
    Swal.fire({
      title: "කල් ඉකුත් ගෙවීම් අනතුරු ඇඟවීම",
      text: `${memberName} ට කල් ඉකුත් ගෙවීම් අනතුරු ඇඟවීම යැවීමට අවශ්‍යද?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "ඔව්, යවන්න",
      cancelButtonText: "අවලංගු කරන්න",
    }).then((result) => {
      if (result.isConfirmed) {
        const newNotification: PaymentNotification = {
          id: `N${Date.now()}`,
          memberId,
          memberName,
          type: "overdue",
          message: `⚠️ ${memberName} ගේ ගෙවීම කල් ඉකුත් වී ඇත. කරුණාකර වහාම ගෙවීම සිදු කරන්න.`,
          date: new Date().toISOString().split("T")[0],
          read: false,
        };
        setNotifications([newNotification, ...notifications]);

        Swal.fire({
          title: "අනතුරු ඇඟවීම යවන ලදි!",
          text: `${memberName} ට කල් ඉකුත් ගෙවීම් අනතුරු ඇඟවීම යවන ලදි.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading payment data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {group?.name || "සීට්ටු ගෙවීම්"}
                  </h1>
                  {true && ( //isAdmin
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      පරිපාලක
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {group?.description} • සාමාජිකයින් {group?.totalMembers} •
                  මාසික දායකත්වය Rs. {group?.monthlyAmount?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="relative p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowStatsPanel(!showStatsPanel)}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="container mx-auto px-4 mt-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                දැනුම්දීම්
              </h3>
              <button
                onClick={() => setShowNotificationPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">දැනුම්දීම් නොමැත</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg mb-2 ${
                    notification.read
                      ? "bg-gray-50"
                      : "bg-blue-50 border-l-4 border-blue-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.type === "overdue" && (
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    {notification.type === "reminder" && (
                      <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    {notification.type === "payment_received" && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    )}
                    {notification.type === "payment_verified" && (
                      <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Stats Panel */}
      {showStatsPanel && (
        <div className="container mx-auto px-4 mt-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                සංඛ්‍යාලේඛන
              </h3>
              <button
                onClick={() => setShowStatsPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.paid}
                </p>
                <p className="text-xs text-gray-500">ගෙවා ඇත</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pending}
                </p>
                <p className="text-xs text-gray-500">රැඳී සිටින</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats.overdue}
                </p>
                <p className="text-xs text-gray-500">කල් ඉකුත්</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  Rs. {stats.paidAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">මුළු ගෙවුම්</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-500">මුළු ගෙවීම්</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.paid}
                </p>
                <p className="text-xs text-gray-500">ගෙවා ඇත</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pending}
                </p>
                <p className="text-xs text-gray-500">රැඳී සිටින</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {stats.overdue}
                </p>
                <p className="text-xs text-gray-500">කල් ඉකුත්</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  Rs. {stats.paidAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">මුළු ගෙවුම් මුදල</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="සාමාජිකයෙකු සොයන්න..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">සියල්ල</option>
                <option value="paid">ගෙවා ඇත</option>
                <option value="pending">රැඳී සිටින</option>
                <option value="overdue">කල් ඉකුත්</option>
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">මාසය</option>
                {sinhalaMonths.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[2024, 2025, 2026, 2027].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {isAdmin && (
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "සියලුම සාමාජිකයින්ට දැනුම් දෙන්න",
                      text: "සියලුම සාමාජිකයින්ට ගෙවීම් සිහිපත් කිරීම යැවීමට අවශ්‍යද?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "ඔව්, යවන්න",
                      cancelButtonText: "අවලංගු කරන්න",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: "දැනුම්දීම් යවන ලදි!",
                          text: "සියලුම සාමාජිකයින්ට ගෙවීම් සිහිපත් කිරීම යවන ලදි.",
                          icon: "success",
                          timer: 2000,
                          showConfirmButton: false,
                        });
                      }
                    });
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  සියල්ලටම යවන්න
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    සාමාජික
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    මුදල
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    මාසය
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    තත්වය
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ගෙවීම් ක්‍රමය
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    දිනය
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ක්‍රියා
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                          {payment.memberName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {payment.memberName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {payment.memberId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-800">
                        Rs. {payment.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {payment.month} {payment.year}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}
                      >
                        {getStatusIcon(payment.status)}
                        {getStatusText(payment.status)}
                      </span>
                      {payment.verifiedBy && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          තහවුරු කළේ: {payment.verifiedBy}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {getPaymentMethodText(payment.paymentMethod)}
                      </span>
                      {payment.transactionId && (
                        <p className="text-xs text-gray-400">
                          {payment.transactionId}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {payment.paymentDate || "-"}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isAdmin && payment.status === "pending" && (
                          <button
                            onClick={() => handleVerifyPayment(payment)}
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                            title="ගෙවීම තහවුරු කරන්න"
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                        )}

                        {isAdmin && payment.status !== "paid" && (
                          <>
                            <button
                              onClick={() =>
                                handleSendReminder(
                                  payment.memberId,
                                  payment.memberName,
                                )
                              }
                              className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors"
                              title="සිහිපත් කිරීම යවන්න"
                            >
                              <Bell className="w-4 h-4" />
                            </button>
                            {payment.status === "overdue" && (
                              <button
                                onClick={() =>
                                  handleSendOverdueAlert(
                                    payment.memberId,
                                    payment.memberName,
                                  )
                                }
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                title="කල් ඉකුත් අනතුරු ඇඟවීම"
                              >
                                <AlertTriangle className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}

                        {payment.bankReceipt && (
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "බැංකු රිසිට්පත",
                                html: `<img src="/api/receipts/${payment.bankReceipt}" alt="Receipt" class="max-w-full rounded-lg" />`,
                                confirmButtonText: "හරි",
                              });
                            }}
                            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                            title="රිසිට්පත බලන්න"
                          >
                            <Image className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                          title="විස්තර බලන්න"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">ගෙවීම් නොමැත</p>
                  <p className="text-sm text-gray-400">
                    මෙම සෙවුමට ගෙවීම් කිසිවක් හමු නොවීය
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredPayments.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filteredPayments.length} ගෙවීම්
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors">
                  පෙර
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm">
                  1
                </button>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors">
                  පසු
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">ගෙවීම කරන්න</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                    {selectedMember.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {selectedMember.name}
                    </p>
                    <p className="text-sm text-gray-500">{selectedMember.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ගෙවීම් මුදල (Rs.)
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(parseFloat(e.target.value))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ගෙවීම් මුදල ඇතුලත් කරන්න"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ගෙවීම් ක්‍රමය
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "cash", label: "මුදල්", icon: Wallet },
                      { value: "bank", label: "බැංකුව", icon: CreditCard },
                      { value: "online", label: "ඔන්ලයින්", icon: Send },
                    ].map((method) => (
                      <button
                        key={method.value}
                        onClick={() => setPaymentMethod(method.value as any)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          paymentMethod === method.value
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <method.icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-xs">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    බැංකු රිසිට්පත (විකල්ප)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      {receiptPreview ? (
                        <div className="relative">
                          <img
                            src={receiptPreview}
                            alt="Receipt"
                            className="max-h-40 mx-auto rounded-lg"
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            {bankReceipt?.name}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            රිසිට්පත උඩුගත කරන්න
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG, PDF</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    සටහන් (විකල්ප)
                  </label>
                  <textarea
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="අමතර සටහන්..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                අවලංගු කරන්න
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                ගෙවීම කරන්න
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Payment Modal */}
      {showVerifyModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  ගෙවීම තහවුරු කරන්න
                </h2>
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                  {selectedPayment.memberName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {selectedPayment.memberName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rs. {selectedPayment.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">ගෙවීම් ක්‍රමය</span>
                  <span className="text-sm font-medium text-gray-800">
                    {getPaymentMethodText(selectedPayment.paymentMethod)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">ගනුදෙනු ID</span>
                  <span className="text-sm font-medium text-gray-800">
                    {selectedPayment.transactionId || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">දිනය</span>
                  <span className="text-sm font-medium text-gray-800">
                    {selectedPayment.paymentDate || "-"}
                  </span>
                </div>
                {selectedPayment.notes && (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">සටහන්</span>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {selectedPayment.notes}
                    </p>
                  </div>
                )}
                {selectedPayment.bankReceipt && (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      බැංකු රිසිට්පත
                    </span>
                    <p className="text-sm font-medium text-blue-600 mt-1 cursor-pointer">
                      {selectedPayment.bankReceipt}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  මෙම ගෙවීම තහවුරු කිරීමෙන් පසු එය සාර්ථක ගෙවීමක් ලෙස සටහන් වේ.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                අවලංගු කරන්න
              </button>
              <button
                onClick={confirmVerifyPayment}
                className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                තහවුරු කරන්න
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Summary Card */}
      {isAdmin && (
        <div className="container mx-auto px-4 pb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-600" />
                  පරිපාලක සාරාංශය
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {sinhalaMonths[new Date().getMonth()]}{" "}
                  {new Date().getFullYear()} මාසය සඳහා
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.total}
                  </p>
                  <p className="text-xs text-gray-500">මුළු</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {stats.paid}
                  </p>
                  <p className="text-xs text-gray-500">ගෙවා ඇත</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    {stats.pending}
                  </p>
                  <p className="text-xs text-gray-500">රැඳී සිටින</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {stats.overdue}
                  </p>
                  <p className="text-xs text-gray-500">කල් ඉකුත්</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
