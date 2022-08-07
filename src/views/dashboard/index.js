/* eslint-disable no-constant-condition */
/* eslint-disable react/function-component-definition */
import { useEffect, useCallback } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import StatisticsCard from "views/dashboard/statistics-cards";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "views/dashboard/components/Projects";
import Client from "views/dashboard/components/Client";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Material Dashboard 2 React contexts
import { setFetchDetails, useMaterialUIController } from "context";

// api call
import { getUserById, getCookie } from "api";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [controller, dispatch] = useMaterialUIController();
  const { userProfile } = controller;

  const getUserDetails = useCallback(async () => {
    const token = await getCookie("askoacademy-token");
    const res = await getUserById(controller?.userProfile?.id, token);
    if (res?.success) {
      // Dispatch Login
      setFetchDetails(dispatch, res?.data);
    }
  }, [dispatch]);

  useEffect(() => {
    // Fetch User details onces
    getUserDetails();
    return () => null;
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {userProfile?.user_type === "admin" && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={3}>
                <MDBox mb={1.5}>
                  <StatisticsCard color="dark" icon="grade" title="Administrateurs" count={0} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <MDBox mb={1.5}>
                  <StatisticsCard icon="sports" title="Coach" count={0} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <MDBox mb={1.5}>
                  <StatisticsCard
                    color="success"
                    icon="accessibility"
                    title="Professeurs"
                    count={0}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <MDBox mb={1.5}>
                  <StatisticsCard color="primary" icon="person_add" title="Autres" count={0} />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="website views"
                      description="Last Campaign Performance"
                      date="campaign sent 2 days ago"
                      chart={reportsBarChartData}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title="daily sales"
                      description={
                        <>
                          (<strong>+15%</strong>) increase in today sales.
                        </>
                      }
                      date="updated 4 min ago"
                      chart={sales}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="dark"
                      title="completed tasks"
                      description="Last Campaign Performance"
                      date="just updated"
                      chart={tasks}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </>
        )}
        {userProfile?.user_type !== "admin" ? (
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                {userProfile?.user_type === "teacher" || "coach" ? <Client /> : <Projects />}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <OrdersOverview />
              </Grid>
            </Grid>
          </MDBox>
        ) : null}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
