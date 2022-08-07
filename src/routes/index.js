// Routes
import Dashboard from "views/dashboard";
import SignIn from "views/signin";
import ResetPassword from "views/reset-password";
import Profile from "views/profile";
import UsersList from "views/users-list";
import BroadCast from "views/broadcast";
import Message from "views/message";
import Attribution from "views/attribution";
import Report from "views/reports";
import Trainers from "views/trainers";
import Level from "views/level";

// Protected Route
import ProtectedRoute from "routes/ProtectedRoute";

// @mui icons
import Icon from "@mui/material/Icon";

export const indexRoutes = [
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
    name: "Attribution",
    key: "attribution",
    icon: <Icon fontSize="small">import_export</Icon>,
    route: "/attribution",
    component: (
      <ProtectedRoute>
        <Attribution />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Niveau d'étude",
    key: "level",
    icon: <Icon fontSize="small">compress</Icon>,
    route: "/levels",
    component: (
      <ProtectedRoute>
        <Level />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Diplomes",
    key: "graduate",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/graduate",
    component: (
      <ProtectedRoute>
        <Trainers />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Messagerie",
    key: "messagerie",
    icon: <Icon fontSize="small">message</Icon>,
    route: "/messagerie",
    component: (
      <ProtectedRoute>
        <Message />
      </ProtectedRoute>
    ),
  },
];

export const teacherAndCoachRoutes = [
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
    name: "Bulletins",
    key: "reports",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reports",
    component: (
      <ProtectedRoute>
        <Report />
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

export const studentRoutes = [
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
  {
    type: "collapse",
    name: "Formateurs",
    key: "trainers",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/trainers",
    component: (
      <ProtectedRoute>
        <Trainers />
      </ProtectedRoute>
    ),
  },
];
