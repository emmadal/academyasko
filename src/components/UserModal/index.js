/* eslint-disable no-plusplus */
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
import IconButton from "@mui/material/IconButton";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
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

import COUNTRY_LIST from "utils";

function UserModal({ open, setOpen, setErr, setSuccess, getUsers }) {
  const status = [
    { id: 7, value: "admin", label: "Administrateur" },
    { id: 1, value: "coach", label: "Coach" },
    { id: 4, value: "schoolboy", label: "Ecolier" },
    { id: 3, value: "student", label: "Etudiant" },
    { id: 5, value: "college_student", label: "Collégien" },
    { id: 2, value: "teacher", label: "Professeur" },
    { id: 6, value: "high_school_student", label: "Lycéen" },
  ];
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      user_mobile_1: "",
      user_type: "",
      password: "",
      login: "",
      country: "",
    },
    validationSchema: Yup.object({
      user_type: Yup.string().required("Le Status est requis"),
      user_mobile_1: Yup.string().required("Veuillez entrer le contact"),
      email: Yup.string().email("Veuille entrer un em-mail valide").required("Email requis"),
      name: Yup.string().required("Veuillez entrer le Nom"),
      country: Yup.string().required("Veuillez entrer le Pays"),
      login: Yup.string().required("Le ID de connexion est requis"),
      password: Yup.string().required("Le Mot de passe est requis"),
    }),
    onSubmit: async (values) => {
      setIsLoading(!isLoading);
      const res = await registerUser(values);
      if (res?.success) {
        setIsLoading(false);
        validation.resetForm();
        setSuccess("Nouvel utilisateur ajouté");
        await getUsers();
        setOpen(false);
      } else {
        setErr("Un problème est survenue. Veuillez ressayer");
        setIsLoading(false);
        setOpen(false);
      }
    },
    validateOnChange: true,
  });
  const handleClose = () => setOpen(false);

  const generatePassword = async () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let pwd = "";
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      pwd += chars.substring(randomNumber, randomNumber + 1);
    }
    await validation.setFieldValue("password", pwd);
  };

  const generateLoginID = async (name) => {
    window.console.log(name);
    const date = new Date().getFullYear();
    const login = `asko-${name.split(" ")[0].toLocaleLowerCase()}${date}`;
    await validation.setFieldValue("login", login);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <MDBox component="form" role="form">
        <DialogTitle>Création d&#39;un nouvel utilisateur</DialogTitle>
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
              <MDInput
                name="login"
                error={!!(validation.touched.login && validation.errors.login)}
                value={validation.values.login}
                onChange={validation.handleChange}
                type="text"
                label="Generez le ID Connexion avec l'icône"
                fullWidth
                InputProps={{
                  className: "asko_input_placeholder",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ padding: "0" }}>
                      <IconButton onClick={() => generateLoginID(validation.values.name)}>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {validation.touched.login && validation.errors.login ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.login}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pays</InputLabel>
                <Select
                  name="country"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={!!(validation.touched.country && validation.errors.country)}
                  value={validation.values.country}
                  label="Pays"
                  onChange={validation.handleChange}
                  sx={{ padding: "0.75rem" }}
                >
                  {COUNTRY_LIST.map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {validation.touched.country && validation.errors.country ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.country}
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
                type="text"
                label="Generez le mot de passe avec la clé"
                fullWidth
                InputProps={{
                  className: "asko_input_placeholder",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ padding: "0" }}>
                      <IconButton onClick={() => generatePassword()}>
                        <KeyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
  setErr: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};
export default UserModal;
