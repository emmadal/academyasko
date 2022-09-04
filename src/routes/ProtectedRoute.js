/* eslint-disable react/prop-types */

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// react-router-dom components
import { Navigate } from "react-router-dom";
import { getCookie } from "api";

function ProtectedRoute({ children }) {
  const [controller] = useMaterialUIController();
  const token = getCookie("askoacademy-token");

  if (controller.isSignout || !token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
