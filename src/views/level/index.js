/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDDeleteModal from "components/MDDeleteModal";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import DataTable from "views/level/Table/DataTable";

// form validation with Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// API call
import { createLevel, getAllLevels, getCookie, deleteLevel, updateLevel } from "api";

function Level() {
  const [levels, setLevels] = useState([]);
  const [levelId, setLevelId] = useState(0);
  const [level, setLevel] = useState();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const token = getCookie("askoacademy-token");
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);
  const [open, setOpen] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      title: level?.title ?? "",
    },
    validate: (value) => {
      const errors = {};
      if (!value.title.includes("Niveau ")) {
        errors.title = "Veuillez Entrer le mot Niveau avant la classe";
      }
      return errors;
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Entrez le niveau d'etude"),
    }),
    onSubmit: async (values) => {
      setIsLoading(!isLoading);
      if (!level) {
        const req = await createLevel(values.title, token);
        if (req.success) {
          const response = await getAllLevels(token);
          setSuccess(`${values.title} ajouté avec succès`);
          if (response.success) {
            setIsLoading(false);
            setLevels([...response.data]);
          }
        } else {
          setErr(req.data.title[0]);
          setIsLoading(false);
        }
      }
      if (level) {
        const req = await updateLevel(values.title, level?.id, token);
        if (req.success) {
          const response = await getAllLevels(token);
          setIsLoading(false);
          setLevels([...response.data]);
          setSuccess("La valeur a été mise à jour avec succès");
        }
      }
    },
    validateOnChange: true,
  });

  const getLevels = async () => {
    const res = await getAllLevels(token);
    if (res.success) {
      setLevels([...res.data]);
      validation.resetForm();
      setLevel(null);
    }
  };

  useEffect(() => getLevels(), []);

  const onDelete = (id) => {
    setLevelId(id);
    setOpen(!open);
  };

  const onEdit = (item) => setLevel(item);

  const confirmDelete = async () => {
    setIsLoadingDel(!isLoadingDel);
    const req = await deleteLevel(levelId, token);
    if (req.success) {
      const res = await getAllLevels(token);
      if (res.success) {
        setOpen(false);
        setIsLoadingDel(false);
        setLevels([...res.data]);
      }
    } else {
      setIsLoadingDel(false);
    }
  };

  const showRow = () => ({
    rows: levels.flatMap((item) => ({
      title: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {item?.title}
        </MDTypography>
      ),
      created_at: (
        <MDTypography variant="text" color="dark">
          {new Date(item?.created_at).toLocaleDateString("fr-FR", options)}
        </MDTypography>
      ),
      updated_at: (
        <MDTypography variant="text" color="dark">
          {new Date(item?.updated_at).toLocaleDateString("fr-FR", options)}
        </MDTypography>
      ),
      action: (
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="edit" onClick={() => onEdit(item)}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onDelete(item?.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      ),
    })),
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDDeleteModal
        title="Suppression du niveau"
        message="Cette action ne peut être annulée. Voulez vous continuer ?"
        isOpen={open}
        confirmDelete={confirmDelete}
        cancelAction={setOpen}
        isLoading={isLoadingDel}
      />
      {err && (
        <MDAlert
          color="error"
          dismissible
          onClick={() => {
            setErr("");
            setLevel(null);
            validation.resetForm();
          }}
        >
          {err}
        </MDAlert>
      )}
      {success && (
        <MDAlert
          color="success"
          dismissible
          onClick={() => {
            setSuccess("");
            setLevel(null);
            validation.resetForm();
          }}
        >
          {success}
        </MDAlert>
      )}
      <MDBox p={2} component="form" role="form">
        <MDBox mb={2} lineHeight={1}>
          <MDInput
            name="title"
            value={validation.values.title}
            error={!!(validation.touched.title && validation.errors.title)}
            onChange={validation.handleChange}
            placeholder="Ex: Niveau 3eme, Niveau 2nde, Niveau CE2, etc..."
            type="text"
            label="Niveau d'étude"
            fullWidth
            sx={{ width: "50%" }}
          />
          <MDBox>
            {validation.touched.title && validation.errors.title ? (
              <MDTypography variant="caption" color="error">
                {validation.errors.title}
              </MDTypography>
            ) : null}
          </MDBox>
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
          {isLoading ? (
            <CircularProgress color="white" size={20} />
          ) : level?.title ? (
            "Mette à jour"
          ) : (
            "Ajouter"
          )}
        </MDButton>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Liste des niveaux d&#39;étude
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Libellé", accessor: "title", align: "left" },
                      { Header: "Date de création", accessor: "created_at", align: "left" },
                      { Header: "Date de modification", accessor: "updated_at", align: "left" },
                      { Header: "action", accessor: "action", align: "left" },
                    ],
                    rows: [...showRow().rows],
                  }}
                  isSorted
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Level;
