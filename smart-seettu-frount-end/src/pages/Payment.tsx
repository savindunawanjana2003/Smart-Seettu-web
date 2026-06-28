import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import PaymentEntry from "../pages/Paymententrypage";
import { Loader2 } from "lucide-react";
// import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setShowEmailIcon } from "../redux/slice/mailSlice";
// import PaymentButton from "../components/Payhearui";
import PaymentEntry from "./Paymententrypage";

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
  // description: string;
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

const Payment = () => {
  const dispatch = useDispatch();

  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    dispatch(setShowEmailIcon(false));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const sampleGroup: Group = {
          id: groupId || "G001",
          name: "සීට්ටු සමූහය 2026",
          // description: "මාසික සීට්ටු සමූහය - ජනවාරි 2026",
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
          members: [],
        };
        setGroup(sampleGroup);

        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, [groupId]);

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
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {group?.name || "සීට්ටු ගෙවීම්"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto"></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white">
        <PaymentEntry
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
        />
        ;
      </div>
    </div>
  );
};

export default Payment;
