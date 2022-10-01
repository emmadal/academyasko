/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

import pxToRem from "assets/theme-dark/functions/pxToRem";

// Avatar component
import Avatar from "react-avatar";

function TaskCard({ title, description, authors, date_begin, date_end }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const renderAuthors = authors.map((author) => (
    <Tooltip key={author?.name} title={author?.name}>
      {author?.image ? (
        <MDAvatar
          src={author?.image}
          alt={author?.name}
          shadow="sm"
          size="xs"
          sx={({ borders: { borderWidth }, palette: { white } }) => ({
            border: `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",
            ml: -1.25,

            "&:hover, &:focus": {
              zIndex: "10",
            },
          })}
        />
      ) : (
        <Avatar name={`${author?.name}`} round size={pxToRem(24)} />
      )}
    </Tooltip>
  ));

  return (
    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <MDTypography variant="h5" fontWeight="bold" color="dark" textTransform="capitalize">
          {title}
        </MDTypography>
      </AccordionSummary>
      <AccordionDetails>
        <MDTypography variant="text" color="text">
          {description}
        </MDTypography>
        <MDBox>
          <TimelineItem
            color="success"
            icon="notifications"
            title="Date de début"
            dateTime={date_begin}
          />
          <TimelineItem
            color="error"
            icon="inventory_2"
            title="Date de fin"
            dateTime={date_end}
            lastItem
          />
        </MDBox>
        {/* <MDBox ml={2}>{renderAuthors}</MDBox> */}
      </AccordionDetails>
    </Accordion>
  );
}

// Setting default values for the props of DefaultProjectCard
TaskCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date_begin: PropTypes.string.isRequired,
  date_end: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default TaskCard;
