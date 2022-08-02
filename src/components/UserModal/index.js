/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// form validation with Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// API call
import { registerUser } from "api";

function UserModal({ open, setOpen }) {
  const status = [
    { id: 1, value: "coach", label: "Coach" },
    { id: 2, value: "teacher", label: "Professeur" },
    { id: 3, value: "student", label: "Autres(Ecoliers | Etudiants | Collégiens)" },
    { id: 4, value: "admin", label: "Administrateur" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      user_mobile_1: "",
      user_type: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6).required("Le mot de passe doit contenir 6 caractères"),
      user_type: Yup.string().required("Le Status est requis"),
      user_mobile_1: Yup.string().required("Veuillez entrer le contact"),
      email: Yup.string().required("Email requis"),
      name: Yup.string().required("Veuillez entrer le Nom "),
    }),
    onSubmit: async (values) => {
      setIsLoading(!isLoading);
      const date = new Date().getFullYear();
      const loginID = `asko-${values.name.split(" ")[0].toLocaleLowerCase()}${date}`;
      const res = await registerUser({ ...values, login: loginID });
      if (res?.success) {
        setIsLoading(false);
        setOpen(false);
      } else {
        setIsLoading(false);
      }
    },
    validateOnChange: true,
  });
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose}>
      <MDBox component="form" role="form">
        <DialogTitle>Création d&#39;un nouvel utilsateur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Créer un nouvel utilisateur pour qu&#39;il puisse beneficier des services de
            Askoacademy.
          </DialogContentText>
          <MDBox mt={3}>
            <MDBox mb={2}>
              <MDInput
                name="name"
                value={validation.values.name}
                error={!!(validation.touched.name && validation.errors.name)}
                onChange={validation.handleChange}
                type="text"
                label="Nom & Prénoms"
                fullWidth
              />
              {validation.touched.name && validation.errors.name ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.name}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  name="user_type"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={!!(validation.touched.user_type && validation.errors.user_type)}
                  value={validation.values.user_type}
                  label="Status"
                  onChange={validation.handleChange}
                  sx={{ padding: "0.75rem" }}
                >
                  {status.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {validation.touched.user_type && validation.errors.user_type ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.user_type}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="user_mobile_1"
                value={validation.values.user_mobile_1}
                error={!!(validation.touched.user_mobile_1 && validation.errors.user_mobile_1)}
                onChange={validation.handleChange}
                type="tel"
                label="Contact"
                fullWidth
              />
              {validation.touched.user_mobile_1 && validation.errors.user_mobile_1 ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.user_mobile_1}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="email"
                value={validation.values.email}
                error={!!(validation.touched.email && validation.errors.email)}
                onChange={validation.handleChange}
                type="email"
                label="Email"
                fullWidth
              />
              {validation.touched.email && validation.errors.email ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.email}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="password"
                value={validation.values.password}
                error={!!(validation.touched.password && validation.errors.password)}
                onChange={validation.handleChange}
                type="password"
                label="Mot de passe"
                fullWidth
              />
              {validation.touched.password && validation.errors.password ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.password}
                </MDTypography>
              ) : null}
            </MDBox>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="error" onClick={handleClose}>
            Annuler
          </MDButton>
          <MDButton
            variant="gradient"
            color="info"
            onClick={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {isLoading ? <CircularProgress color="white" size={20} /> : "Créer"}
          </MDButton>
        </DialogActions>
      </MDBox>
    </Dialog>
  );
}
UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default UserModal;
