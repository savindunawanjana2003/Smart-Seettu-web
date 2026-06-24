
import React, { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import { setShowEmailIcon } from "../redux/slice/mailSlice";
import { useDispatch } from "react-redux";

const JitsiColle: React.FC = () => {
  const location = useLocation();
  const [groupname, setgroupname] = useState("");
  const [adminName, setadminName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // setneedTosendEmail(false);
    localStorage.setItem("sendAlateForUsers", "true");
  }, []);

  useEffect(() => {
    if (location.state) {
      const { groupname: stateGroupname, adminName: stateAdminName } =
        location.state as {
          groupname?: string;
          adminName?: string;
        };
      if (stateGroupname) setgroupname(stateGroupname);
      if (stateAdminName) setadminName(stateAdminName);
    }
  }, [location.state]);

  // const jitsiApiRef = useRef<any>(null);
  const navigate = useNavigate();

  const jaasAppId = "vpaas-magic-cookie-afa8f7c5e8ea414e86cbf77fd2b6cc23";
  const roomName = `${jaasAppId}/${groupname}`;

  return (
    <div
      style={{
        height: "calc(100vh - 4rem)",
        width: "100%",
      }}
    >
      <JitsiMeeting
        domain="8x8.vc"
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          disableThirdPartyRequests: true,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          HIDE_INVITE_YOUR_TEAM: true,
        }}
        userInfo={{
          displayName: adminName,
          email: adminName,
        }}
        onReadyToClose={() => {
          navigate("/pages/Dashbord/Vidiocoll");
          dispatch(setShowEmailIcon(false));
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
          iframeRef.style.width = "100%";
        }}
      />
    </div>
  );
};

export default JitsiColle;
