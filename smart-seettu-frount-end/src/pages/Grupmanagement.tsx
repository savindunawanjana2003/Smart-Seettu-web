import { useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineDelete,
  AiOutlineSave,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { createGrup } from "../service/grup";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";

const A = () => {
  const profailuser = useSelector(
    (state: RootState) => state.customer.currentCustomer,
  );

  const [groupData, setGroupData] = useState({
    adminid: "ADMIN-001",
    memberCount: "",
    expectedMonthlySeettuAmount: "",
    monthlyContributionPerMember: "",
    seettuDurationInMonths: "",
  });

  const [members, setMembers] = useState([]);

  const [newMember, setNewMember] = useState({
    memberId: "",
    membername: "",
    contactnumber: "",
    tagname: "member",
  });

  const handleGroupInputChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleMemberInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const addMemberToList = (e) => {
    e.preventDefault();
    if (
      !newMember.memberId ||
      !newMember.membername ||
      !newMember.contactnumber
    ) {
      alert("කරුණාකර සාමාජිකයාගේ සියලුම විස්තර ඇතුළත් කරන්න.");
      return;
    }
    setMembers([...members, newMember]);
    setNewMember({
      memberId: "",
      membername: "",
      contactnumber: "",
      tagname: "member",
    });
  };

  // member kenek cart eken delete karanne meken
  const removeMemberFromList = (id) => {
    setMembers(
      members.filter((m) => m.memberId !== id || m.tagname === "admin"),
    );
  };

  const saveToServer = async () => {
    const admin = profailuser;
    const adminObject = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      phone: admin.phone,
      tagname: "admin",
    };

    const newmembersList = members;
    const availableMembers = members.length;

    const generatedAdminId = `M-${String(availableMembers + 1).padStart(3, "0")}`;
    adminObject.id = generatedAdminId;
    newmembersList.push(adminObject);

    const newGrup = {
      adminid: groupData.adminid,
      memberCount: groupData.memberCount,
      expectedMonthlySeettuAmount: groupData.expectedMonthlySeettuAmount,
      monthlyContributionPerMember: groupData.monthlyContributionPerMember,
      seettuDurationInMonths: groupData.seettuDurationInMonths,
      members: newmembersList,
    };

    try {
      const res = await createGrup(newGrup);

      if (res?.status === 201 || res?.status === 200) {
        Swal.fire({
          title: "✅ Group Created Successfully",
          text: "Your group has been registered officially.",
          icon: "success",
          position: "top-end",
          toast: true,
          timer: 4000,
          showConfirmButton: false,
        });

        const clearDeatiles = {
          adminid: "",
          memberCount: "",
          expectedMonthlySeettuAmount: "",
          monthlyContributionPerMember: "",
          seettuDurationInMonths: "",
          members: "",
        };

        setGroupData(clearDeatiles);
        setMembers([]);
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "❌ Save Unsuccessful",
        text: "Failed to save the group. Please check your inputs and try again.",
        icon: "error",
        position: "top-end",
        toast: true,
        timer: 4000,
        showConfirmButton: false,
      });
    }
  };

  const saveGroupToDatabase = () => {
    if (
      !groupData.expectedMonthlySeettuAmount ||
      !groupData.memberCount ||
      !groupData.monthlyContributionPerMember ||
      !groupData.seettuDurationInMonths
    ) {
      Swal.fire({
        title: "⚠️ Incomplete Form",
        text: "Please fill in all required fields before submitting.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    if (members.length === 0) {
      Swal.fire({
        title: "⚠️ Incomplete Group",
        text: "Are you sure you want to add a new group without any other members?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#dc3545",
      }).then((result) => {
        if (result.isConfirmed) {
          saveToServer();
        }
      });
    } else {
      saveToServer();
    }
  };

  return (
    <div className="w-full text-gray-950 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-950 to-amber-600 bg-clip-text text-transparent">
          Create New Seettu Group
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          සීට්ටු කණ්ඩායම් නිර්මාණය සහ සාමාජිකයින් ඇතුළත් කිරීම
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-cyan-950 tracking-wider uppercase mb-2">
            1. Group Details
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-cyan-950 mb-1 font-medium">
                Expected Monthly Amount (මුළු මාසික මුදල)
              </label>
              <input
                type="text"
                name="expectedMonthlySeettuAmount"
                value={groupData.expectedMonthlySeettuAmount}
                onChange={handleGroupInputChange}
                placeholder="Rs. 50,000"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-xs text-cyan-950 mb-1 font-medium">
                Monthly Contribution per Member (සාමාජිකයෙකුගේ මාසික මුදල)
              </label>
              <input
                type="text"
                name="monthlyContributionPerMember"
                value={groupData.monthlyContributionPerMember}
                onChange={handleGroupInputChange}
                placeholder="Rs. 5,000"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-cyan-950 mb-1 font-medium">
                  Member Count (සාමාජිකයින් ගණන)
                </label>
                <input
                  type="text"
                  name="memberCount"
                  value={groupData.memberCount}
                  onChange={handleGroupInputChange}
                  placeholder="10"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-cyan-950 mb-1 font-medium">
                  Duration in Months (කාලය - මාස)
                </label>
                <input
                  type="text"
                  name="seettuDurationInMonths"
                  value={groupData.seettuDurationInMonths}
                  onChange={handleGroupInputChange}
                  placeholder="10"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-blue-950 tracking-wider uppercase mb-2">
            2. Add New Member
          </h3>

          <form onSubmit={addMemberToList} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-cyan-950 mb-1 font-medium">
                  Member ID (යූසර් ID)
                </label>
                <input
                  type="text"
                  name="memberId"
                  value={newMember.memberId}
                  onChange={handleMemberInputChange}
                  placeholder="USR-102"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-cyan-950 mb-1 font-medium">
                  Member Name (නම)
                </label>
                <input
                  type="text"
                  name="membername"
                  value={newMember.membername}
                  onChange={handleMemberInputChange}
                  placeholder="Kamal Perera"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-xs text-cyan-950 mb-1 font-medium">
                  Contact Number (දුරකථනය)
                </label>
                <input
                  type="text"
                  name="contactnumber"
                  value={newMember.contactnumber}
                  onChange={handleMemberInputChange}
                  placeholder="071XXXXXXX"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <AiOutlineUserAdd size={16} />
                <span>Add to List</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700 tracking-wider uppercase">
            Members Added ({members.length})
          </h3>
          <span className="text-xs text-gray-500 font-mono">
            Max: {groupData.memberCount || "0"}
          </span>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 text-xs font-semibold">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Role Tag</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member) => (
                <tr
                  key={member.memberId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-mono text-xs text-gray-700">
                    {member.memberId}
                  </td>
                  <td className="p-3 font-medium text-gray-900">
                    {member.membername}
                  </td>
                  <td className="p-3 text-gray-600">{member.contactnumber}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${
                        member.tagname === "admin"
                          ? "bg-amber-100 text-amber-700 border-amber-300"
                          : "bg-green-100 text-green-700 border-green-300"
                      }`}
                    >
                      {member.tagname}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {member.tagname !== "admin" ? (
                      <button
                        onClick={() => removeMemberFromList(member.memberId)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                      >
                        <AiOutlineDelete size={16} />
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-mono">
                        Creator
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={saveGroupToDatabase}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 transform hover:scale-[1.01] transition-all"
        >
          <AiOutlineSave size={18} />
          <span>Save & Create Group</span>
        </button>
      </div>
    </div>
  );
};

export default A;
