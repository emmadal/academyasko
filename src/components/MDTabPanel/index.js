import * as React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";

function MDTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <MDBox>{children}</MDBox>
        </Box>
      )}
    </div>
  );
}

MDTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default MDTabPanel;
