import { useState } from "react";
import { Box, Typography, IconButton, Dialog } from "@mui/material";
import { Worker } from "../Interfaces/WorkerInterface";
import StaticMap from "../Pages/StaticMap";
import { Close } from "@mui/icons-material";

interface workerProps {
  worker: Worker;
}

function AboutMeWorker({ worker }: workerProps) {

  // Estado para manejar el modal
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Funciones para abrir y cerrar el modal
  const handleOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box className="w-full h-full">
      <Typography variant="h6" className="font-bold mb-2">
        Sobre mí
      </Typography>
      <Typography variant="body1" className="text-gray-600 break-words">
        {worker.description}
      </Typography>
      <div className="mt-4">
        <Typography variant="h6" className="font-bold">
          Ubicación
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          {worker.address}
        </Typography>
        <div className="w-full flex items-center mt-2">
          <StaticMap lat={worker.latitud} lng={worker.longitud} />
        </div>
      </div>
      {/* Sección de galería */}
      <div className="mt-6">
        <Typography variant="h6" className="font-bold mb-4">
          Algunos de mis trabajos
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.values(worker.images).map((imageUrl, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border shadow-md cursor-pointer m-auto"
              onClick={() => handleOpen(`${imageUrl}`)}
            >
              <img
                src={`${imageUrl}`}
                alt={`Imagen ${index + 1}`}
                className="w-auto h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
            margin: { xs: 1, sm: 2 }, // Margen mínimo en móvil
            maxHeight: { xs: '98vh', sm: '95vh' },
            maxWidth: { xs: '98vw', sm: '95vw' },
            width: { xs: '98vw', sm: 'auto' }
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(2px)'
          }
        }}
      >
        <Box 
          className="relative outline-none flex items-center justify-center"
          sx={{
            minHeight: { xs: '50vh', sm: 'auto' },
            padding: { xs: 1, sm: 2 }
          }}
        >
          {/* Botón de cerrar */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: { xs: -8, sm: -12 },
              right: { xs: -8, sm: -12 },
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#333',
              zIndex: 1000,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 }
            }}
          >
            <Close sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </IconButton>
          
          {/* Imagen */}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto'
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

export default AboutMeWorker;
