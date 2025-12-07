import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function RegisterRoute() {
  const { user, loading } = useAuthContext();

  if (loading) return <div></div>; // evita redirecciones falsas

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default RegisterRoute;