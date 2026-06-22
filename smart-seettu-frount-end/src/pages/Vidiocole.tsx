import React, { useRef } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate } from "react-router-dom";

const Videocall: React.FC = () => {
  const jitsiApiRef = useRef<any>(null);
  const navigate = useNavigate();

  const jaasAppId = "vpaas-magic-cookie-afa8f7c5e8ea414e86cbf77fd2b6cc23";

  const roomName = `${jaasAppId}/dental-care-room-xyz987`;
  const userName = "Savindu Dev";
  const userEmail = "savindu@example.com";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
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
          displayName: userName,
          email: userEmail,
        }}
        onReadyToClose={() => {
          navigate("/");
        }}
        onApiReady={(externalApi) => {
          jitsiApiRef.current = externalApi;
          console.log("Jitsi Meet API via JaaS is ready");
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
          iframeRef.style.width = "100%";
          iframeRef.style.flex = "1";
        }}
      />
    </div>
  );
};

export default Videocall;
