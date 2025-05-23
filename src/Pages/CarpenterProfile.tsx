import React, { useState } from "react";
import { Avatar, Tabs, Tab, Typography, Box, Button, Rating, Dialog, DialogTitle, IconButton } from "@mui/material";
import { WhatsApp, Phone } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { getWorkerData } from "../services/workerApi";
import useFetchData from "../hooks/useFetchData";
import { Worker } from "../Interfaces/WorkerInterface";
import AboutMeWorker from "../components/AboutMeWorker";
import ReviewTab from "../components/Reviews/ReviewTab";
import ProductsTab from "../components/Products/ProductsTab";
import ContractTab from "../components/Contracts/ContractTab";
import { useAuthContext } from "../hooks/useAuthContext";
import CloseIcon from "@mui/icons-material/Close";
import EditCarpenter from "../components/Profiles/EditCarpenter";
import ImageEditForm from "../components/Profiles/EditImagesCarpenter";

const CarpenterProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();
  
  const lastSegment = location.pathname.split("/").pop() || "";
  const { data: worker, loading, error, fetchData } = useFetchData<Worker>({
    apiFunction: () => getWorkerData(lastSegment)
  });

  const { worker: workerLogged } = useAuthContext();
  const isOwner = workerLogged?.id.toString() == lastSegment;

  const [showEdit, setShowEdit] = useState(false);
  const closeEdit = () => setShowEdit(false);

  const [showEditImages, setShowEditImages] = useState(false);
  const closeEditImages = () => setShowEditImages(false);
  // Manejador de cambio de tabs
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const tabStyles = {
  color: "#4c3a37",
  '&.Mui-selected': {
    color: "#fff",
     backgroundColor: "#4c3a37",
    border: "5px solid #F4F4F5",
    borderRadius: "20px",
  },
};

  const windowWidth = window.innerWidth;
  if(loading){
    return <div>Cargando...</div>
  }
  if(error){
    return <div>ocurrio un error...</div>
  }
  if(worker){
  return (
    <div className="h-screen">
      {/* Portada */}
      <div
        className="relative w-full bg-cover bg-center h-2/6 md:h-3/5 lg:h-2/3"
        style={{
          backgroundImage: `url(${worker.images.image1})`,
          objectFit: "cover"
        }}
      >
        {/* Avatar superpuesto */}
        <Avatar
          src={worker.user.profile_picture}
          alt="Profile Picture"
          sx={{
            width: 180,
            height: 200,
            border: "4px solid white",
            borderRadius: "24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            background: "#fff",
            position: "absolute",
            left: "50%",
            bottom: "-100px", // La mitad del avatar hacia abajo
            transform: "translateX(-50%)",
            zIndex: 10
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="w-full flex flex-col items-center px-4 mt-20">
        {/* Card de perfil */}
        <div className="w-full max-w-screen-xl flex flex-col md:flex-row items-center md:items-end md:gap-8">
          
          {/* Info */}
          <div className="flex-1 flex flex-col items-center mt-3">
            <Typography variant="h5" className="font-bold text-gray-800">
              {worker.user.name + " " + worker.user.lastname}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {worker.workshop}
            </Typography>
            <div className="flex items-center mt-2">
              <Rating value={worker.averageRating} precision={0.5} readOnly />
              <Typography variant="body2" className="ml-2 text-gray-600">
                {worker.averageRating + " (" + worker.totalReviews + " reseñas)"}
              </Typography>
            </div>
            {/* Botones solo para el dueño */}
            {isOwner && (
              <div className="flex gap-2 mt-3">
                <Button variant="contained" onClick={() => setShowEdit(true)}>
                  Editar Información
                </Button>
                <Button variant="contained" onClick={() => setShowEditImages(true)}>
                  Editar Imágenes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="mx-auto max-w-screen-xl">
            <Box className="w-full mt-4">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered={windowWidth>500?true:false}
                textColor="primary"
                TabIndicatorProps={{ sx: { display: "none" } }}
                variant={windowWidth>500?"fullWidth":"scrollable"}
                sx={{backgroundColor:"#F4F4F5", borderRadius:"8px"}}
                >
                <Tab label="Perfil" sx={tabStyles} />
                <Tab label="Reseñas" sx={tabStyles} />
                <Tab label="Productos" sx={tabStyles}/>
                <Tab label="Contrato" sx={tabStyles} />
              </Tabs>
            </Box>
          </div>
        </div>
        {/* Contenido de cada Tab */}
        <div className="mx-auto max-w-screen-xl w-full mt-6 h-auto">
          {tabValue === 0 && (
            <AboutMeWorker worker={worker}/>
          )}

          {tabValue === 1 && (
            <ReviewTab workerID={lastSegment}/> 
          )}
          {tabValue === 2 && (
            <ProductsTab workerID={lastSegment}/> 
          )}
          {tabValue === 3 && (
            <ContractTab workerID={lastSegment}/>
          )}
        </div>

        {/* Contacto */}
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsApp />}
            sx={{ textTransform: "none" }}
          >
            WhatsApp
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Phone />}
            sx={{ textTransform: "none" }}
          >
            Llamar
          </Button>
        </div>
        <Dialog maxWidth="md" fullWidth open={showEdit} onClose={closeEdit}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          Editar Perfil
          <IconButton onClick={closeEdit}>
              <CloseIcon />
          </IconButton>
        </DialogTitle>
          <EditCarpenter worker={worker} closeModal={closeEdit} reload={fetchData}/>
        </Dialog>

      <Dialog maxWidth="md" fullWidth open={showEditImages} onClose={closeEditImages}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          Editar Imagenes
          <IconButton onClick={closeEditImages}>
              <CloseIcon />
          </IconButton>
        </DialogTitle>
          <ImageEditForm worker={worker} closeForm={closeEditImages}/>
      </Dialog>
      </div>
    </div>
  );}
};

export default CarpenterProfile;
