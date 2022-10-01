/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

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
import { getAllLevels, getCookie, createExercise, getExercicesByAuthor } from "api";

function TaskAlert({ open, setOpen, setErr, setSuccess, authorId }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie("askoacademy-token");
  const [levels, setLevels] = useState([]);
  const [exercices, setExercicess] = useState([]);

  const getLevels = async () => {
    const res = await getAllLevels(token);
    if (res?.success) {
      setLevels([...res.data]);
    }
  };

  useEffect(() => getLevels(), []);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      level_id: "",
      date_begin: "",
      date_end: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Veuillez entrer le titre de votre exercice"),
      description: Yup.string().required("Veuillez entrer la description de votre exercice"),
      level_id: Yup.number().required("Selectionnez le niveau de l'exercice"),
      date_begin: Yup.string().required("Ajouter la date de début"),
      date_end: Yup.string().required("Ajouter la date de fin"),
    }),
    onSubmit: async (values) => {
      setIsLoading(!isLoading);
      const req = await createExercise({ ...values, author_id: authorId }, token);
      if (req?.success) {
        setIsLoading(false);
        setSuccess("Exercice crée avec succès");
        setOpen(false);
      } else {
        setIsLoading(false);
        setOpen(false);
        setErr("Echec lors de la création de l'exercice. Veuillez ressayer");
      }
    },
    validateOnChange: true,
  });

  const handleClose = () => {
    setOpen(false);
    validation.resetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <MDBox component="form" role="form">
        <DialogTitle>Ajouter un exercice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ajouter vos exercies à attribuer a vos éleves ou étudiants.
          </DialogContentText>
          <MDBox mt={3}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Titre de l'exercice"
                fullWidth
                name="title"
                value={validation.values.title}
                onChange={validation.handleChange}
                error={!!(validation.touched.title && validation.errors.title)}
              />
              {validation.touched.title && validation.errors.title ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.title}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Niveau</InputLabel>
                <Select
                  name="level_id"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={!!(validation.touched.level_id && validation.errors.level_id)}
                  value={validation.values.level_id}
                  label="Niveau"
                  onChange={validation.handleChange}
                  sx={{ padding: "0.75rem" }}
                >
                  {levels.map((item) => (
                    <MenuItem key={item.uuid} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {validation.touched.level_id && validation.errors.level_id ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.level_id}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                label="Date de debut"
                fullWidth
                name="date_begin"
                value={validation.values.date_begin}
                onChange={validation.handleChange}
                error={!!(validation.touched.date_begin && validation.errors.date_begin)}
              />
              {validation.touched.date_begin && validation.errors.date_begin ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.date_begin}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                label="Date de fin"
                fullWidth
                name="date_end"
                value={validation.values.date_end}
                onChange={validation.handleChange}
                error={!!(validation.touched.date_end && validation.errors.date_end)}
              />
              {validation.touched.date_end && validation.errors.date_end ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.date_end}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                rows={5}
                multiline
                fullWidth
                name="description"
                value={validation.values.description}
                onChange={validation.handleChange}
                error={!!(validation.touched.description && validation.errors.description)}
              />
              {validation.touched.description && validation.errors.description ? (
                <MDTypography variant="caption" color="error">
                  {validation.errors.description}
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

TaskAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  authorId: PropTypes.number.isRequired,
  setErr: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
};

export default TaskAlert;
