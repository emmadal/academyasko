/* eslint-disable no-constant-condition */
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TaskAlert from "components/TaskAlert";
import MDAlert from "components/MDAlert";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import TaskCard from "molecules/TaskCard";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import ReactQuill from "react-quill";

import { getExercicesByAuthor, getCookie } from "api";

function Tasks() {
  const [open, setOpen] = useState(false);
  const [controller] = useMaterialUIController();
  const [exercices, setExercices] = useState([]);
  const token = getCookie("askoacademy-token");
  const { userProfile } = controller;
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [value, setValue] = useState("");

  const getExercices = async () => {
    const res = await getExercicesByAuthor(userProfile?.id, token);
    if (res.success) {
      setExercices([...res.data]);
    }
  };

  useEffect(() => getExercices(), []);

  if (userProfile?.user_type !== ("admin" || "coach" || "teacher")) {
    return (
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDBox mb={1} mt={2}>
          <MDTypography variant="body2" color="dark" fontWeight="bold">
            Listes de mes tâches.
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={3}>
            {exercices.map((exercice) => (
              <Grid item xs={12} md={4} xl={4} key={exercice?.uuid}>
                <TaskCard
                  title={exercice?.title}
                  date_begin={exercice?.date_begin}
                  date_end={exercice?.date_end}
                  description={exercice?.description}
                  authors={[{ image: userProfile?.avatar ?? "", name: userProfile?.name }]}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </MDBox>
    );
  }

  return (
    <>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        {err && (
          <MDAlert color="error" dismissible onClick={() => setErr("")}>
            {err}
          </MDAlert>
        )}
        {success && (
          <MDAlert color="success" dismissible onClick={() => setSuccess("")}>
            {success}
          </MDAlert>
        )}
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
        <Grid container spacing={3}>
          {exercices.map((exercice) => (
            <Grid item xs={12} md={4} xl={4} key={exercice?.uuid}>
              <TaskCard
                title={exercice?.title}
                date_begin={exercice?.date_begin}
                date_end={exercice?.date_end}
                description={exercice?.description}
                authors={[{ image: userProfile?.avatar ?? "", name: userProfile?.name }]}
              />
            </Grid>
          ))}
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
      <TaskAlert
        open={open}
        setOpen={setOpen}
        authorId={userProfile?.id}
        setSuccess={setSuccess}
        setErr={setErr}
      />
    </>
  );
}

export default Tasks;
