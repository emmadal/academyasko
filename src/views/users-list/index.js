import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import HttpsIcon from "@mui/icons-material/Https";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MDAlert from "components/MDAlert";
import UserModal from "components/UserModal";
import MDLockModal from "components/MDLockModal";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import Footer from "molecules/Footer";
import DataTable from "views/users-list/DataTable";

// API call
import { getAllUsers, getCookie, lockAndUnclockAccount } from "api";

// Avatar component
import Avatar from "react-avatar";

// Material Dashboard 2 React base styles
import pxToRem from "assets/theme-dark/functions/pxToRem";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [person, setPerson] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const token = getCookie("askoacademy-token");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const getUsers = async () => {
    const res = await getAllUsers(token);
    if (res.success) {
      setUsers([...res.data.reverse()]);
    }
  };

  useEffect(() => getUsers(), []);

  const showStatus = (key) => {
    switch (key) {
      case "admin":
        return <MDBadge badgeContent="Administrateur" size="xs" container color="dark" />;
      case "teacher":
        return <MDBadge badgeContent="Professeur" size="xs" container color="info" />;
      case "coach":
        return <MDBadge badgeContent="Coach" size="xs" container color="success" />;
      case "student":
        return <MDBadge badgeContent="Etudiant" size="xs" container color="error" />;
      case "schoolboy":
        return <MDBadge badgeContent="Ecolier" size="xs" container color="primary" />;
      case "college_student":
        return <MDBadge badgeContent="Collégien" size="xs" container color="warning" />;
      case "high_school_student":
        return <MDBadge badgeContent="Lycéen" size="xs" container color="secondary" />;
      default:
        return null;
    }
  };

  const toggleDrawer = (anchor, isopen, user) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setPerson(user);
    setState({ ...state, [anchor]: isopen });
  };

  const showRow = () => ({
    rows: users.sort().flatMap((user) => ({
      name: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          {!user?.avatar ? (
            <Avatar name={`${user?.name}`} round size={pxToRem(36)} />
          ) : (
            <MDAvatar src={user?.avatar} name={user?.name} size="sm" />
          )}
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {user?.name}
            </MDTypography>
            <MDTypography variant="caption">{user?.email}</MDTypography>
          </MDBox>
        </MDBox>
      ),
      login: (
        <MDTypography display="block" variant="button" fontWeight="medium">
          {user?.login}
        </MDTypography>
      ),
      user_type: showStatus(user?.user_type),
      user_mobile_1: (
        <MDTypography display="block" variant="button" fontWeight="medium">
          {user?.user_mobile_1}
        </MDTypography>
      ),
      action: (
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="visibility" onClick={toggleDrawer("right", true, user)}>
            <VisibilityIcon color="info" fontSize="medium" />
          </IconButton>
          <IconButton
            aria-label="visibility"
            onClick={() => {
              setIsOpen(!isOpen);
              setPerson(user);
            }}
          >
            {!user?.active ? (
              <NoEncryptionIcon color="error" fontSize="medium" />
            ) : (
              <HttpsIcon color="success" fontSize="medium" />
            )}
          </IconButton>
        </Stack>
      ),
    })),
  });

  const list = (anchor) => (
    <MDBox
      role="presentation"
      onClick={toggleDrawer(anchor, false, null)}
      onKeyDown={toggleDrawer(anchor, false, null)}
    >
      <MDBox ml={2} mt={3}>
        {!person?.avatar ? (
          <Avatar name={`${person?.name}`} round size={pxToRem(74)} />
        ) : (
          <MDAvatar src={person?.avatar} name={person?.name} size="xl" />
        )}
      </MDBox>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography variant="body1" fontWeight="medium">
          {person?.name}
        </MDTypography>
        <MDTypography variant="caption">{person?.email}</MDTypography>
      </MDBox>
      <MDBox ml={2} lineHeight={1} mt={3}>
        <MDTypography variant="body1" fontWeight="medium">
          Contact
        </MDTypography>
        <MDTypography variant="button">{person?.user_mobile_1}</MDTypography>
      </MDBox>
      <MDBox ml={2} lineHeight={1} mt={3}>
        <MDTypography variant="body1" fontWeight="medium">
          Pays
        </MDTypography>
        <MDTypography variant="button">{person?.country}</MDTypography>
      </MDBox>
      <MDBox ml={2} lineHeight={1} mt={3}>
        <MDTypography variant="body1" fontWeight="medium">
          Biographie
        </MDTypography>
        <MDTypography variant="button">
          {person?.description ? person?.description : "Aucune biographie disponible"}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const confirmLock = async () => {
    setIsLoading(!isLoading);
    const req = await lockAndUnclockAccount(person?.id, token);
    if (req?.success) {
      await getUsers();
      setIsLoading(false);
      setIsOpen(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Drawer
        anchor="right"
        variant="temporary"
        open={state.right}
        onClose={toggleDrawer("right", false, null)}
        sx={{ width: 400 }}
      >
        {list("right")}
      </Drawer>
      {err && (
        <MDAlert color="error" dismissible onClick={() => setErr("")}>
          {err}
        </MDAlert>
      )}
      {success && (
        <MDAlert color="success" dismissible onClick={() => setSuccess("")}>
          {success}
        </MDAlert>
      )}
      <MDBox mb={1}>
        <MDButton variant="gradient" color="info" onClick={() => setOpen(!open)}>
          Ajouter un utilisateur
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
                  Liste des utilisateurs
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Nom", accessor: "name", align: "left" },
                      { Header: "ID Connexion", accessor: "login", align: "left" },
                      { Header: "Status", accessor: "user_type", align: "left" },
                      { Header: "Action", accessor: "action", align: "left" },
                    ],
                    rows: [...showRow().rows],
                  }}
                  isSorted
                  entriesPerPage
                  showTotalEntries
                  noEndBorder
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <UserModal
        open={open}
        setOpen={setOpen}
        setErr={setErr}
        setSuccess={setSuccess}
        getUsers={getUsers}
      />
      <MDLockModal
        title={person?.active ? "Désactivation du compte" : "Activation du compte"}
        message={
          person?.active
            ? "En désactivant le compte de l'utilisateur, il ne pourra plus accéder au service de Askoacademy pendant un certain temps."
            : "La réactivation de ce compte lui permettra de bénéficier à nouveau des services de Askoacademy."
        }
        confirmLock={confirmLock}
        isOpen={isOpen}
        isLoading={isLoading}
        cancelAction={() => setIsOpen(false)}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default UsersList;
