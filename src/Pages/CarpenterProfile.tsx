import React, { useState } from "react";
import { Avatar, Tabs, Tab, Typography, Box, Button, Rating } from "@mui/material";
import { WhatsApp, Phone } from "@mui/icons-material";
import "tailwindcss/tailwind.css";
import { useLocation } from "react-router-dom";
import { getWorkerData } from "../services/workerApi";
import useFetchData from "../hooks/useFetchData";
import { Worker } from "../Interfaces/WorkerInterface";
import AboutMeWorker from "../components/AboutMeWorker";
import ReviewTab from "../components/ReviewTab";
import ProductsTab from "../components/ProductsTab";
import ContractTab from "../components/ContractTab";

const CarpenterProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();
  
  const lastSegment = location.pathname.split("/").pop() || "";
  const { data: worker, loading, error } = useFetchData<Worker>({
    apiFunction: () => getWorkerData(lastSegment)
  });
  
  // Manejador de cambio de tabs
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        className="relative h-1/2 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${worker.images.image1})`,
          objectFit:"contain"
        }}
      >
        {/* Imagen de perfil */}
        <Avatar
          src={worker.user.profile_picture}
          alt="Profile Picture"
          sx={{
            width: 220,
            height: 220,
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="w-full mt-16 flex flex-col items-center px-4">
        {/* Información básica */}
        <Typography variant="h5" className="font-bold text-gray-800">
          {worker.user.name +" "+worker.user.lastname}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          aqui cargo o taller
        </Typography>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <Rating value={4.8} precision={0.5} readOnly />
          <Typography variant="body2" className="ml-2 text-gray-600">
            4.8 (47 reseñas)
          </Typography>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="mx-auto max-w-screen-2xl">
            <Box className="w-full mt-4">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered={windowWidth>500?true:false}
                textColor="primary"
                indicatorColor="primary"
                variant={windowWidth>500?"fullWidth":"scrollable"}
                // sx={{backgroundColor:"red"}}
              >
                <Tab label="Perfil" />
                <Tab label="Reseñas" />
                <Tab label="Productos" />
                <Tab label="Contrato" />
              </Tabs>
            </Box>
          </div>
        </div>
        {/* Contenido de cada Tab */}
        <div className="mx-auto max-w-screen-2xl w-full mt-6 h-auto">
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
      </div>
    </div>
  );}
};

export default CarpenterProfile;
