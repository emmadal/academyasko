/* eslint-disable no-unused-vars */
import { useState } from "react";

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

// form validation with Formik
import { useFormik } from "formik";
import * as Yup from "yup";

function Message() {
  const [isLoading, setIsLoading] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      payee: "",
      subject: "",
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Entrez le corps du message"),
      payee: Yup.string().required("Veuillez entrer le numéro de votre destinataire"),
      subject: Yup.string().required("Veuillez entrer l'objet du message"),
    }),
    onSubmit: async (data) => window.console.log(data),
    validateOnChange: true,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} xl={6}>
          <MDBox p={2} component="form" role="form">
            <MDBox mb={2} lineHeight={1}>
              <MDInput
                name="payee"
                value={validation.values.payee}
                error={!!(validation.touched.payee && validation.errors.payee)}
                onChange={validation.handleChange}
                placeholder="Destinataire"
                type="tel"
                label="Destinataire"
                fullWidth
              />
              {validation.touched.payee && validation.errors.payee ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.payee}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2} lineHeight={1}>
              <MDInput
                name="subject"
                value={validation.values.subject}
                error={!!(validation.touched.subject && validation.errors.subject)}
                onChange={validation.handleChange}
                placeholder="Objet du message"
                type="text"
                label="Objet du message"
                fullWidth
              />
              {validation.touched.subject && validation.errors.subject ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.subject}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2} lineHeight={1}>
              <MDInput
                name="description"
                rows={5}
                multiline
                value={validation.values.description}
                error={!!(validation.touched.description && validation.errors.description)}
                onChange={validation.handleChange}
                placeholder="Description"
                type="text"
                label="Description"
                fullWidth
              />
              {validation.touched.description && validation.errors.description ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.description}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDButton
              variant="gradient"
              color="info"
              onClick={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              {isLoading ? <CircularProgress color="white" size={20} /> : "Envoyer le message"}
            </MDButton>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} xl={6} />
      </Grid>
    </DashboardLayout>
  );
}

export default Message;
