// Routes
import SignIn from "views/signin";
import ResetPassword from "views/resetPassword";

// Protected Route
// import ProtectedRoute from "pageRoutes/protected";

const indexRoutes = [
  { route: "/signin", name: "signin", component: <SignIn /> },
  { route: "/resetpass", name: "resetpass", component: <ResetPassword /> },
  { route: "/forgotten", name: "forgotten", component: <ForgottenPassword /> },
  //   { route: "/", name: "LandingPage", component: <LandingPage /> },
  //   {
  //     route: "/dashboard",
  //     name: "admin",
  //     component: (
  //       <ProtectedRoute>
  //         <Admin />
  //       </ProtectedRoute>
  //     ),
  //   },
  //   { route: "*", name: "nomatch", component: <NoMatch /> },
];

export default indexRoutes;
