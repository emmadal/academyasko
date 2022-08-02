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
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTabPanel from "components/MDTabPanel";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import pxToRem from "assets/theme-dark/functions/pxToRem";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Overview page components
// import Header from "views/profile/components/Header";
import PlatformSettings from "views/profile/components/PlatformSettings";

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
                {userProfile?.user_type.toUpperCase()}
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
                <Tab
                  label="Mes Tâches"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      clipboard
                    </Icon>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  label="Paramètres"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      cogs
                    </Icon>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
              <MDTabPanel value={tabValue} index={0}>
                <MDBox mt={5} mb={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} xl={6}>
                      <PlatformSettings />
                    </Grid>
                    <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                      <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                      <ProfileInfoCard
                        title="Résume du profil"
                        description={userProfile?.description}
                        info={{
                          email: userProfile?.email,
                          contact: userProfile?.user_mobile_1,
                        }}
                        action={{ route: "", tooltip: "Modifier le profil" }}
                        shadow={false}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </MDTabPanel>
              <MDTabPanel value={tabValue} index={1}>
                <MDBox pt={2} px={2} lineHeight={1.25}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Mes Cours
                  </MDTypography>
                  <MDBox mb={1}>
                    <MDTypography variant="button" color="text">
                      Architects design houses
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox p={2}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={homeDecor1}
                        label="project #2"
                        title="modern"
                        description="As Uber works through a huge amount of internal management turmoil."
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view project",
                        }}
                        authors={[
                          { image: team1, name: "Elena Morison" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team4, name: "Peterson" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={homeDecor2}
                        label="project #1"
                        title="scandinavian"
                        description="Music is something that everyone has their own specific opinion about."
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view project",
                        }}
                        authors={[
                          { image: team3, name: "Nick Daniel" },
                          { image: team4, name: "Peterson" },
                          { image: team1, name: "Elena Morison" },
                          { image: team2, name: "Ryan Milly" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={homeDecor3}
                        label="project #3"
                        title="minimalist"
                        description="Different people have different taste, and various types of music."
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view project",
                        }}
                        authors={[
                          { image: team4, name: "Peterson" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team1, name: "Elena Morison" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={homeDecor4}
                        label="project #4"
                        title="gothic"
                        description="Why would anyone pick blue over pink? Pink is obviously a better color."
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view project",
                        }}
                        authors={[
                          { image: team4, name: "Peterson" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team1, name: "Elena Morison" },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
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
