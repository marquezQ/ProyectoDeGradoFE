import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"


function PrivateRoute() {
    const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" replace />; // Redirect to login if user is not authenticated  
}

export default PrivateRoute