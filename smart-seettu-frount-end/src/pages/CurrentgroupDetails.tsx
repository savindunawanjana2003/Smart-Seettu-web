import { type grupMember } from "../types/types";
import { useEffect, useState } from "react";
import { getAllGrupmembersWholeGrup } from "../service/grup";

import {
  AiOutlineUsergroupAdd,
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { useLocation } from "react-router";

import { useNavigate } from "react-router";
import { AwardIcon, User } from "lucide-react";

const GrupmanegementSecound = () => {
  const location = useLocation();

  const r = async () => {
    const groupId = await location.state?.groupId;
    const memberCount = await location.state?.memberCount;
    setGrupnumber(groupId);
    setMemberConunt(memberCount);
  };
  // setGrupnumber(groupId);

  const navigate = useNavigate();

  const [grupNumber, setGrupnumber] = useState();

  const [memberCount, setMemberConunt] = useState(1);

  useEffect(() => {
    r();
  }, [location.state]);

  const [grupmembers, setGrupmembers] = useState<grupMember[]>([]);

  const [currentMembers, setCurrentMembers] = useState(1);

  const maxMembers = 10; // කණ්ඩායමේ උපරිම සාමාජිකයින් ගණන

  // පිටුවට ආපු ගමන් මෙම්බර්ස්ලා ගණන ලස්සනට Count වීගෙන යන Animation එකක්
  useEffect(() => {
    if (currentMembers < memberCount) {
      // උදාහරණයකට දැනට සාමාජිකයින් 6ක් ඉන්නවා වගේ පෙන්වීමට
      const timer = setTimeout(() => {
        setCurrentMembers((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentMembers]);

  useEffect(() => {
    // ======================  coll back end api
    if (location.state?.groupId && location.state.memberCount) {
      getGrupmembersfromsever();
    }
  }, [location.state?.groupId]);

  // const [grupmembers, setGrupmembers] = useState<grupMember[]>();

  const getGrupmembersfromsever = async () => {
    const resp = await getAllGrupmembersWholeGrup(
      await location.state?.groupId,
    );
    const grupmMemberlest = resp.memberslist;

    const memberList = [];

    console.log("=============res datas============");
    console.log(grupmMemberlest);
    console.log("=============res datas============");

    for (let i = 0; i < grupmMemberlest.length; i++) {
      const member = {
        memberId: grupmMemberlest[i].memberId,
        name: grupmMemberlest[i].membername,
        contact: grupmMemberlest[i].contactnumber,
      };

      console.log(grupmMemberlest[i].memberId);
      console.log(grupmMemberlest[i].membername);
      console.log(grupmMemberlest[i].contactnumber);
      console.log("===========================okkk===========");

      memberList.push(member);
    }

    console.log("================mrmbr list=====  >> " + memberList);

    setGrupmembers(memberList);

    console.log("===================getGrupmemberfromsever=================");
    console.log(grupmembers);
    console.log("===============grup members(grupmMemberlest)===============");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6 relative font-sans">
      {/* 1. TOP CORNER SIMPLE MESSAGE (ඉහළ කෙළවරේ පණිවිඩය) */}
      <div className="absolute top-4 right-6 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 px-5 py-3 rounded-r-xl shadow-lg flex items-center gap-3 animate-bounce z-10">
        <AiOutlineCheckCircle className="text-emerald-500 text-xl" />
        <span className="text-sm font-medium tracking-wide">
          සීට්ටු සමූහය සාර්ථකව ලියාපදිංචි කරන ලදී!
        </span>
      </div>

      <div className="mt-5 max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-amber-100">
        {/* LEFT COLUMN: USER FRIENDLY ANIMATION & IMAGE */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Pulse Animation එකක් සහිත ලස්සන Visual Element එකක් */}
          <div className="relative w-72 h-72 flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-xl">
            <div className="absolute w-30 h-30 bg-amber-300 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute w-40 h-40 bg-amber-200 rounded-full opacity-40 animate-pulse"></div>
            {/* SVG Illustration - User Friendly Group Image */}
            <svg
              className="w-44 h-44 text-amber-600 relative z-10 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>

          {grupNumber && (
            <div className="bg-amber-100 px-6 py-2 rounded-full shadow-inner">
              <h2 className="text-2xl font-bold text-amber-800">
                කණ්ඩායම #{grupNumber}
              </h2>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-800 mt-2">
            කණ්ඩායම සක්‍රීය වෙමින් පවතී...
          </h2>

          <p className="text-base text-gray-600 max-w-sm leading-relaxed">
            ඔබගේ සීට්ටු සමූහය සාර්ථකව පද්ධතියට ඇතුළත් විය. ඉතිරි සාමාජිකයින්
            සම්බන්ධ වූ සැනින් ක්‍රියාවලිය ඇරඹේ.
          </p>
        </div>

        {/* RIGHT COLUMN: MEMBERS AVAILABILITY CARD */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
            <h3 className="text-md font-semibold tracking-wide text-amber-400 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              සමූහයේ තත්ත්වය (Group Status)
            </h3>
            <span className="bg-amber-500 text-slate-950 text-xs uppercase font-bold px-3 py-1 rounded-full shadow-lg">
              Pending
            </span>
          </div>

          {/* DYNAMIC MEMBER COUNTER DISPLAY */}
          <div className="text-center py-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <p className="text-sm text-slate-400 mb-2 font-medium">
              දැනට සම්බන්ධ වී ඇති සාමාජිකයින් ගණන
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-6xl font-black text-amber-400 transition-all duration-500 animate-scale-up">
                {currentMembers}
              </span>
              <span className="text-3xl text-slate-500 font-light">/</span>
              <span className="text-3xl font-bold text-slate-300">
                {maxMembers}
              </span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>ප්‍රගතිය (Progress)</span>
              <span className="text-amber-400">
                {Math.round((currentMembers / maxMembers) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${(currentMembers / maxMembers) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* INFO MESSAGE */}
          <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-4 flex gap-3 items-start text-sm text-slate-300">
            <AiOutlineInfoCircle className="text-amber-400 text-xl shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              සියලුම සාමාජිකයින් (10) සම්පූර්ණ වූ පසු මාසික වාරික එකතු කිරීමේ සහ
              දිනුම් ඇදීමේ කටයුතු ස්වයංක්‍රීයව ආරම්භ වේ.
            </p>
          </div>
        </div>
      </div>

      {/* MARQUEE SECTION - MEMBERS GRID */}
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
            සාමාජිකයින් ({grupmembers?.length || 0})
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent ml-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {grupmembers?.map((member) => (
            <div
              key={member.memberId}
              className="group flex flex-col items-center bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 text-center font-medium text-slate-700"
            >
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1 w-full">
                <p className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  #{member.memberId}
                </p>
                <h4 className="font-bold text-slate-800 text-sm mt-2">
                  {member.name}
                </h4>
                <p className="text-xs text-slate-500">{member.contact}</p>
              </div>
            </div>
          ))}

          {/* Empty state or loading skeleton */}
          {(!grupmembers || grupmembers.length === 0) && (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 animate-pulse"></div>
                <p className="text-slate-500">සාමාජිකයින් පූරණය වෙමින්...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="flex justify-center pt-12 pb-6">
        <button
          onClick={() => navigate("/pages/Dashbord/pages/A")}
          className="group text-sm font-semibold text-slate-700 bg-white hover:bg-amber-50 px-6 py-3 rounded-xl shadow-md hover:shadow-lg border border-slate-200 transition-all duration-300 flex items-center gap-2 hover:border-amber-300"
        >
          <AiOutlineUsergroupAdd
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
          <span>තවත් කණ්ඩායමක් සාදන්න (Back to Create)</span>
        </button>
      </div>
    </div>
  );
};

export default GrupmanegementSecound;
