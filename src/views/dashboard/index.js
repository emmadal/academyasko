/* eslint-disable no-constant-condition */
/* eslint-disable react/function-component-definition */
import { useEffect, useCallback, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDResult from "components/MDResult";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import StatisticsCard from "views/dashboard/statistics-cards";

// Dashboard components
import Projects from "views/dashboard/components/Projects";
import Client from "views/dashboard/components/Client";

// Material Dashboard 2 React contexts
import { setFetchDetails, useMaterialUIController } from "context";

// api call
import { getUserById, getCookie, getAllUsers } from "api";

function Dashboard() {
  const [controller, dispatch] = useMaterialUIController();
  const [totalUser, setTotalUser] = useState(null);
  const token = getCookie("askoacademy-token");
  const { userProfile } = controller;

  const getUserDetails = useCallback(async () => {
    const res = await getUserById(userProfile?.id, token);
    if (res?.success) {
      // Dispatch Login
      setFetchDetails(dispatch, res?.data);
    }
  }, [dispatch]);

  const getUserList = useCallback(async () => {
    const res = await getAllUsers(token);
    if (res?.success) {
      let total = 0;
      let name = "";
      // eslint-disable-next-line no-restricted-syntax
      for (const i of res.data) {
        name = i.user_type;
        const type = res.data.filter((user) => user.user_type === i.user_type).length;
        total = type;
        // eslint-disable-next-line no-loop-func
        setTotalUser((prev) => ({ ...prev, [name]: total }));
      }
    }
  }, [dispatch]);

  const renderByType = (type) => {
    switch (type) {
      case "teacher":
      case "coach":
        return <Client />;
      case "schoolboy":
      case "student":
      case "college_student":
      case "high_school_student":
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDResult />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Fetch User details onces
    getUserDetails();
    return () => null;
  }, []);

  useEffect(() => {
    // Fetch User details onces
    getUserList();
    return () => null;
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {userProfile?.user_type === "admin" && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="dark"
                  icon="military_tech"
                  title="Administrateurs"
                  count={totalUser?.admin ?? 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="success"
                  icon="accessibility"
                  title="Coach"
                  count={totalUser?.coach ?? 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="info"
                  icon="accessibility"
                  title="Professeurs"
                  count={totalUser?.teacher ?? 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="error"
                  icon="school"
                  title="Etudiants"
                  count={totalUser?.student ?? 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="secondary"
                  icon="boy"
                  title="Lycéen"
                  count={totalUser?.high_school_student ?? 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="primary"
                  icon="escalator_warning"
                  title="Ecolier"
                  count={totalUser?.schoolboy ?? 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <MDBox mb={1.5}>
                <StatisticsCard
                  color="warning"
                  icon="person_add"
                  title="Collégien"
                  count={totalUser?.college_student ?? 0}
                />
              </MDBox>
            </Grid>
          </Grid>
        )}
        {userProfile?.user_type !== "admin" && (
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                {renderByType(userProfile?.user_type)}
              </Grid>
            </Grid>
          </MDBox>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
