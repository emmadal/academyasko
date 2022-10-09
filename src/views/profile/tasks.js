/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-constant-condition */
import { useState, useEffect, useCallback } from "react";

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

import { getExercicesByAuthor, getCookie } from "api";

function Tasks() {
  const [open, setOpen] = useState(false);
  const [controller] = useMaterialUIController();
  const [exercices, setExercices] = useState([]);
  const token = getCookie("askoacademy-token");
  const { userProfile } = controller;
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const getExercices = useCallback(async () => {
    const res = await getExercicesByAuthor(userProfile?.id, token);
    if (res?.success) {
      setExercices([...res?.data]);
    }
  }, [userProfile?.id, token]);

  useEffect(() => {
    getExercices();
  }, []);

  if (userProfile?.user_type !== "teacher" && userProfile?.user_type !== "coach") {
    return (
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDBox mb={1} mt={2}>
          <MDTypography variant="body1" color="dark" fontWeight="bold">
            Listes de mes tâches.
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={3}>
            {!exercices.length ? (
              <MDBox item mb={1} mt={5}>
                <MDTypography
                  variant="body2"
                  color="dark"
                  fontWeight="bold"
                  textAlign="center"
                  ml={1}
                >
                  Vous n&#39;avez aucune tache disponible
                </MDTypography>
              </MDBox>
            ) : (
              exercices.map((exercice) => (
                <Grid item xs={12} md={4} xl={4} key={exercice?.uuid}>
                  <TaskCard
                    title={exercice?.title}
                    date_begin={exercice?.date_begin}
                    date_end={exercice?.date_end}
                    description={exercice?.description}
                    authors={[{ image: userProfile?.avatar ?? "", name: userProfile?.name }]}
                  />
                </Grid>
              ))
            )}
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
          <MDTypography variant="body1" color="dark" fontWeight="bold">
            Vous trouverez ci-dessous, la liste de vos exercies.
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          {!exercices.length ? (
            <MDBox mb={1} mt={5}>
              <MDTypography variant="body2" color="dark" fontWeight="bold" ml={3}>
                Vous n&#39;avez crée aucune tâche.
              </MDTypography>
            </MDBox>
          ) : (
            exercices.map((exercice) => (
              <Grid item xs={12} md={4} xl={4} key={exercice?.uuid}>
                <TaskCard
                  title={exercice?.title}
                  date_begin={exercice?.date_begin}
                  date_end={exercice?.date_end}
                  description={exercice?.description}
                  authors={[{ image: userProfile?.avatar ?? "", name: userProfile?.name }]}
                />
              </Grid>
            ))
          )}
        </Grid>
      </MDBox>
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
