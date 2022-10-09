/* eslint-disable no-nested-ternary */
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import MDAvatar from "components/MDAvatar";

import pxToRem from "assets/theme-dark/functions/pxToRem";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import Avatar from "react-avatar";

function CardUser({ name, description, type }) {
  const [controller] = useMaterialUIController();
  const { userProfile } = controller;

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2} height="7rem">
        <MDBox
          variant="gradient"
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="10rem"
          height="2rem"
          mt={-1}
        >
          <Avatar name={name} round size={pxToRem(74)} />
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25} ml={3}>
          <MDTypography variant="h4">{name}</MDTypography>
          <MDTypography variant="button" color="text">
            {type === "teacher" ? "Enseignant" : type === "coach" ? "Coach" : null}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mb={2}>
        <MDTypography variant="body2" ml={3}>
          {description ?? "Aucune Biographie disponible"}
        </MDTypography>
      </MDBox>
      {userProfile?.user_type === "admin" && <MDButton color="info">Contactez</MDButton>}
    </Card>
  );
}

// Typechecking props for the ComplexStatisticsCard
CardUser.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardUser;
