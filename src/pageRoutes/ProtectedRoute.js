/* eslint-disable react/prop-types */

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// react-router-dom components
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [controller] = useMaterialUIController();

  const getCookieByName = (tokenName) => {
    let token;
    if (document.cookie) {
      token = document?.cookie
        .split(";")
        .find((row) => row.startsWith(`${tokenName}=`))
        .split("=")[1];
    }
    return token;
  };

  if (
    controller.isSignout ||
    getCookieByName("askoacademy-token") === undefined ||
    getCookieByName("askoacademy-token") === null
  ) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
