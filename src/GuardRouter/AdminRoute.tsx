import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function AdminRoute() {
  const { user, loading } = useAuthContext();

  if (loading) return <div></div>;

  // Verificar que el usuario esté autenticado y sea admin
  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;