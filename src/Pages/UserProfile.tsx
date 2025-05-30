
import { Link, useLocation } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Worker } from "../Interfaces/WorkerInterface";
import { getUser } from "../services/api";
import { Button, Typography, Avatar, Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import HandymanIcon from "@mui/icons-material/Handyman";
import LogoutIcon from "@mui/icons-material/Logout";
import ContainerReviewProfile from "../components/Reviews/ContainerReviewProfile";
import { useState } from "react";
import EditUser from "../components/User/EditUser";
import { useAuthContext } from "../hooks/useAuthContext";

function UserProfile() {
  const location = useLocation();
  const userId = location.pathname.split("/").pop() || "";

  const { data, loading, error, fetchData } = useFetchData<Worker>({
    apiFunction: () => getUser(userId),
  });

  const { user: userContext } = useAuthContext()

  const [showEdit, setshowEdit] = useState(false)
  const closeEdit = () => {setshowEdit(false);};

  if (loading) return <div className="text-center mt-10">Cargando...</div>;
  if (error || !data?.user) return <div className="text-center mt-10">El usuario no existe</div>;

  const user = data.user;
  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar
              src={user.profile_picture}
              alt={`${user.name} ${user.lastname}`}
              sx={{ width: 200, height: 200 }}
            />
          </div>

          {/* Info principal */}
          <div className="flex-1 space-y-1">
            <Typography variant="h5" color="primary" fontWeight={"900"}>
              {user.name} {user.lastname}
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {user.email}
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {user.phone_number}
            </Typography>
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-2 md:ml-auto">
            {userContext && userContext.id === user.id && 
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              color="primary"
              sx={{minWidth:"12rem"}}
              onClick={() => setshowEdit(true)}
            >
              Editar Perfil
            </Button>
            }
            {data.address && 
            <Link to={`/workers/workerProfile/${data.id}`}>
            <Button
              variant="contained"
              startIcon={<HandymanIcon />}
              color="primary"
            >
              Ver Perfil de Carpintero
            </Button>
            </Link>}
            
          </div>
        </div>

        {/* Información Personal */}
        <div className="mt-10 border-t pt-6">
          <Typography
            variant="h6"
            className="text-primary my-6"
            color="primary"
            fontWeight={900}
          >
            Información Personal
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="subtitle1" className="font-semibold">
                Nombre Completo
              </Typography>
              <Typography color="primary" fontWeight={"900"}>
                {user.name} {user.lastname}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" className="font-semibold">
                Correo Electrónico
              </Typography>
              <Typography color="primary" fontWeight={"900"}>{user.email}</Typography>
            </div>
            <div>
              <Typography variant="subtitle1" className="font-semibold">
                Teléfono
              </Typography>
              <Typography color="primary" fontWeight={"900"}>{user.phone_number}</Typography>
            </div>
            <div>
              <Typography variant="subtitle1" className="font-semibold">
                Tipo de Usuario
              </Typography>
              <Typography color="primary" fontWeight={"900"}>
                {data.address ? "Carpintero / Cliente" : "Cliente"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Botón cerrar sesión */}
        <div className="mt-10 border-t pt-6">
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            color="error"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-0 sm:p-4 max-w-5xl w-full mt-8">
          <Typography
            variant="h6"
            className="text-primary my-6 pb-5"
            color="primary"
            fontWeight={900}
          >
            Reseñas realizadas
          </Typography>
        <ContainerReviewProfile userID={userId}/> 
      </div>
      <Dialog maxWidth="sm" fullWidth open={showEdit} onClose={closeEdit}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          Editar Perfil
          <IconButton onClick={closeEdit}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

       <EditUser user={user} onCancel={closeEdit} refresh={fetchData} />
              
      </Dialog>
    </div>

    
  );
}

export default UserProfile;

