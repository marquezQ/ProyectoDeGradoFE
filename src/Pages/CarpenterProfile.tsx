import React, { useState } from "react";
import { Avatar, Tabs, Tab, Typography, Box, Button, Rating } from "@mui/material";
import { WhatsApp, Phone } from "@mui/icons-material";
import "tailwindcss/tailwind.css";

const CarpenterProfile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  // Manejador de cambio de tabs
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Portada */}
      <div
        className="relative h-96 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/foto-gratis/vista-superior-conjunto-herramientas-carpintero_23-2148428306.jpg')", // Reemplaza con tu imagen de portada
        }}
      >
        {/* Imagen de perfil */}
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54MgOdpjUHpFqCUdHdASAyzwz7VEcGb0JQA&s" // Reemplaza con tu imagen de perfil
          alt="Profile Picture"
          sx={{
            width: 120,
            height: 120,
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="mt-16 flex flex-col items-center px-4">
        {/* Información básica */}
        <Typography variant="h5" className="font-bold text-gray-800">
          Carlos Martínez
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Muebles Artesanales CM
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
                centered
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
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
        <div className="mx-auto max-w-screen-2xl mt-6">
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" className="font-bold mb-2">
                Sobre mí
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Con más de 20 años de experiencia en el arte de la carpintería, me especializo en la
                creación de muebles rústicos y en la restauración de piezas antiguas...
              </Typography>
              <div className="mt-4">
                <Typography variant="h6" className="font-bold">
                  Ubicación
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Av. América #1234, Cochabamba
                </Typography>
                <div className="bg-gray-300 h-32 w-full flex items-center justify-center mt-2">
                  <Typography color="text.secondary">Mapa de ubicación</Typography>
                </div>
              </div>
            </Box>
          )}

          {tabValue === 1 && (
            <Typography variant="body1" color="text.secondary">
              Aquí irán las reseñas del carpintero.
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography variant="body1" color="text.secondary">
              Aquí irán los productos del carpintero.
            </Typography>
          )}
          {tabValue === 3 && (
            <Typography variant="body1" color="text.secondary">
              Aquí irá la información sobre los contratos.
            </Typography>
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
  );
};

export default CarpenterProfile;
