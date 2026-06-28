import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import PaymentEntry from "../pages/Paymententrypage";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  Loader2,
  Crown,
} from "lucide-react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setShowEmailIcon } from "../redux/slice/mailSlice";
import PaymentButton from "../components/Payhearui";

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
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(setShowEmailIcon(false));
  }, []);

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
                {/* <p className="text-sm text-gray-500">
                  {group?.description} • සාමාජිකයින් {group?.totalMembers}
                  මාසික දායකත්වය Rs. {group?.monthlyAmount?.toLocaleString()}
                </p> */}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white">
        <PaymentButton />;
        {/* <PaymentEntry
          onProceedToPayment={function (data: {
            fullName: string;
            customerPhone: string;
            email: string;
            groupName: string;
            memberType: string;
            selectedMonth: string;
            amount: string;
            selectedPaymentMethod: string;
            groupDetails?: {
              id: number;
              name: string;
              memberCount: number;
              monthlyFee: number;
            };
          }): void {
            throw new Error("Function not implemented.");
          }}
        /> */}
      </div>
    </div>
  );
};

export default Payment;
