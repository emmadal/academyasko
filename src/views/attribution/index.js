/* eslint-disable no-nested-ternary */
/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MDAlert from "components/MDAlert";
import MDDeleteModal from "components/MDDeleteModal";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import DataTable from "views/attribution/DataTable";

// @mui material components
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// API call
import {
  getCookie,
  getAllAttributions,
  getStudentList,
  getTeachersAndCoachs,
  createAttribution,
  deleteAttribution,
} from "api";

// form validation with Formik
import { useFormik } from "formik";
import * as Yup from "yup";

function Attribution() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);
  const [err, setErr] = useState("");
  const [attr, setAttr] = useState();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [trainerList, setTrainerList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [attributions, setAttributions] = useState([]);
  const token = getCookie("askoacademy-token");

  const getAttribution = async () => {
    const res = await getAllAttributions(token);
    if (res?.success) {
      setAttributions([...res?.data]);
    }
  };

  const getPersons = async () => {
    const [teachers, students] = await Promise.all([
      getTeachersAndCoachs(token),
      getStudentList(token),
    ]);
    setTrainerList([...teachers?.data]);
    setStudentList([...students?.data]);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      student_id: "",
      teacher_id: "",
    },
    validationSchema: Yup.object({
      student_id: Yup.string().required("Choissisez l'éleve qui recevra un formateur"),
      teacher_id: Yup.string().required("Choisissez le formateur"),
    }),
    onSubmit: async (values) => {
      setIsLoading(!isLoading);
      const req = await createAttribution(values, token);
      if (req?.status) {
        setIsLoading(false);
        setSuccess("L'attribution a été fait avec succès");
        await getAttribution();
      } else {
        setErr("L'attribution a échoué. Veuillez réssayer");
        setIsLoading(false);
      }
    },
    validateOnChange: true,
  });

  const onDelete = (obj) => {
    setOpen(!open);
    setAttr(obj);
  };

  const confirmDelete = async () => {
    setIsLoadingDel(!isLoadingDel);
    const req = await deleteAttribution(
      { student_id: attr?.student_id, teacher_id: attr?.teacher_id },
      token
    );
    if (req.success) {
      await getAttribution();
      setSuccess("L'attribution a été supprimée avec succès");
      setIsLoadingDel(false);
      setOpen(false);
    } else {
      setIsLoadingDel(false);
      setErr("Une erreure est survenue. Veuillez réssayer");
      setOpen(false);
    }
  };

  useEffect(() => getAttribution(), []);
  useEffect(() => getPersons(), []);

  const showRow = () => ({
    rows: attributions.flatMap((attribution) => ({
      teacher_name: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {attribution?.teacher?.name}
        </MDTypography>
      ),
      teacher_contact: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {attribution?.teacher?.user_mobile_1}
        </MDTypography>
      ),
      teacher_user_type:
        attribution.teacher?.user_type === "teacher" ? (
          <MDBadge badgeContent="Enseignant" size="xs" container color="info" />
        ) : attribution.teacher?.user_type === "coach" ? (
          <MDBadge badgeContent="Enseignant" size="xs" container color="info" />
        ) : null,
      student_name: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {attribution?.student?.login}
        </MDTypography>
      ),
      student_contact: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {attribution?.student?.user_mobile_1}
        </MDTypography>
      ),
      student_level: (
        <MDTypography variant="text" color="dark" fontWeight="medium">
          {attribution?.student?.user_type === "student"
            ? "Etudiant"
            : attribution?.student?.user_type === "schoolboy"
            ? "Écolier"
            : attribution?.student?.user_type === "college_student"
            ? "Collégien"
            : attribution?.student?.user_type === "high_school_student"
            ? "Lycéen"
            : null}
        </MDTypography>
      ),
      action: (
        <IconButton aria-label="delete" onClick={() => onDelete(attribution)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    })),
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDDeleteModal
        title="Suppression de l'attribution"
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
            validation.resetForm();
          }}
        >
          {success}
        </MDAlert>
      )}
      <MDBox p={2} component="form" role="form">
        <Stack spacing={2} direction="row">
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Elèves ou Etudiant</InputLabel>
              <Select
                name="student_id"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={!!(validation.touched.student_id && validation.errors.student_id)}
                value={validation.values.student_id}
                onChange={validation.handleChange}
                sx={{ padding: "0.75rem" }}
              >
                {studentList.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student?.login}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {validation.touched.student_id && validation.errors.student_id ? (
              <MDTypography variant="caption" color="error">
                {validation.errors.student_id}
              </MDTypography>
            ) : null}
          </>
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Coach ou Enseignant</InputLabel>
              <Select
                name="teacher_id"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={!!(validation.touched.teacher_id && validation.errors.teacher_id)}
                value={validation.values.teacher_id}
                onChange={validation.handleChange}
                sx={{ padding: "0.75rem" }}
              >
                {trainerList.map((trainer) => (
                  <MenuItem key={trainer.id} value={trainer.id}>
                    {trainer?.login} {" - "}{" "}
                    {trainer?.user_type === "teacher" ? "Professeur" : "Coach"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {validation.touched.teacher_id && validation.errors.teacher_id ? (
              <MDTypography variant="caption" color="error">
                {validation.errors.teacher_id}
              </MDTypography>
            ) : null}
          </>
          <MDButton
            variant="gradient"
            color="info"
            onClick={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {isLoading ? <CircularProgress color="white" size={20} /> : "Attribuer"}
          </MDButton>
        </Stack>
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
                  Liste des attributions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Nom du Formateur", accessor: "teacher_name", align: "left" },
                      {
                        Header: "Contact du Formateur",
                        accessor: "teacher_contact",
                        align: "left",
                      },
                      {
                        Header: "Status du Formateur",
                        accessor: "teacher_user_type",
                        align: "left",
                      },
                      { Header: "Nom de l'élève", accessor: "student_name", align: "left" },
                      { Header: "Contact de l'élève", accessor: "student_contact", align: "left" },
                      { Header: "Niveau de l'élève", accessor: "student_level", align: "left" },
                      { Header: "Action", accessor: "action", align: "left" },
                    ],
                    rows: [...showRow().rows],
                  }}
                  isSorted
                  entriesPerPage
                  showTotalEntries
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

export default Attribution;
