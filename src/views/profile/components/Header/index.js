/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTabPanel from "components/MDTabPanel";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import Settings from "views/profile/settings";
import Tasks from "views/profile/tasks";
import Resume from "views/profile/resume";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import pxToRem from "assets/theme-dark/functions/pxToRem";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Avatar component
import Avatar from "react-avatar";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [controller] = useMaterialUIController();
  const { userProfile } = controller;

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {!userProfile?.avatar ? (
              <Avatar name={`${userProfile?.name}`} round size={pxToRem(74)} />
            ) : (
              <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
            )}
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {userProfile?.name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {userProfile?.user_type === "teacher"
                  ? "Professeur"
                  : userProfile?.user_type === "coach"
                  ? "Coach"
                  : userProfile?.user_type === "student"
                  ? "Etudiant"
                  : userProfile?.user_type === "schoolboy"
                  ? "Ecolier"
                  : userProfile?.user_type === "high_school_student"
                  ? "Lycéen"
                  : userProfile?.user_type === "college_student"
                  ? "Collégien"
                  : "Admin"}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Profil"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      user
                    </Icon>
                  }
                  {...a11yProps(0)}
                />
                {userProfile?.user_type === "admin" ? null : (
                  <Tab
                    label="Mes Tâches"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        clipboard
                      </Icon>
                    }
                    {...a11yProps(1)}
                  />
                )}
                <Tab
                  label="Paramètres"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      cogs
                    </Icon>
                  }
                  {...a11yProps(userProfile?.user_type === "admin" ? 1 : 2)}
                />
              </Tabs>
              <MDTabPanel value={tabValue} index={0}>
                <Resume />
              </MDTabPanel>
              {userProfile?.user_type === "admin" ? null : (
                <MDTabPanel value={tabValue} index={1}>
                  <Tasks />
                </MDTabPanel>
              )}
              <MDTabPanel value={tabValue} index={userProfile?.user_type === "admin" ? 1 : 2}>
                <Settings />
              </MDTabPanel>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
