/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useState, useRef } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// @jitsi components
import { JitsiMeeting } from "@jitsi/react-sdk";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function BroadCast() {
  const apiRef = useRef();
  const [logItems, updateLog] = useState([]);
  const [meeting, setMeeting] = useState(false);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);

  const printEventOutput = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog((items) => [...items, `${feature} off`]);
    } else {
      updateLog((items) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand("toggleChat");
    updateLog((items) => [...items, `you have ${payload.unreadCount} unread messages`]);
  };

  const handleKnockingParticipant = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants((participants) => [...participants, payload?.participant]);
  };

  const resolveKnockingParticipants = (condition) => {
    knockingParticipants.forEach((participant) => {
      apiRef.current.executeCommand(
        "answerKnockingParticipant",
        participant?.id,
        condition(participant)
      );
      updateKnockingParticipants((participants) =>
        participants.filter((item) => item.id === participant.id)
      );
    });
  };

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.border = "10px solid #3d3d3d";
    iframeRef.style.background = "#3d3d3d";
    iframeRef.style.height = "650px";
  };

  const handleApiReady = (apiObj) => {
    window.console.log(apiObj);
    apiRef.current = apiObj;
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
    apiRef.current.on("audioMuteStatusChanged", (payload) =>
      handleAudioStatusChange(payload, "audio")
    );
    apiRef.current.on("videoMuteStatusChanged", (payload) =>
      handleAudioStatusChange(payload, "video")
    );
    apiRef.current.on("raiseHandUpdated", printEventOutput);
    apiRef.current.on("titleViewChanged", printEventOutput);
    apiRef.current.on("chatUpdated", handleChatUpdates);
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
  };

  const handleReadyToClose = () => window.alert("Ready to close...");

  const generateRoomName = () => `askoacademy${Math.random() * 100}-${Date.now()}`;

  const renderSpinner = () => <CircularProgress color="light" size={60} />;

  const startMeeting = () => setMeeting(true);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={1}>
        {!meeting && (
          <MDButton variant="gradient" color="info" onClick={startMeeting}>
            Démarrer un diffusion
          </MDButton>
        )}
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {meeting && (
              <JitsiMeeting
                roomName={generateRoomName()}
                spinner={renderSpinner}
                config={{
                  subject: "",
                  hideConferenceSubject: false,
                  enableClosePage: true,
                }}
                onApiReady={(externalApi) => handleApiReady(externalApi)}
                onReadyToClose={handleReadyToClose}
                getIFrameRef={handleJitsiIFrameRef1}
              />
            )}
          </Grid>
        </Grid>
      </MDBox>
      {meeting && <Footer />}
    </DashboardLayout>
  );
}

export default BroadCast;
