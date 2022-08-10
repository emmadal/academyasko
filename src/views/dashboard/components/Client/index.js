/* eslint-disable no-nested-ternary */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

import { getCookie, getMyStudentList } from "api";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

function Client() {
  const [controller, dispatch] = useMaterialUIController();
  const token = getCookie("askoacademy-token");
  const { userProfile } = controller;
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    if (userProfile?.user_type === "teacher" || userProfile?.user_type === "coach") {
      const res = await getMyStudentList(userProfile?.id, token);
      if (res.success) {
        setStudents([...res.data]);
      }
    }
  };

  useEffect(() => {
    getStudents();
    return () => null;
  }, []);

  const showRow = () => ({
    rows: students.flatMap((student) => ({
      name: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {student?.name}
        </MDTypography>
      ),
      user_type: (
        <MDTypography variant="text" color="dark">
          {student?.user_type === "high_school_student"
            ? "Lycéen"
            : student?.user_type === "student"
            ? "Etudiant"
            : student?.user_type === "schoolboy"
            ? "Ecolier"
            : student?.user_type === "collge_student"
            ? "Collégien"
            : null}
        </MDTypography>
      ),
    })),
  });

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Mes clients
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{
            columns: [
              { Header: "Nom", accessor: "name", align: "left" },
              { Header: "Niveau", accessor: "user_type", align: "left" },
            ],
            rows: [...showRow().rows],
          }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Client;
