/* eslint-disable no-unused-vars */
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import PageLayout from "molecules/PageLayout";

// Material Dashboard 2 React contexts
import { setLogin, useMaterialUIController } from "context";

// react-router components
import { useNavigate } from "react-router-dom";

// form validation with Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// api call
import { loginUser } from "api";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignIn() {
  const [controller, dispatch] = useMaterialUIController();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required("Veuillez entrer votre ID askoacademy"),
      password: Yup.string().required("Veuillez entrer votre mot de passe"),
    }),
    onSubmit: async (values) => {
      setIsLoading(!isLoading);
      const res = await loginUser(values);
      if (res?.success) {
        const { authorization, user } = res.data;
        document.cookie = `askoacademy-token=${authorization.token}; path="/dashboard; Secure; SameSite=true"`;
        setIsLoading(false);
        // Dispatch Login
        setLogin(dispatch, user);
        navigate("/dashboard", { replace: true });
      }
      if (!res.success) {
        setIsLoading(false);
        setError(res?.message);
      }
    },
    validateOnChange: true,
  });
  return (
    <PageLayout image={bgImage}>
      <Card sx={{ width: "450px" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Se connecter
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ID Askoacademy"
                fullWidth
                name="login"
                value={validation.values.login}
                onChange={validation.handleChange}
                error={!!(validation.touched.login && validation.errors.login)}
              />
              {validation.touched.login && validation.errors.login ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.login}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Mot de passe"
                fullWidth
                name="password"
                value={validation.values.password}
                onChange={validation.handleChange}
                error={!!(validation.touched.password && validation.errors.password)}
              />
              {validation.touched.password && validation.errors.password ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.password}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                {isLoading ? <CircularProgress color="white" size={20} /> : "Connexion"}
              </MDButton>
            </MDBox>
            {error ? (
              <MDBox mt={2} mb={1}>
                <MDTypography variant="button" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            ) : null}
          </MDBox>
        </MDBox>
      </Card>
    </PageLayout>
  );
}

export default SignIn;
