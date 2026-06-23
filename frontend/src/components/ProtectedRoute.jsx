import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or a spinner, while AuthContext is still checking localStorage
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
