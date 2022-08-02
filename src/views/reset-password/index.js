// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import PageLayout from "molecules/PageLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function ResetPassword() {
  return (
    <PageLayout image={bgImage}>
      <Card sx={{ width: "450px" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Mot de passe oublié ?
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Vous recevrez un e-mail de reinitialisation
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email" label="Numéro d'identification " variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                Reinitialiser
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </PageLayout>
  );
}

export default ResetPassword;
