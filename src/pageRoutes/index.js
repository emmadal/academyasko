// Routes
import Dashboard from "views/dashboard";
import SignIn from "views/signin";
import ResetPassword from "views/resetPassword";
import Profile from "views/profile";
import UsersList from "views/users-list";
// import SignUp from "views/signup";
// import Billing from "layouts/billing";
// import Notifications from "layouts/notifications";

// @mui icons
import Icon from "@mui/material/Icon";

const indexRoutes = [
  { route: "/signin", name: "signin", component: <SignIn /> },
  { route: "/reset-password", name: "reset-password", component: <ResetPassword /> },
  {
    route: "/dashboard",
    name: "Tableau de bord",
    component: <Dashboard />,
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
    component: <UsersList />,
  },
  {
    type: "collapse",
    name: "Bulletins",
    key: "reports",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reports",
    component: <UsersList />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/signup",
  //   component: <SignUp />,
  // },
];

export default indexRoutes;
