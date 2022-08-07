/* eslint-disable no-constant-condition */
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TaskAlert from "components/TaskAlert";

// @mui material components
import Grid from "@mui/material/Grid";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import team1 from "assets/images/team-1.jpg";

// Material Dashboard 2 React example components
import TaskCard from "molecules/TaskCard";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import ReactQuill from "react-quill";

function Tasks() {
  const [open, setOpen] = useState(false);
  const [controller] = useMaterialUIController();
  const { userProfile } = controller;
  const [value, setValue] = useState("");

  return (
    <>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDButton variant="gradient" color="info" mb={2} onClick={() => setOpen(!open)}>
          Ajouter un exercice
        </MDButton>
        <MDBox mb={1} mt={2}>
          <MDTypography variant="body2" color="dark" fontWeight="bold">
            Vous trouverez ci-dessous, la liste de vos exercies.
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={3}>
            <TaskCard
              image={homeDecor1}
              label="project #2"
              title="modern"
              description="As Uber works through a huge amount of internal management turmoil."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "Consulter l'exercice",
              }}
              authors={[{ image: userProfile?.avatar ?? team1, name: userProfile?.name }]}
            />
          </Grid>
        </Grid>
      </MDBox>
      {userProfile?.user_type === "teacher" ? (
        <MDBox mb={1} mt={2}>
          <MDTypography variant="h3" color="dark" fontWeight="bold">
            Examens
          </MDTypography>
          <MDTypography variant="body2" color="dark">
            Rédigez vos sujets d&#39;examen ci-dessous.
          </MDTypography>
          <MDBox mt={2}>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                  ["link", "image"],
                  ["clean"],
                  ["print"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
              ]}
            />
            <MDButton
              variant="gradient"
              color="info"
              sx={{ marginTop: 5 }}
              onClick={() => window.console.log(value)}
            >
              Ajouter l&#39;examen
            </MDButton>
          </MDBox>
        </MDBox>
      ) : null}
      <TaskAlert open={open} setOpen={setOpen} />
    </>
  );
}

export default Tasks;
