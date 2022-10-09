/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProject from "components/MDProject";
import { useMaterialUIController } from "context";

import { getCookie, getExercicesByAuthor, getMyTrainersList } from "api";

function Projects() {
  const [controller] = useMaterialUIController();
  const { userProfile } = controller;
  const token = getCookie("askoacademy-token");
  const [exercices, setExercices] = useState([]);

  const getExoByTrainer = async () => {
    const res = await getMyTrainersList(userProfile?.id, token);
    if (res?.success) {
      let obj = {};
      const data = [];
      res.data.map(async (trainer) => {
        const exo = await getExercicesByAuthor(trainer.id, token);
        if (exo?.success) {
          for (const iterator of exo.data) {
            obj = { ...iterator, author: trainer.name };
            data.push(obj);
          }
          setExercices([...data]);
        }
      });
    }
  };

  useEffect(() => {
    getExoByTrainer();
  }, []);

  const showRow = () => ({
    rows: exercices.reverse().flatMap((exercice) => ({
      title: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {exercice.title}
        </MDTypography>
      ),
      author: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {exercice.author}
        </MDTypography>
      ),
      date_begin: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {exercice.date_begin}
        </MDTypography>
      ),
      date_end: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {exercice.date_end}
        </MDTypography>
      ),
    })),
  });

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Tâches
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3}>
        <MDProject
          table={{
            columns: [
              { Header: "Titre", accessor: "title", align: "left" },
              { Header: "Auteur", accessor: "author", align: "left" },
              { Header: "Date de debut", accessor: "date_begin", align: "left" },
              { Header: "Date de fin", accessor: "date_end", align: "left" },
            ],
            rows: [...showRow().rows],
          }}
          isSorted
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
