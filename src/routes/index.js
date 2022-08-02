// Routes
import Dashboard from "views/dashboard";
import SignIn from "views/signin";
import ResetPassword from "views/reset-password";
import Profile from "views/profile";
import UsersList from "views/users-list";
import BroadCast from "views/broadcast";

// Protected Route
import ProtectedRoute from "routes/ProtectedRoute";

// @mui icons
import Icon from "@mui/material/Icon";

const indexRoutes = [
  { route: "/signin", name: "signin", component: <SignIn /> },
  { route: "/reset-password", name: "reset-password", component: <ResetPassword /> },
  {
    route: "/dashboard",
    name: "Tableau de bord",
    component: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    icon: <Icon fontSize="small">dashboard</Icon>,
    type: "collapse",
    key: "dashboard",
  },
  {
    type: "collapse",
    name: "Utilisateurs",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: (
      <ProtectedRoute>
        <UsersList />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Diffusion",
    key: "broadcast",
    icon: <Icon fontSize="small">camera</Icon>,
    route: "/broadcast",
    component: (
      <ProtectedRoute>
        <BroadCast />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Bulletins",
    key: "reports",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reports",
    component: (
      <ProtectedRoute>
        <UsersList />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
];

export default indexRoutes;