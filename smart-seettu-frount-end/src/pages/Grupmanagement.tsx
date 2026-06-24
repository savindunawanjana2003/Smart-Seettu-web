import { useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineDelete,
  AiOutlineSave,
} from "react-icons/ai";
import Swal from "sweetalert2";
import {
  createGrup,
  // getAllGrupmembersWholeGrup,
  getNextGrupId,
} from "../service/grup";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// export let nextgrupId = "";

const Grupmanagement = () => {
  const profailuser = useSelector(
    (state: RootState) => state.customer.currentCustomer,
  );
  // const [grupId, setGrupId] = useState("");
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState({
    adminid: "ADMIN-001",
    memberCount: "",
    expectedMonthlySeettuAmount: "",
    monthlyContributionPerMember: "",
    seettuDurationInMonths: "",
  });

  const [members, setMembers] = useState<
    Array<{
      memberId: string;
      membername: string;
      contactnumber: string;
      tagname: string;
    }>
  >([]);

  const [newMember, setNewMember] = useState({
    memberId: "",
    membername: "",
    contactnumber: "",
    tagname: "member",
  });

  useEffect(() => {
    getmemberId();
  }, [members]);

  const handleGroupInputChange = (e: any) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleMemberInputChange = (e: any) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const addMemberToList = (e: any) => {
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
  };

  // member kenek cart eken delete karanne meken
  const removeMemberFromList = (id: any) => {
    setMembers(
      members.filter((m) => m.memberId !== id || m.tagname === "admin"),
    );
    getmemberId();
  };

  const saveToServer = async () => {
    const admin: any = profailuser;

    console.log(admin.id);
    console.log(admin);

    const adminObject = {
      memberId: admin.id,
      email: admin.email,
      membername: admin.name,
      contactnumber: admin.phone,
      tagname: "admin",
    };

    const newmembersList = members;
    const availableMembers = members.length;

    const generatedAdminId = `M-${String(availableMembers + 1).padStart(3, "0")}`;
    adminObject.memberId = generatedAdminId;
    newmembersList.push(adminObject);

    const newGrup = {
      adminid: admin.id,
      memberCount: groupData.memberCount,
      expectedMonthlySeettuAmount: groupData.expectedMonthlySeettuAmount,
      monthlyContributionPerMember: groupData.monthlyContributionPerMember,
      seettuDurationInMonths: groupData.seettuDurationInMonths,
      members: newmembersList,
    };

    try {
      console.log(
        "--------------------------------------------------------077777777777777",
      );
      // console.log(newGrup.members);
      const resp = await getNextGrupId();
      const nextGroupId = resp.nextGroupId;
      // setGrupId(nextGroupId);

      console.log(
        "--------------------------------------------------------077777777777777",
      );

      // alert(nextGroupId);
      // nextgrupId = nextGroupId;
      // setGrupId(nextGroupId);
      const res = await createGrup(newGrup);

      if (res?.status === 201 || res?.status === 200) {
        Swal.fire({
          title: "Group Created Successfully",
          text: "Your group has been registered officially.",
          icon: "success",
          position: "top-end",
          toast: true,
          timer: 4000,
          showConfirmButton: false,
        });

        localStorage.setItem("curentGrupId", nextGroupId);
        await alert(" save the text id lacal storege : " + nextGroupId);

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

        // navigate("../nextGrupmanagementGrup", {
        //   state: {
        //     groupId: nextGroupId,
        //     memberCount: groupData.memberCount,
        //   },
        // });

        navigate("/pages/Dashbord/CurrentgroupDetails", {
          replace: true,
          state: {
            groupId: nextGroupId,
            memberCount: groupData.memberCount,
          },
        });
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: " Save Unsuccessful",
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
        title: " Incomplete Form",
        text: "Please fill in all required fields before submitting.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    if (members.length === 0) {
      Swal.fire({
        title: " Incomplete Group",
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

  const getmemberId = () => {
    if (members.length === 0) {
      setNewMember({
        ...newMember,
        memberId: "M-001",
      });
    } else if (members.length > 0) {
      const avelableCount = members.length;
      const generatedAdminId = `M-${String(avelableCount + 1).padStart(3, "0")}`;
      setNewMember({
        ...newMember,
        memberId: generatedAdminId,
        membername: "",
        contactnumber: "",
      });
    }
  };

  //  membername: "",
  //   //   contactnumber: "",

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 shadow-lg">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-950 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Create New Seettu Group
          </h2>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
            සීට්ටු කණ්ඩායම් නිර්මාණය සහ සාමාජිකයින් ඇතුළත් කිරීම
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Group Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-amber-100">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-950 to-amber-600 rounded-full"></div>
              <h3 className="text-sm font-bold text-cyan-950 tracking-wider uppercase">
                1. Group Details
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                  Expected Monthly Amount (මුළු මාසික මුදල)
                </label>
                <input
                  type="text"
                  name="expectedMonthlySeettuAmount"
                  value={groupData.expectedMonthlySeettuAmount}
                  onChange={handleGroupInputChange}
                  placeholder="Rs. 50,000"
                  className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                  Monthly Contribution per Member (සාමාජිකයෙකුගේ මාසික මුදල)
                </label>
                <input
                  type="text"
                  name="monthlyContributionPerMember"
                  value={groupData.monthlyContributionPerMember}
                  onChange={handleGroupInputChange}
                  placeholder="Rs. 5,000"
                  className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                    Member Count (සාමාජිකයින් ගණන)
                  </label>
                  <input
                    type="text"
                    name="memberCount"
                    value={groupData.memberCount}
                    onChange={handleGroupInputChange}
                    placeholder="10"
                    className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                    Duration in Months (කාලය - මාස)
                  </label>
                  <input
                    type="text"
                    name="seettuDurationInMonths"
                    value={groupData.seettuDurationInMonths}
                    onChange={handleGroupInputChange}
                    placeholder="10"
                    className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add Member Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-amber-100">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-950 to-amber-600 rounded-full"></div>
              <h3 className="text-sm font-bold text-cyan-950 tracking-wider uppercase">
                2. Add New Member
              </h3>
            </div>

            <form onSubmit={addMemberToList} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                    Member ID (යූසර් ID)
                  </label>
                  <input
                    type="text"
                    name="memberId"
                    value={newMember.memberId}
                    onChange={handleMemberInputChange}
                    placeholder="USR-102"
                    className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                    Member Name (නම)
                  </label>
                  <input
                    type="text"
                    name="membername"
                    value={newMember.membername}
                    onChange={handleMemberInputChange}
                    placeholder="Kamal Perera"
                    className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-xs text-cyan-950 mb-2 font-semibold uppercase tracking-wide">
                    Contact Number (දුරකථනය)
                  </label>
                  <input
                    type="text"
                    name="contactnumber"
                    value={newMember.contactnumber}
                    onChange={handleMemberInputChange}
                    placeholder="071XXXXXXX"
                    className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <AiOutlineUserAdd size={18} />
                  <span>Add to List</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Members Table Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-950 to-amber-600 rounded-full"></div>
              <h3 className="text-sm font-bold text-cyan-950 tracking-wider uppercase">
                Members Added
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                {members.length}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                / Max: {groupData.memberCount || "0"}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-white text-gray-600 border-b-2 border-amber-100 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Role Tag</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member) => (
                  <tr
                    key={member.memberId}
                    className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
                  >
                    <td className="p-4 font-mono text-xs font-semibold text-gray-700">
                      {member.memberId}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {member.membername}
                    </td>
                    <td className="p-4 text-gray-600">
                      {member.contactnumber}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          member.tagname === "admin"
                            ? "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300"
                            : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300"
                        }`}
                      >
                        {member.tagname === "admin" ? "👑 Admin" : "👤 Member"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {member.tagname !== "admin" ? (
                        <button
                          onClick={() => removeMemberFromList(member.memberId)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 transform hover:scale-110"
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1 rounded-full">
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

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={saveGroupToDatabase}
            className="group bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          >
            <AiOutlineSave
              size={20}
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="tracking-wide">Save & Create Group</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grupmanagement;
