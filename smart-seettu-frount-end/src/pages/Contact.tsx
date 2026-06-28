import React, { useState, useEffect } from "react";
import { Search, MapPin, UserPlus, X, Mail, Phone } from "lucide-react";
import { getCustomers, createCustomer } from "../service/contact";
import { useDispatch } from "react-redux";
import { setShowEmailIcon } from "../redux/slice/mailSlice";
import EmailModal from "../components/EmailModalForContactmember";

const Contact = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmailFromcontact, setshowEmailFromcontact] = useState(false);
  const [getEmailasText, setgetEmailasText] = useState("");
  const [nameOfmember, setnameOfmember] = useState("");

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
    nic: "",
    poneNumber: "",
    address: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowEmailIcon(false));
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getCustomers();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer(newMember);
      setShowAddModal(false);
      setNewMember({
        name: "",
        email: "",
        password: "",
        nic: "",
        poneNumber: "",
        address: "",
      });
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const filteredMembers = members.filter(
    (member: any) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sendEmail = () => {
    setshowEmailFromcontact(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-4xl md:text-5, font-bold text-gray-800 mb-2">
              අපගේ සාමාජිකයින්
            </h1>
            <p className="text-gray-500 text-lg">Our Registered Members</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add New Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member: any) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl p-6 shadow-md cursor-pointer border border-gray-100"
              onClick={() =>
                setSelectedMember(
                  selectedMember?._id === member._id ? null : member,
                )
              }
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {member.address}
              </p>

              {selectedMember?._id === member._id && (
                <div
                  className="mt-4 pt-4 border-t border-gray-200 space-y-2"
                  // onClick={() => {
                  //   setnameOfmember(member.name);
                  // }}
                >
                  <p
                    onClick={() => {
                      // alert(member.email + "" + member.name);
                      sendEmail();
                      setgetEmailasText(member.email);
                      setnameOfmember(member.name);
                    }}
                    // onClick={sendEmail}
                    className="text-gray-600 text-sm flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-blue-500" /> {member.email}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" />{" "}
                    {member.poneNumber}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {showEmailFromcontact && (
          <EmailModal
            isOpen={showEmailFromcontact}
            onClose={() => {
              setshowEmailFromcontact(false);
            }}
            memberEmail={getEmailasText}
            memberName={nameOfmember}
          />
        )}

        {/* Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Add New Member</h2>
                <button onClick={() => setShowAddModal(false)}>
                  <X />
                </button>
              </div>
              <form onSubmit={handleAddMember} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full p-3 border rounded-xl"
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 border rounded-xl"
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full p-3 border rounded-xl"
                  onChange={(e) =>
                    setNewMember({ ...newMember, password: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="NIC"
                  required
                  className="w-full p-3 border rounded-xl"
                  onChange={(e) =>
                    setNewMember({ ...newMember, nic: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  className="w-full p-3 border rounded-xl"
                  onChange={(e) =>
                    setNewMember({ ...newMember, poneNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  className="w-full p-3 border rounded-xl"
                  onChange={(e) =>
                    setNewMember({ ...newMember, address: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-xl"
                >
                  Save Member
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
