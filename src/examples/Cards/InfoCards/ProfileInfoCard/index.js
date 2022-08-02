/* eslint-disable react/prop-types */
import { useState } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// form validation with Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Material Dashboard 2 React contexts
import { setFetchDetails, useMaterialUIController } from "context";

// API call
import { getCookie, updateUser } from "api";

function ProfileInfoCard({ title, info, shadow }) {
  const labels = [];
  const values = [];
  const [controller, dispatch] = useMaterialUIController();
  const { userProfile } = controller;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  const [isLoading, setIsLoading] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      description: userProfile.description ?? "",
      email: userProfile.email || "",
      user_mobile_1: userProfile.user_mobile_1 ?? "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Entrez la description de votre profil"),
      user_mobile_1: Yup.string().required("Veuillez entrer votre contact"),
      email: Yup.string().required("Veuillez entrer votre Email"),
    }),
    onSubmit: async (data) => {
      setIsLoading(!isLoading);
      const token = getCookie("askoacademy-token");
      const res = await updateUser(token, data, userProfile?.id);
      if (res.success) {
        setIsLoading(false);
        setFetchDetails(dispatch, res?.data);
      }
      if (!res.success) {
        setIsLoading(false);
      }
    },
    validateOnChange: true,
  });

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none", width: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox p={2} component="form" role="form">
          <MDBox mb={2} lineHeight={1}>
            <MDInput
              name="description"
              rows={3}
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
          <MDBox mb={2} lineHeight={1}>
            <MDInput
              name="email"
              value={validation.values.email}
              error={!!(validation.touched.email && validation.errors.email)}
              onChange={validation.handleChange}
              placeholder="Votre Email"
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
          <MDBox mb={2} lineHeight={1}>
            <MDInput
              name="user_mobile_1"
              value={validation.values.user_mobile_1}
              error={!!(validation.touched.user_mobile_1 && validation.errors.user_mobile_1)}
              onChange={validation.handleChange}
              placeholder="Votre Contact"
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
          <MDButton
            variant="gradient"
            color="info"
            onClick={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {isLoading ? <CircularProgress color="white" size={20} /> : "Mettre à jour"}
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
