/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// Material Kit 2 React Components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

// import material components
import { Grid } from "@mui/material";

// Form validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Material Dashboard 2 React contexts
import { setLogOut, useMaterialUIController } from "context";

// react-router-dom components
import { useNavigate } from "react-router-dom";

function Settings() {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openResetModal, setOpenResetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMssg, setResponseMssg] = useState("");
  const [openToolSnack, setOpenToolSnack] = useState({ open: false, Transition: Fade });
  const [controller, dispatch] = useMaterialUIController();
  const { userProfile } = controller;
  // eslint-disable-next-line dot-notation

  const logOut = (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      setIsLoading(!isLoading);
      setTimeout(() => {
        document.cookie = `askoacademy-token=; Max-Age=0; path=/; domain=${process.env.PUBLIC_URL};`;
        localStorage.setItem("ASKO_STORE", {});
        setIsLoading(false);
        setLogOut(dispatch);
        navigate("/signin", { replace: true });
      }, 2000);
    } else {
      setError("You're offline. Please check your network connection...");
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.password !== values.confirm_password) {
        errors.confirm_password = "Password doesn't match. Try again";
      }
      return errors;
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Enter your password"),
    }),
    onSubmit: async (values) => {
      if (values.confirm_password === values.password) {
        // const token = getCookie("askoacademy-token");
        // const userObject = {
        //   password: values.password,
        //   uid: userId,
        //   jwtoken: token,
        // };
        // const res = await updateUserPasswordById(userObject);
        // if (!res?.success) {
        //   setError(res?.message);
        //   return;
        // }
        // if (res.success) {
        //   setResponseMssg(res.message);
        //   setOpenToolSnack({
        //     open: true,
        //     Fade,
        //   });
        // }
      }
    },
    validateOnChange: true,
  });

  const handleClose = () => {
    setOpenToolSnack({
      ...openToolSnack,
      open: false,
    });
    setResponseMssg("");
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} sm={12}>
        <Snackbar
          open={openToolSnack.open}
          onClose={handleClose}
          TransitionComponent={openToolSnack.Transition}
          message={responseMssg}
          className="snackBar_container"
        />
        <MDTypography textAlign="start" mt={2} mb={2}>
          Actions pour votre compte Askoacademy
        </MDTypography>
        <MDBox p={2}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <MDButton
              variant="gradient"
              color="secondary"
              mb={2}
              onClick={() => setOpenResetModal(!open)}
            >
              Changez votre mot de passe
            </MDButton>
            <MDButton variant="gradient" color="error" onClick={logOut} mb={2}>
              {isLoading ? <CircularProgress color="white" size={20} /> : "Se Déconnecter"}
            </MDButton>
          </Stack>
          {error ? (
            <MDBox mt={2} mb={1}>
              <MDTypography variant="button" color="error" fontWeight="bold">
                {error}
              </MDTypography>
            </MDBox>
          ) : null}
        </MDBox>
        <MDTypography textAlign="start" mt={2} mb={2}>
          Zone dangereuse
        </MDTypography>
        <MDBox>
          <MDBox mb={2}>
            <MDTypography variant="button" fontWeight="bold">
              Cliquez sur le boutton ci-dessous pour supprimer votre compte.
            </MDTypography>
          </MDBox>
          <MDButton variant="gradient" color="error" onClick={() => setOpen(!open)}>
            Supprimez votre compte
          </MDButton>
          {error ? (
            <MDBox mt={2} mb={1}>
              <MDTypography variant="button" color="error" fontWeight="bold">
                {error}
              </MDTypography>
            </MDBox>
          ) : null}
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default Settings;
