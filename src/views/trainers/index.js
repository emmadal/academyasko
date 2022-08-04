/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";

// @mui material components
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

function Trainers() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} xl={6} />
        <Grid item xs={12} md={6} xl={6} />
      </Grid>
    </DashboardLayout>
  );
}

export default Trainers;
