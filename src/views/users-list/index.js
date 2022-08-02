import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import UserModal from "components/UserModal";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import Footer from "molecules/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "views/users-list/data/authorsTableData";

function UsersList() {
  const { columns, rows } = authorsTableData();
  const [open, setOpen] = useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <UserModal open={open} setOpen={setOpen} />
      <MDBox mb={1}>
        <MDButton variant="gradient" color="info" onClick={() => setOpen(!open)}>
          Ajouter un utilisateur
        </MDButton>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Liste des utilisateurs
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UsersList;
