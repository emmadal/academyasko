// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Overview page components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

function Resume() {
  const [controller] = useMaterialUIController();
  const { userProfile } = controller;
  return (
    <MDBox mt={5} mb={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} xl={8} sx={{ display: "flex" }}>
          <Divider orientation="vertical" sx={{ ml: -5, mr: 1 }} />
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
  );
}

export default Resume;
