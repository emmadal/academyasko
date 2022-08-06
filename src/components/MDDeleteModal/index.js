import PropTypes from "prop-types";

// import material components
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// Material Kit 2 React Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Kit 2 colors
import colors from "assets/theme/base/colors";

const { light } = colors;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: light.main,
  borderRadius: 3,
  border: `1px solid ${light.main}`,
  boxShadow: 24,
  p: 4,
};

function MDDeleteModal({ isOpen, confirmDelete, title, message, cancelAction, isLoading }) {
  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDTypography id="modal-modal-title" color="error" variant="h5" fontWeight="bold">
            {title}
          </MDTypography>
          <MDTypography
            color="dark"
            variant="subtitle2"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {message}
          </MDTypography>
          <Divider variant="fullWidth" />
          <Stack direction="row" spacing={2}>
            <MDButton variant="outlined" color="primary" onClick={() => cancelAction(false)}>
              Annuler
            </MDButton>
            <MDButton variant="gradient" color="error" onClick={confirmDelete}>
              {isLoading ? <CircularProgress color="white" size={20} /> : "Confirmer"}
            </MDButton>
          </Stack>
        </MDBox>
      </Modal>
    </div>
  );
}

MDDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MDDeleteModal;
