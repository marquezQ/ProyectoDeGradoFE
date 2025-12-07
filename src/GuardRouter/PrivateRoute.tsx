import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function PrivateRoute() {
  const { user, loading } = useAuthContext();

  if (loading) return <div></div>;  // evita flicker

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
