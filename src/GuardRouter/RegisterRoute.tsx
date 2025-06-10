import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


function RegisterRoute() {
  const { user } = useAuthContext();
    return user ?<Navigate to="/" replace /> : <Outlet />;
}

export default RegisterRoute